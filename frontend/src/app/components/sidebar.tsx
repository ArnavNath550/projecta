import React from 'react'
import SidebarUserTab from './sidebar-user-tab'
import SidebarTab from './sidebar-tab'
import { IconHome, IconHome2, IconInbox, IconNotification, IconSearch, IconSettings, IconStack, IconStack2 } from '@tabler/icons-react'
import SidebarProjectTab from './sidebar-project-tab';
import Button from '../packages/ui/button';
import AnimatedDialog from '../packages/ui/animatedDialog';
import CreateProjectDialog from './dialogs/create-project-dialog';

function Sidebar() {
  const sidebarTabs = [
    {
      'tabName': 'Search',
      'tabIcon': <IconSearch size={20} className="text-on-surface" strokeWidth={1} />
    },
    {
      'tabName': 'Settings',
      'tabIcon': <IconSettings size={20} className="text-on-surface" strokeWidth={1} />
    },
    {
      'tabName': 'Inbox',
      'tabIcon': <IconInbox size={20} className="text-on-surface" strokeWidth={1} />
    },
  ];

  const sidebarProjects = [
    {
      'projectColor': 'blue-600',
      'projectIcon': '💻',
      'projectName': 'project.a',
    },
    {
      'projectColor': 'blue-600',
      'projectIcon': '💻',
      'projectName': 'Ramp',
    },
  ];
  

  return (
    <div className="w-[245px] h-full p-3.5 flex flex-col gap-2 animate-fade-in">
        <SidebarUserTab 
          userName='Project.A'
        />
        <div className="flex flex-col gap-1">
          {sidebarTabs.map((y) => {
            return (
              <SidebarTab 
                tabIcon={y.tabIcon}
                tabName={y.tabName}
              />
            )
          })}
        </div>
        <AnimatedDialog
          trigger={
            <Button intent="primary" size="base">
              <div className="flex flex-row gap-2 items-center justify-center">
                Create Project
              </div>
            </Button>
          }
          content={<CreateProjectDialog />}
        />

        <div className="flex flex-col">
          {sidebarProjects.map((y) => {
            return (
              <SidebarProjectTab 
                projectColor={y.projectColor}
                projectIcon={y.projectIcon}
                projectName={y.projectName}
              />
            )
          })}
        </div>
    </div>
  )
}

export default Sidebar