import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconCalendar, IconPlus, IconTimeDuration0 } from "@tabler/icons-react";
import { Chip } from "@/app/packages/ui/chip";
import AnimatedDialog from "@/app/packages/ui/animatedDialog";
import Button from "@/app/packages/ui/button";
import CreateTaskDialog from "../dialogs/create-task-dialog";

interface Card {
  title: string;
  id: string;
  column: string;
}

interface ColumnProps {
  title: string;
  headingColor: string;
  cards: Card[];
  column: string;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  reloadIssues: () => void
}

interface DropIndicatorProps {
  beforeId: string | null;
  column: string;
}

interface CardProps {
  title: string;
  id: string;
  column: string;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: Card) => void;
}

export const Column: React.FC<ColumnProps> = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
  reloadIssues
}) => {
  const [active, setActive] = useState<boolean>(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
    e.dataTransfer.setData("cardId", card.id);
    console.log(`is dragging`, card.id);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    
    setActive(false);
    clearHighlights();
  
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    
    const before = element?.dataset.before || "-1";
    
    if (before !== cardId) {
      let copy = [...cards]; // Clone the current cards array
  
      // Use issue_id for consistency
      let cardToTransfer = copy.find((c) => c.issue_id === cardId);
      if (!cardToTransfer) return;
      
      cardToTransfer = { ...cardToTransfer, column }; // Update the column of the dragged card
  
      // Filter out the card being transferred by its issue_id
      copy = copy.filter((c) => c.issue_id !== cardId);
  
      const moveToBack = before === "-1"; // Check if the card should move to the back of the column
  
      if (moveToBack) {
        copy.push(cardToTransfer); // Add the card to the end of the list
      } else {
        const insertAtIndex = copy.findIndex((el) => el.issue_id === before);
        if (insertAtIndex === -1) return; // Ensure the index is valid
  
        copy.splice(insertAtIndex, 0, cardToTransfer); // Insert the card at the specified index
      }
  
      setCards(copy); // Update the cards state
      console.log(`Updated cards:`, copy); // Log the updated copy of cards, not the state variable
    }
  };
  

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
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

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
  ) => {
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

  const getIndicators = (): HTMLElement[] => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.issue_status === column);

  return (
    <div className="w-[265px] shrink-0">
        {/* {JSON.stringify(cards)} */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium text-sm ${headingColor}`}>{title}</h3>
        <div className="flex flex-row items-center justify-center gap-2">
          <AnimatedDialog
          trigger={
            <Button intent="unstyled" size="s">
              <IconPlus size={12} color="#fff" />
            </Button>
          }
          content={<CreateTaskDialog reloadIssues={reloadIssues}  setIsOpen={() => console.log(5)} taskStatus={title} />}
          />
          <span className="rounded text-sm text-neutral-400">
            {filteredCards.length}
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
        {filteredCards.map((c, i) => {
          return <Card key={i} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = ({ key, issue_name, issue_priority, issue_id, column, handleDragStart }) => {
    const [id, setId] = React.useState(issue_id);    
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { issue_name, id, column })}
      >
        <div className="cursor-grab rounded border border-surface-border bg-surface p-2.5 active:cursor-grabbing flex items-start flex-col gap-1 hover:bg-surface-lighter">
        <div className="text-sm">{issue_name}</div>
        <div className="flex flex-row gap-2">
            <div className="flex-row flex gap-1 items-center justify-center">
              <div>
                <div className="rounded-full w-2 h-2 bg-[#ee8a39]"></div>
              </div>
              <div className="text-sm font-normal text-on-surface">{issue_priority}</div>
            </div>
            <div className="flex-row flex gap-1 items-center justify-center">
              <div>
                <IconTimeDuration0 size={12} color="#fff" />
              </div>
              <div className="text-sm font-normal text-on-surface">15th Nov</div>
            </div>
        </div>
        <div className="flex-row flex gap-1 items-center justify-center">
              <Chip icon={<div className="rounded-full w-2 h-2 bg-[#ee394e]"></div>}
              size="s"
              label="Bug" />
              <Chip icon={<div className="rounded-full w-2 h-2 bg-[#395aee]"></div>}
              size="s"
              label="Frontend" />
            </div>
            </div>
      </motion.div>
    </>
  );
};

const DropIndicator: React.FC<DropIndicatorProps> = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};
