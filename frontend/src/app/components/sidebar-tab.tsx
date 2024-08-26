import { IconSearch } from '@tabler/icons-react'
import React, { ReactNode } from 'react'


type Props = {
    tabIcon: ReactNode
    tabName: string
}

function SidebarTab(props: Props) {
  return (
       <div className="flex flex-row gap-2.5 items-center p-1 rouned-md cursor-pointer">
            {props.tabIcon}
            <div>
                <span className="font-regular text-sm text-on-surface">{props.tabName}</span>
            </div>
        </div>
  )
}

export default SidebarTab