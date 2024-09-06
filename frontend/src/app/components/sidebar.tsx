import React from 'react'
import SidebarUserTab from './sidebar-user-tab'
import SidebarTab from './sidebar-tab'
import { IconCircle, IconHome, IconHome2, IconInbox, IconNotification, IconSearch, IconSettings, IconStack, IconStack2, IconTable } from '@tabler/icons-react'
import SidebarProjectTab from './sidebar-project-tab';
import Button from '../packages/ui/button';
import AnimatedDialog from '../packages/ui/animatedDialog';
import CreateProjectDialog from './dialogs/create-project-dialog';
import SidebarProjectSwitcher from './sidebar-project-switcher';
import AnimatedPopover from '../packages/ui/animatedPopover';
import ProjectSelectorDialog from './dialogs/project-selector-dialog';

type Props = {
  sidebarProjectItems: [],
  setAppContent: () => void
}

function Sidebar(props: Props) {
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
    <div className="w-[245px] h-full p-3.5 flex flex-col gap-2 animate-fade-in border-r-[1px] border-surface-lighter">
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
        <div>
          <AnimatedDialog
           trigger={
            <SidebarProjectSwitcher 
              projectIcon="💻"
              projectName="Rocket OS"
            />
           }
           content={
            <ProjectSelectorDialog />
            }
           />
        </div>
        <div className="flex flex-col gap-1 pl-2">
            {props.sidebarProjectItems.map((y) => {
              return (
                <SidebarTab 
                  tabIcon={y.tabIcon}
                  tabName={y.tabName}
                  setAppContent={props.setAppContent}
                  appContent={y.tabPage}
                />
              )
            })}
        </div>
        
    </div>
  )
}

export default Sidebar