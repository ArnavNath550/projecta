'use client'
import AppContent from '@/app/components/app-content'
import IssueAppContent from '@/app/components/app-content/issue-app-content'
import IssueDetailDialog from '@/app/components/dialogs/issue-detail-dialog'
import FullPageLoader from '@/app/components/loaders/full-page-loader'
import Sidebar from '@/app/components/sidebar'
import { API_ENDPOINT } from '@/app/services/api'
import { serviceFetchProjectDetails } from '@/app/services/project-service'
import { IconCircle, IconStack, IconTable } from '@tabler/icons-react'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React from 'react'

function IssueDetailsPage() {
  const [appContent, setAppContent] = React.useState(<span>app content</span>);
  const params = useParams();
  const issueId = params.issueId;
  const id = params.id;
  const [projectDataLoading, setProjectDataLoading] = React.useState(true);
  const [projectData, setProjectData] = React.useState([]);
  const [sidebarProjectItems, setSideabrProjectItems] = React.useState([
    {
      'tabName': 'Tasks',
      'tabIcon': <IconTable size={20} className="text-on-surface" strokeWidth={1} />,
      'tabPage': <span>Hello</span>
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
      <AppContent projectData={projectData} projectDataLoading={projectDataLoading} content={<IssueDetailDialog issueId={params.issueId} id={id} />}/>
      </div>
      )}
    </>
  )
}

export default IssueDetailsPage