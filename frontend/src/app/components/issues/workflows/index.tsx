import React, { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import WorkflowItem from "./workflow-item";
import Button from "@/app/packages/ui/button";
import { API_ENDPOINT, postDataMethod } from "@/app/services/api";
import { useParams } from "next/navigation";

// Define types for items
interface Item {
  id: string;
  content: string;
  group: string;
  workflowDescription?: string;
}

// Helper function to reorder within a group
const reorder = (list: Item[], startIndex: number, endIndex: number): Item[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Helper function to move an item between groups
const move = (
  source: Item[],
  destination: Item[],
  sourceIndex: number,
  destIndex: number
): { source: Item[]; destination: Item[] } => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [movedItem] = sourceClone.splice(sourceIndex, 1);
  destClone.splice(destIndex, 0, movedItem);

  return {
    source: sourceClone,
    destination: destClone,
  };
};

type Props = {
  initIssues: () => void
}

const Workflow: React.FC = (props: Props) => {
  const params = useParams();
  // Set initial state using useState hook
  const [items, setItems] = useState<Item[]>([
    {
      id: "0",
      content: "Backlog",
      group: "BACKL",
      workflowDescription: "Before your issue hits, Backlog"
    },
    {
      id: "1",
      content: "Todo",
      group: "INPRO",
      workflowDescription: "Todo, your issue is currently being worked on"
    },
    {
      id: "2",
      content: "In Progress",
      group: "INPRO",
      workflowDescription: "In Progress, your issue is currently in progress"
    },
    {
      id: "3",
      content: "In Review",
      group: "DONE",
      workflowDescription: "In Review, your issue is currently being reviewed"
    },
    {
      id: "4",
      content: "Done",
      group: "DONE",
      workflowDescription: "Done, your issue is done"
    },
  ]);

  // Helper function to group items by the 'group' property
  const groupItemsByGroup = (items: Item[]) => {
    return items.reduce((acc, item) => {
      if (!acc[item.group]) {
        acc[item.group] = [];
      }
      acc[item.group].push(item);
      return acc;
    }, {} as Record<string, Item[]>);
  };

  // Handle drag end using useCallback hook
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      // If there's no destination (dropped outside any droppable), do nothing
      if (!destination) return;

      const sourceGroup = source.droppableId;
      const destinationGroup = destination.droppableId;

      // If the item is dropped within the same group
      if (sourceGroup === destinationGroup) {
        const groupItems = groupItemsByGroup(items)[sourceGroup];
        const reorderedItems = reorder(groupItems, source.index, destination.index);
        
        // Update only the group that changed
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.group === sourceGroup ? reorderedItems.find((i) => i.id === item.id) || item : item
          )
        );
      } else {
        // Move the item between groups
        const sourceItems = groupItemsByGroup(items)[sourceGroup];
        const destinationItems = groupItemsByGroup(items)[destinationGroup];

        const { source: newSourceItems, destination: newDestItems } = move(
          sourceItems,
          destinationItems,
          source.index,
          destination.index
        );

        // Update the state after moving the item across groups
        setItems((prevItems) =>
          prevItems.map((item) => {
            if (item.group === sourceGroup) {
              return newSourceItems.find((i) => i.id === item.id) || item;
            }
            if (item.group === destinationGroup) {
              return newDestItems.find((i) => i.id === item.id) || item;
            }
            return item;
          })
        );
      }
    },
    [items]
  );

  // Group items by their respective groups
  const groupedItems = groupItemsByGroup(items);

  // create workflow
  const createWorkflow = async () => {
    try {
      const response = await postDataMethod(API_ENDPOINT + '/workflows', {project_id: params?.id, workflow_data: items});
      console.log(`response`, response);
      // return response; // Return the created or updated workflow data
      props.initIssues();
    } catch (error) {
      console.error('Error creating/updating workflow:', error);
      throw error; // Optionally handle the error in your app
    }
  };

  return (
    <div className="flex flex-col gap-2 max-w-[1125px] m-auto animate-fade-up">
      <div className="flex flex-col gap-1">
        <div className="text-2xl font-medium">Set your Workflow</div>
        <div className="text-md font-normal text-on-surface">
          Setup the workflow in which your issues will go through
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        {/* Loop through each group */}
        {Object.keys(groupedItems).map((group) => (
          <div key={group} className="mb-4">
            {/* Group title */}
            <div className="font-medium text-on-surface text-md mb-1.5">{group}</div>

            <Droppable droppableId={group}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-col gap-2 w-[500px] bg-workflow-gradient border-[1px] border-surface-border rounded-md p-2"
                >
                  {groupedItems[group].map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <WorkflowItem
                            workflowName={item.content}
                            workflowDescription={item.workflowDescription}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
      <div className="flex flex-row items-center justify-end">
        <Button size="base" intent="primary" classes="button-shine" onClick={() => createWorkflow()}>
          Create Board
        </Button>
      </div>
    </div>
  );
};

export default Workflow;
