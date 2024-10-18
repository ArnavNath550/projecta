import React, { useEffect, useState } from "react";
import axios from "axios";
import { Column } from "./kanban-column"; // Assuming you have these column components
import { API_ENDPOINT } from "@/app/services/api";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/app/api/db";
import Workflows from "../issues/workflows";
import EmptyState from "@/app/packages/ui/emptyStates";
import AnimatedDialog from "@/app/packages/ui/animatedDialog";
import Button from "@/app/packages/ui/button";
import CreateTaskDialog from "../dialogs/create-task-dialog";
import { useParams } from "next/navigation";
import { getWorkflowByProjectId } from "@/app/api/actions/issue-actions";


interface Task {
  issue_title: string;
 issue_id: string;
  status: string; // Status corresponds to taskStatus
  projectId: number;
}


export const KanbanBoard: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [issues, setIssues] = useState([]);
  const [taskStatuses, setTaskStatuses] = useState([]);

  const [issueDialogOpen, setIssueDialogOpen] = useState(false);

  const [projectWorkflowData, setProjectWorkflowData] = React.useState([]);

  const params = useParams();
  
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
    handleFetchProjectWorkflows();
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
    <>
    {issues.length == 0 ? (
        <EmptyState
      headingText='Create your first issue issue'
      subHeadingText="Track your project's issues right here"
      emptyStateButton={
          <AnimatedDialog
          trigger={
              <Button intent="primary" size="base">
                  Create Issue
              </Button>
          }
          content={
              <CreateTaskDialog
                  taskStatus="Todo"
                  reloadIssues={fetchIssues}
                  setCloseIssueDialog={() => setIssueDialogOpen}
              />
          }  
          
          isOpen={issueDialogOpen}
          setIsOpen={setIssueDialogOpen}
          />
      }
  />
    ) : (
    <div className="flex h-full w-full gap-5 overflow-scroll">
        {taskStatuses.map((y, i) => {
              return (
                  <Column
                      key={y}
                      title={y}
                      column={y}
                      headingColor="text-neutral-500"
                      cards={issues}
                      setCards={setIssues}
                      reloadIssues={fetchIssues}
                  />
              )     
        })}
        <div className="flex flex-col gap-2">
        {projectWorkflowData.map((y) => {
          if(!taskStatuses.includes(y.value)) {
            return (
                <Column
                  key={y.value}
                  title={y.value}
                  column={y.value}
                  cards={[]}
                  setCards={setIssues}
                  reloadIssues={fetchIssues}
                />
            )
          }
        })}
        </div>
    </div>
    )}  
    </>
  );
};

