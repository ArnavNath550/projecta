import React from 'react'
import SidebarUserTab from './sidebar-user-tab'
import SidebarTab from './sidebar-tab'
import { IconCircle, IconHome, IconHome2, IconInbox, IconNotification, IconSearch, IconSettings, IconStack, IconStack2, IconStack3, IconTable, IconGrid3x3, IconGripHorizontal, IconPlus, IconCapture } from '@tabler/icons-react'
import SidebarProjectTab from './sidebar-project-tab';
import Button from '../packages/ui/button';
import AnimatedDialog from '../packages/ui/animatedDialog';
import CreateProjectDialog from './dialogs/create-project-dialog';
import SidebarProjectSwitcher from './sidebar-project-switcher';
import AnimatedPopover from '../packages/ui/animatedPopover';
import ProjectSelectorDialog from './dialogs/project-selector-dialog';
import { useSession } from 'next-auth/react';
import TasksPage from '../client/[id]/issues/page';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type Props = {
  sidebarProjectItems: [],
  setAppContent: () => void,
  projectData: [],
  projectDataLoading: Boolean
}

function Sidebar(props: Props) {
  const { data: session } = useSession();

  const params = useParams<{ id: number; }>()

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
    <div className="w-[275px] h-full p-3.5 flex flex-col gap-2 animate-fade-in bg-sidebar border-r-[1px] border-surface-border">
        <SidebarUserTab 
          image={session?.user.image}
          userName={session?.user.name}
        />
        <div className="flex flex-col gap-1">
            <Link href={`/client/${params.id}/tasks`}>
              <SidebarTab 
                tabIcon={<IconHome size={20}  className="text-on-surface" strokeWidth={1} />}
                tabName="Home"
              />
            </Link>
            <Link href={`/client/${params.id}/tasks`}>
              <SidebarTab 
                tabIcon={<IconCapture size={20}  className="text-on-surface" strokeWidth={1} />}
                tabName="My Issues"
              />
            </Link>
        </div>
        {props.projectDataLoading == false  ?(
          <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between gap-1">
          <AnimatedDialog
           trigger={
            <SidebarProjectSwitcher 
              projectIcon="💻"
              projectName={props.projectData.project_name}
            />
           }
           content={
            <ProjectSelectorDialog />
            }
           />
           <Button intent="unstyled" size="s">
            <IconSearch size={13} />
           </Button>
          </div>
           
           <div className="flex flex-col gap-1 pl-2">
            <Link href={`/client/${params.id}/tasks`}>
              <SidebarTab 
                tabIcon={<IconStack3 size={20}  className="text-on-surface" strokeWidth={1} />}
                tabName="Issues"
              />
            </Link>

            <Link href={`/client/${params.id}/backlog`}>
              <SidebarTab 
                tabIcon={<IconCircle size={20}  className="text-on-surface" strokeWidth={1} />}
                tabName="Backlog"
              />
            </Link>

            <Link href={`/client/${params.id}/layers`}>
              <SidebarTab 
                tabIcon={<IconGrid3x3 size={20}  className="text-on-surface" strokeWidth={1} />}
                tabName="Layers"
              />
            </Link>
            <Link href={`/client/${params.id}/layers`}>
              <SidebarTab 
                tabIcon={<IconGripHorizontal size={20}  className="text-on-surface" strokeWidth={1} />}
                tabName="Roadmaps"
              />
            </Link>
            <Link href={`/client/${params.id}/settings`}>
              <SidebarTab 
                tabIcon={<IconSettings size={20}  className="text-on-surface" strokeWidth={1} />}
                tabName="Settings"
              />
            </Link>
        </div>
        </div>
        ) : (
          <></>
        )}
        
    </div>
  )
}

export default Sidebar