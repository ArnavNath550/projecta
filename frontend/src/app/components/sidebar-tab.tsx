import { IconSearch } from '@tabler/icons-react'
import React, { ReactNode } from 'react'


type Props = {
    tabIcon: ReactNode
    tabName: string,
    setAppContent: () => void,
    appContent: ReactNode
}

function SidebarTab(props: Props) {
  return (
       <div className="flex flex-row gap-2.5 items-center p-1 rounded-md cursor-pointer hover:bg-surface transition-all" onClick={() => props.setAppContent(props.appContent)}>
            {props.tabIcon}
            <div>
                <span className="font-regular text-sm text-[#fff]">{props.tabName}</span>
            </div>
        </div>
  )
}

export default SidebarTab