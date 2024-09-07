'use client'
import AppContent from '@/app/components/app-content'
import { CustomKanban } from '@/app/components/app-content/tasks-app-content'
import Sidebar from '@/app/components/sidebar'
import { IconCircle, IconStack, IconTable } from '@tabler/icons-react'
import React from 'react'

function TasksPage() {
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
  return (
    <div className="w-full h-full flex flex-row">
      <Sidebar sidebarProjectItems={sidebarProjectItems} setAppContent={setAppContent} />
      <AppContent content={<CustomKanban />}/>
    </div>
  )
}

export default TasksPage