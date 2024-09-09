'use client'
import AppContent from '@/app/components/app-content'
import { CustomKanban } from '@/app/components/app-content/tasks-app-content'
import FullPageLoader from '@/app/components/loaders/full-page-loader'
import Sidebar from '@/app/components/sidebar'
import { API_ENDPOINT } from '@/app/services/api'
import { serviceFetchProjectDetails } from '@/app/services/project-service'
import { IconCircle, IconStack, IconTable } from '@tabler/icons-react'
import React from 'react'

function TasksPage() {
  const [appContent, setAppContent] = React.useState(<span>app content</span>);
  const id = "66d9bde83d23c74900000000";
  const [projectDataLoading, setProjectDataLoading] = React.useState(true);
  const [projectData, setProjectData] = React.useState([]);
  const [sidebarProjectItems, setSideabrProjectItems] = React.useState([
    {
      'tabName': 'Tasks',
      'tabIcon': <IconTable size={20} className="text-on-surface" strokeWidth={1} />,
      'tabPage': <CustomKanban />
    },
    {
      'tabName': 'Backlog',
      'tabIcon': <IconCircle size={20} className="text-on-surface" strokeWidth={1} />
    },
    {
      'tabName': 'Layers',
      'tabIcon': <IconStack size={20} className="text-on-surface" strokeWidth={1} />
    },
  ])
  
  const handleServiceFetchProjectDetails = async(id: any) => {
    const response = await serviceFetchProjectDetails(id);
    console.log(`API `, API_ENDPOINT + "/projects/"+id);
    const data = response;
    setProjectDataLoading(true);
    setProjectData(data);
    setProjectDataLoading(false);
  }
  
  React.useEffect(() => {
    handleServiceFetchProjectDetails(id);
  }, []);

  return (
    <>
      {projectDataLoading == true ? (
        <FullPageLoader />
      ) : (
        <div className="w-full h-full flex flex-row">
      <Sidebar projectData={projectData} projectDataLoading={projectDataLoading} sidebarProjectItems={sidebarProjectItems} setAppContent={setAppContent} />
      <AppContent projectData={projectData} projectDataLoading={projectDataLoading} content={<CustomKanban />}/>
      </div>
      )}
    </>
  )
}

export default TasksPage