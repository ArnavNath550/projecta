'use client'
import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";

import { motion } from "framer-motion";
import { IconFlame, IconLineDashed, IconPlus, IconX } from "@tabler/icons-react";
import Button from "../../packages/ui/button";
import AnimatedDialog from "../../packages/ui/animatedDialog";
import CreateTaskDialog from "../dialogs/create-task-dialog";
import axios from "axios";
import { useParams } from "next/navigation";
import { API_ENDPOINT } from "@/app/services/api";
import AnimatedDropdown from "@/app/packages/ui/animatedDropdown";
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

  const params = useParams<{ id: number; }>()

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks/project/'+params.id);
      const tasks = response.data; // Assuming response is an array of tasks
      const formattedTasks = tasks.tasks.map((task: any) => ({
        title: task.taskName,  // Assuming your task object contains a taskName field
        id: task.taskId,       // Assuming your task object contains a taskId field
        priority: task.taskPriority,
        createdBy: task.taskCreator,
        column: task.taskType.toLowerCase(), // Assuming taskType could be 'TODO', 'DOING', etc.
      }));
      setCards(formattedTasks);
      // setCards(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch tasks from the backend when the component mounts
  React.useEffect(() => {
    fetchTasks();
  }, [params.id]); // Empty dependency array ensures this runs only once when the component mounts


    // Dynamically group tasks by their column type (taskType or column)
    const groupedTasks = cards.reduce((acc: Record<string, CardType[]>, task) => {
      const column = task.column; // Dynamically grouping by the `column` field
      if (!acc[column]) acc[column] = [];
      acc[column].push(task);
      return acc;
    }, {});
  
    // Get unique column names from the grouped tasks
    const columnNames = Object.keys(groupedTasks);

  return (
    <div className="flex h-full w-full gap-5 overflow-scroll">
     {columnNames.map((column) => (
        <Column
          key={column}
          title={column.charAt(0).toUpperCase() + column.slice(1)} // Capitalize column name
          column={column}
          headingColor="text-neutral-500" // Adjust headingColor if needed
          cards={groupedTasks[column]}
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

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
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
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  // const filteredCards = cards.filter((c) => c.column === column);

  const [taskModalOpen, setTaskModalOpen] = React.useState(false);

  return (
    <div className="w-[270px] shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-regular text-sm`}>{title}</h3>
        <div className="flex flex-row items-center justify-center gap-2">
          <AnimatedDialog 
            trigger={<Button intent="unstyled" size="s">
              <IconPlus size={20} color="#fff" />
            </Button>}
            content={<CreateTaskDialog reloadTasks={fetchTasks} setIsOpen={(openState: boolean) => setTaskModalOpen(openState)}
            />}
            isOpen={taskModalOpen}
            setIsOpen={() => setTaskModalOpen}
          />
          <span className="rounded text-sm text-neutral-400">
            {cards.length}
          </span>
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
            title={c.title}
            id={c.id}
            column={c.column}
            priority={c.priority}
            createdBy={c.createdBy}
            handleDragStart={handleDragStart}
            />
        })}
        <DropIndicator beforeId={null} column={column} />
        {/* <AddCard column={column} setCards={setCards} /> */}
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: Function;
};

const Card = ({ title, id, column, priority, createdBy, handleDragStart }: CardProps) => {
  const [userData, setUserData] = React.useState([]);

  
  const fetchUserData = async() => {
    try {
      const response = await axios.get(API_ENDPOINT + '/users/'+createdBy);
      setUserData(response.data);
      // console.log(`response`, response.data);
    } catch (error: any) {
      console.error('Error fetching users:', error.response?.data || error.message);
    }
  }

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
          {userData ? (
            <Chip label={userData.firstName + " " + userData.lastName} size="s" />
          ) : (
            <></>
          )}
        </div>
          </div>
        }
        content={
          <TaskDetailsDialog taskName={title} taskDescription="Some task description"/>
        }
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
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const BurnBarrel = ({
  setCards,
}: {
  setCards: Dispatch<SetStateAction<CardType[]>>;
}) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((pv) => pv.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <IconFlame className="animate-bounce" /> : <IconX />}
    </div>
  );
};

type AddCardProps = {
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const AddCard = ({ column, setCards }: AddCardProps) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <IconPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <IconPlus />
        </motion.button>
      )}
    </>
  );
};

type ColumnType = "backlog" | "todo" | "doing" | "done";

type CardType = {
  title: string;
  id: string;
  createdBy: string;
  priority: string;
  column: ColumnType;
};