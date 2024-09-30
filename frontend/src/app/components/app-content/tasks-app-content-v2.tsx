'use client'
import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";

import { motion } from "framer-motion";
import { IconFlame, IconPlus, IconX } from "@tabler/icons-react";
import Button from "../../packages/ui/button";
import AnimatedDialog from "../../packages/ui/animatedDialog";
import CreateTaskDialog from "../dialogs/create-task-dialog";
import axios from "axios";
import { useParams } from "next/navigation";
import { API_ENDPOINT } from "@/app/services/api";
import TaskDetailsDialog from "../dialogs/task-details-dialog";
import { Chip } from "@/app/packages/ui/chip";

export const CustomKanban = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <TasksAppContent />
    </div>
  );
};

const TasksAppContent = () => {
  const [cards, setCards] = useState<CardType[]>([]);

  const params = useParams<{ id: number }>();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_ENDPOINT + '/tasks/project/' + params.id);
      const tasks = response.data;
      const formattedTasks = tasks.tasks.map((task: any) => ({
        title: task.taskName,
        id: task.taskId,
        priority: task.taskPriority,
        createdBy: task.taskCreator,
        column: task.taskType.toLowerCase(),
      }));
      setCards(formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  React.useEffect(() => {
    fetchTasks();
  }, [params.id]);

  const allColumns = ['todo', 'in-progress', 'done'];

  const groupedTasks = cards.reduce((acc: Record<string, CardType[]>, task) => {
    const column = task.column;
    if (column) {
      if (!acc[column]) acc[column] = [];
      acc[column].push(task);
    }
    return acc;
  }, {});

  const columnsWithTasks = allColumns.map((column) => ({
    name: column,
    tasks: groupedTasks[column] || [],
  }));

  return (
    <div className="flex h-full w-full gap-5 overflow-scroll">
      {columnsWithTasks.map(({ name, tasks }) => (
        <Column
          key={name}
          title={name.charAt(0).toUpperCase() + name.slice(1)}
          column={name}
          headingColor="text-neutral-500"
          cards={tasks}
          setCards={setCards}
          fetchTasks={fetchTasks}
        />
      ))}
    </div>
  );
};

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: string;
  setCards: Dispatch<SetStateAction<CardType[]>>;
  fetchTasks: any;
};

const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
  fetchTasks,
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
    const cardToTransfer = cards.find((card) => card.id === cardId);

    if (!cardToTransfer) return;

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const before = element.dataset.before || "-1";

    let updatedCards = cards.filter((c) => c.id !== cardId);

    const updatedCard = { ...cardToTransfer, column };

    if (before === "-1") {
      updatedCards.push(updatedCard);
    } else {
      const insertAtIndex = updatedCards.findIndex((el) => el.id === before);
      if (insertAtIndex !== undefined) {
        updatedCards.splice(insertAtIndex, 0, updatedCard);
      }
    }

    setCards(updatedCards);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(`[data-column="${column}"]`) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const [taskModalOpen, setTaskModalOpen] = useState(false);

  return (
    <div className="w-[270px] shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-regular text-sm`}>{title}</h3>
        <div className="flex flex-row items-center justify-center gap-2">
          <AnimatedDialog
            trigger={<Button intent="unstyled" size="s">
              <IconPlus size={20} color="#fff" />
            </Button>}
            content={<CreateTaskDialog taskStatus={title} reloadTasks={fetchTasks} setIsOpen={(openState: boolean) => setTaskModalOpen(openState)}
            />}
            isOpen={taskModalOpen}
            setIsOpen={() => setTaskModalOpen}
          />
          <span className="rounded text-sm text-neutral-400">{cards.length}</span>
        </div>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {cards.map((c) => {
          return <Card 
            key={c.id}
            title={c.title}
            id={c.id}
            column={c.column}
            priority={c.priority}
            createdBy={c.createdBy}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
          />
        })}
        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: Function;
};

const Card = ({ title, id, column, priority, createdBy, handleDragStart }: CardProps) => {
  const [userData, setUserData] = useState<any>();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(API_ENDPOINT + '/users/' + createdBy);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
      >
        <AnimatedDialog
          trigger={
            <div className="rounded border-surface-border bg-[#1d1e21] p-3 flex flex-col gap-2 cursor-pointer hover:bg-surface-lighter items-start w-[270px] outline-none">
              <p className="text-sm text-neutral-100">{title}</p>
              <div className="flex flex-row gap-2">
                <Chip label={priority} size="s" />
                {userData && <Chip label={userData.firstName + " " + userData.lastName} size="s" />}
              </div>
            </div>
          }
          content={<TaskDetailsDialog taskName={title} taskDescription="Some task description" />}
        />
      </motion.div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-[2px] h-[2px] w-full bg-transparent"
    />
  );
};

type CardType = {
  id: string;
  title: string;
  column: string;
  priority: string;
  createdBy: string;
};
