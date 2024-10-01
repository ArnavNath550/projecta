import React, { useEffect, useState } from "react";
import axios from "axios";
import { Column } from "./kanban-column"; // Assuming you have these column components
import { API_ENDPOINT } from "@/app/services/api";


interface Task {
  title: string;
  id: string;
  status: string; // Status corresponds to taskStatus
  projectId: number;
}


export const KanbanBoard: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [taskStatuses, setTaskStatuses] = useState([]);

  // Fetch tasks and taskStatuses when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksResponse = await axios.get(`${API_ENDPOINT}/tasks/project/${projectId}`);

        // Set tasks and statuses in the state
        setTasks(tasksResponse.data.tasks);          

      } catch (error) {
        console.error("Error fetching tasks or statuses", error);
      }
    };

    fetchTasks();
  }, [projectId]);

  useEffect(() => {
    let updatedTaskStatuses = [...taskStatuses]; // Start with the current state

    tasks.forEach((y) => {
    if (!updatedTaskStatuses.includes(y.taskType)) {
        updatedTaskStatuses.push(y.taskType); // Update the local array
    }
    });

    // Update the state only once, after the loop
    setTaskStatuses(updatedTaskStatuses);
  }, [tasks]);
  

  return (
    <div className="flex h-full w-full gap-10 overflow-scroll">
        {taskStatuses.map((y, i) => {
            return (
                <Column
                    title={y}
                    column={y}
                    headingColor="text-neutral-500"
                    cards={tasks}
                    setCards={setTasks}
                />
            )     
      })}
    </div>
  );
};

