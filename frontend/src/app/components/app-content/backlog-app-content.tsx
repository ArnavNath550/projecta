import { IconCircle, IconPlus } from '@tabler/icons-react'
import * as React from 'react'
import ListItem from '../issues/list-item'
import axios from 'axios'
import { API_ENDPOINT } from '@/app/services/api'
import { useParams } from 'next/navigation'
import AnimatedToast from '@/app/packages/ui/animatedToast'
import Button from '@/app/packages/ui/button'
import AnimatedDialog from '@/app/packages/ui/animatedDialog'
import CreateTaskDialog from '../dialogs/create-task-dialog'

function BacklogAppContent() {
    const [backlogDataLoading, setBacklogDataLoading] = React.useState(true);
    const [backlogData, setBacklogData] = React.useState([]);
    const [issueUpdated, setIssueUpdated] = React.useState(false);

    const [issueDialogOpen, setIssueDialogOpen] = React.useState(false);

    const params = useParams();
    const projectId = params.id;
    const fetchBacklogIssues = async() => {
        setBacklogDataLoading(true);
        const res = await axios.get(`${API_ENDPOINT}/issues/project/${projectId}/filter?issue_status=ISBACK`);
        const data = res.data;

        setBacklogData(data);
        setBacklogDataLoading(false);
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
            duration={3000}
        />
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
            {backlogDataLoading == true ? (
                <div>Loading</div>
            ) : (
                backlogData.map((y) => {
                    return <ListItem data={y} setIssueUpdated={setIssueUpdated} />;
                })
            )}
        </div>
    </div>
  )
}

export default BacklogAppContent