import React, { useEffect, useState } from "react";
import axios from "axios";
import { Column } from "./kanban-column"; // Assuming you have these column components
import { API_ENDPOINT } from "@/app/services/api";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/app/api/db";


interface Task {
  issue_title: string;
 issue_id: string;
  status: string; // Status corresponds to taskStatus
  projectId: number;
}


export const KanbanBoard: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [issues, setIssues] = useState([]);
  const [taskStatuses, setTaskStatuses] = useState([]);

  // Fetch issues and taskStatuses when the component mounts
  const fetchIssues = async () => {
    try {
      const issuesResponse = await axios.get(`${API_ENDPOINT}/issues/project/${projectId}`);

      // Set issues and statuses in the state
      setIssues(issuesResponse.data);          
      // console.log()

    } catch (error) {
      console.error("Error fetching issues or statuses", error);
    }
  };
  useEffect(() => {
    fetchIssues();
  }, [projectId]);

    const channel = supabase
    .channel('postgresChangesChannel')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'issues',
      filter: `project_id=eq.${projectId}`  // Filtering based on project_id
    }, payload => {
      fetchIssues();
    })
    .subscribe();

  useEffect(() => {
    let updatedTaskStatuses = [...taskStatuses]; // Start with the current state

    issues.forEach((y) => {
    if (!updatedTaskStatuses.includes(y.issue_status)) {
        updatedTaskStatuses.push(y.issue_status); // Update the local array
    }
    });

    // Update the state only once, after the loop
    setTaskStatuses(updatedTaskStatuses);
  }, [issues]);

  return (
    <div className="flex h-full w-full gap-5 overflow-scroll">
        {taskStatuses.map((y, i) => {
            return (
                <Column
                    key={y.issue_id}
                    title={y}
                    column={y}
                    headingColor="text-neutral-500"
                    cards={issues}
                    setCards={setIssues}
                    reloadIssues={fetchIssues}
                />
            )     
      })}
    </div>
  );
};

