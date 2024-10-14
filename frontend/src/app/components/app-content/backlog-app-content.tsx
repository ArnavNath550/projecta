import { IconCircle, IconPlus } from '@tabler/icons-react'
import * as React from 'react'
import ListItem from '../issues/list-item'
import axios, { AxiosError } from 'axios'
import { API_ENDPOINT } from '@/app/services/api'
import { useParams } from 'next/navigation'
import AnimatedToast from '@/app/packages/ui/animatedToast'
import Button from '@/app/packages/ui/button'
import AnimatedDialog from '@/app/packages/ui/animatedDialog'
import CreateTaskDialog from '../dialogs/create-task-dialog'
import EmptyState from '@/app/packages/ui/emptyStates'
import SortableListBoard from '../boards/sortable-list-board'

function BacklogAppContent() {
    const [backlogDataLoading, setBacklogDataLoading] = React.useState(true);
    const [backlogData, setBacklogData] = React.useState([]);
    const [issueUpdated, setIssueUpdated] = React.useState(true);

    const [issueDialogOpen, setIssueDialogOpen] = React.useState(false);

    const params = useParams();
    const projectId = params.id;
    const fetchBacklogIssues = async() => {
        try {
            setBacklogDataLoading(true);
            const res = await axios.get(`${API_ENDPOINT}/issues/project/${projectId}/filter?issue_status=ISBACK`);
            const data = res.data;

            setBacklogData(data);
            setBacklogDataLoading(false);
        } catch(error: AxiosError) { // no backlog items where found
            setBacklogDataLoading(false);
            setBacklogData([]);
        }
    }

    React. useEffect(() => {
        fetchBacklogIssues();
    }, []);

  return (
    <div className="w-full">
        <AnimatedToast
            title="Issue Updated"
            description="Your issue has been updated"
            open={issueUpdated}
            setOpen={setIssueUpdated}
        />
        {backlogData.length == 0 && backlogDataLoading == false ? (
            <EmptyState
                headingText='Create your first backlog issue'
                subHeadingText="Track your project's backlog right here"
                emptyStateButton={
                    <AnimatedDialog
                    trigger={
                        <Button intent="primary" size="base">
                            Create Backlog
                        </Button>
                    }
                    content={
                        <CreateTaskDialog
                            taskStatus="ISBACK"
                            reloadIssues={fetchBacklogIssues}
                            setCloseIssueDialog={() => setIssueDialogOpen}
                        />
                    }  
                    
                    isOpen={issueDialogOpen}
                    setIsOpen={setIssueDialogOpen}
                    />
                }
            />
        ) : (
            <>
                <div className="w-full p-3 bg-surface rounded-md pl-4 flex flex-row items-center gap-3 justify-between">
            <div className="flex flex-row gap-2 items-center">
                <div>
                <IconCircle size={15} color="#fff" />
            </div>
            <span className="text-sm">Backlog</span>
            </div>
            <div>
                <AnimatedDialog
                    trigger={
                        <Button intent="secondary" size="s">
                            <IconPlus size={12} color="#fff" />
                        </Button>
                    }
                    content={
                        <CreateTaskDialog
                            taskStatus="ISBACK"
                            reloadIssues={fetchBacklogIssues}
                            setCloseIssueDialog={() => setIssueDialogOpen}
                        />
                    }  
                    
                    isOpen={issueDialogOpen}
                    setIsOpen={setIssueDialogOpen}
                    />
            </div>
        </div>
        
        <div>
            {backlogData.length == 0 && backlogDataLoading == true ? (
                <div>Loading</div>
            ) : (
                <SortableListBoard initialItems={backlogData}/>
            )}
        </div>
            </>
        )}
    </div>
  )
}

export default BacklogAppContent