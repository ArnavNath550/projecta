'use client'
import AppContent from '@/app/components/app-content'
import { CustomKanban } from '@/app/components/app-content/tasks-app-content'
import Sidebar from '@/app/components/sidebar'
import { API_ENDPOINT } from '@/app/services/api'
import { serviceFetchProjectDetails } from '@/app/services/project-service'
import { IconCircle, IconStack, IconTable } from '@tabler/icons-react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function Client() {
  const [projectData, setProjectData] = React.useState([]);
  const searchParams = useSearchParams();
  const id = "66d9bde83d23c74900000000";
  const [projectDataLoading, setProjectDataLoading] = React.useState(true);
  const [appContent, setAppContent] = React.useState(<span>app content</span>);
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
    <div className="w-full h-full flex flex-row">
      <Sidebar projectData={projectData} projectDataLoading={projectDataLoading} sidebarProjectItems={sidebarProjectItems} setAppContent={setAppContent} />
      <AppContent content={<span>{JSON.stringify(projectData)}</span>}/>
    </div>
  )
}

export default Client