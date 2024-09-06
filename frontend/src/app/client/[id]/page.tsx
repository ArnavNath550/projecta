'use client'
import AppContent from '@/app/components/app-content'
import TasksAppContent from '@/app/components/app-content/tasks-app-content'
import Sidebar from '@/app/components/sidebar'
import { IconCircle, IconStack, IconTable } from '@tabler/icons-react'
import React from 'react'

function Client() {
  const [appContent, setAppContent] = React.useState(<span>app content</span>);
  const [sidebarProjectItems, setSideabrProjectItems] = React.useState([
    {
      'tabName': 'Tasks',
      'tabIcon': <IconTable size={20} className="text-on-surface" strokeWidth={1} />,
      'tabPage': <TasksAppContent />
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
      <AppContent content={appContent}/>
    </div>
  )
}

export default Client