import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconCalendar, IconCalendarClock, IconCircle, IconHash, IconPlus, IconTags, IconTimeDuration0 } from "@tabler/icons-react";
import { Chip } from "@/app/packages/ui/chip";
import AnimatedDialog from "@/app/packages/ui/animatedDialog";
import Button from "@/app/packages/ui/button";
import CreateTaskDialog from "../dialogs/create-task-dialog";
import IssueDetailDialog from "../dialogs/issue-detail-dialog";

import { format, formatDate, formatDistance, isSameMinute, subDays } from 'date-fns';
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatString, getPriorityIcon, ISSUE_PRIORITY_LIST } from "@/app/helpers";
import AnimatedDropdown from "@/app/packages/ui/animatedDropdown";
import { getWorkflowByProjectId, handleStatusChange, updateIssuePriority } from "@/app/api/actions/issue-actions";
import TooltipButton from "@/app/packages/ui/animatedTooltip";

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
  key: string;
  issue_name: string;
  issue_priority: string;
  created_at: string; // Assume created_at is a string or Date
  issue_description: string;
  issue_tags: [];
  issue_id: string;
  issue_status: string;
  issue_due_date?: Date;
  issue_identifier: string,
  column: string;
  handleDragStart: (e: React.DragEvent, issue: any) => void;
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
  const [issueDialogOpen, setIssueDialogOpen] = useState<boolean>(false);

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
      console.log(`copy`, copy);
  
      // Use issue_id for consistency
      let cardToTransfer = copy.find((c) => c.issue_id === cardId);
      if (!cardToTransfer) return;


      cardToTransfer = { ...cardToTransfer, issue_status: column }; // Update the column of the dragged card
      console.log(`thiscard`, cardToTransfer);

      // Filter out the card being transferred by its issue_id
      copy = copy.filter((c) => c.issue_id !== cardId);
  
      const moveToBack = before === "-1"; // Check if the card should move to the back of the column
  
      if (moveToBack) {
        copy.push(cardToTransfer); // Add the card to the end of the list
        console.log(`cardToTransfer`, cardToTransfer);
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
    <div className="w-[310px] shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium text-sm ${headingColor}`}>{formatString(title)}</h3>
        <div className="flex flex-row items-center justify-center gap-2">
          <AnimatedDialog
          trigger={
            <Button intent="unstyled" size="s">
              <IconPlus size={12} color="#fff" />
            </Button>
          }
          content={<CreateTaskDialog reloadIssues={reloadIssues}  taskStatus={title} setCloseIssueDialog={setIssueDialogOpen} />}
          isOpen={issueDialogOpen} setIsOpen={setIssueDialogOpen}
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
          active ? "bg-on-surface-darker" : "bg-background"
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

const Card: React.FC<CardProps> = ({
  issue_name,
  issue_priority,
  created_at,
  issue_description,
  issue_tags,
  issue_status,
  issue_due_date,
  issue_id,
  issue_identifier,
  column,
  handleDragStart
}) => {
  const [id, setId] = React.useState(issue_id);
  const [isNow, setIsNow] = React.useState("");
  const [issueDetailDialogOpen, setIssueDetailDialogOpen] = useState<boolean>(false);
  const [priority, setPriority] = React.useState(issue_priority);

  React.useEffect(() => {
    const createdAtDate = new Date(created_at);
    const now = new Date();

    // Check if created_at is in the same second as current time
    if (
      createdAtDate.getUTCFullYear() === now.getUTCFullYear() &&
      createdAtDate.getUTCMonth() === now.getUTCMonth() &&
      createdAtDate.getUTCDate() === now.getUTCDate() &&
      createdAtDate.getUTCHours() === now.getUTCHours() &&
      createdAtDate.getUTCMinutes() === now.getUTCMinutes() &&
      createdAtDate.getUTCSeconds() === now.getUTCSeconds()
    ) {
      setIsNow('NOW');
    }
  }, [created_at]);

  const params = useParams();

  const handlePriorityChange = (priority: string) => {
    const response = updateIssuePriority(issue_id, priority);
    setPriority(priority);
  }

  const [projectWorkflowData, setProjectWorkflowData] = React.useState([]);

  const handleFetchProjectWorkflows = async() => {
    const projectId = params.id;
    const response = await getWorkflowByProjectId(projectId);
    // setProjectWorkflowData(response);
    const data = response.map((workflow) => ({
      label: workflow.workflowLabel,
      value: workflow.workflowName, // Adjust value based on your logic
    }));
    console.log(`dataa`, data);
    setProjectWorkflowData(data);
  }

  React.useEffect(() => {
    handleFetchProjectWorkflows();
  }, []);


  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      
          <motion.div
            layout
            layoutId={id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, { issue_name, id, column })}
            className="relative"
          >
             {/* onClick={() => window.location.href = '/client/'+ params.id + '/issues/' + issue_id} */}
                <div>
                <div className={`rounded bg-[#252532] p-2.5 flex items-start flex-col gap-1 hover:bg-[#20202b] text-left ${isNow == "now" ? "created-now" : ""}`}>
              <div className="flex flex-row items-center w-full gap-1">
              <AnimatedDropdown
                dropdownItems={projectWorkflowData}
                trigger={<div><IconCircle size={18} color="#fff" /></div>}
                itemAction={(value: string) => handleStatusChange(id, value)}
              />
               <div className="text-sm text-left">{issue_name}</div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="text-xs text-on-surface">
                  {issue_identifier}
                </span>
              <AnimatedDropdown
                  trigger={
                    <TooltipButton
                      buttonContent={<div className="flex-row flex items-center gap-2">
                        <div>
                          {getPriorityIcon(issue_priority)}
                        </div>
                        <span className="text-xs">{formatString(issue_priority)}</span>
                      </div>}
                      tooltipText={issue_priority}
                      />
                  }
                  dropdownItems={ISSUE_PRIORITY_LIST}
                  itemAction={(value: string) => handlePriorityChange(value)}
                />
              </div>
              <div className="flex-row flex gap-1 items-center justify-center">
                {issue_due_date ? (
                  <Chip label={format(new Date(issue_due_date), 'd MMM')} size="s" icon={<IconCalendar size={15} color="#fff"/>} />
                ) : (
                  <></>
                )}
                {issue_tags.length > 0 ? (
                  <div className="flex flex-row gap-1 items-center">
                    {issue_tags.map((y) => {
                      return (
                        <Chip label={y.tag_name} size="s" icon={<div className={`w-[8px] h-[8px] rounded-full bg-[${y.tag_colour}]`}></div>} />
                      )
                    })}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
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
      className="my-0.5 h-[5px] w-full bg-surface opacity-0 active:bg-surface-lighter"
    />
  );
};
