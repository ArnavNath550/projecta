import { IconArrowDown, IconCaretDown, IconChevronDown, IconDropletDown } from '@tabler/icons-react'
import React from 'react'

type Props = {
    projectColor: string,
    projectIcon: string,
    projectName: string
}

function SidebarProjectTab(props: Props) {
  return (
    <div className="flex flex-row gap-2.5 justify-between items-center p-1 rouned-md cursor-pointer">
        <div className="flex flex-row gap-2 5 items-center p-1 cursor-pointer">
            <div className={`p-0.5 w-[25px] flex items-center justify-center text-sm bg-surface rounded-sm`}>
                {props.projectIcon}
            </div>
            <div>
                <span className="font-regular text-sm">{props.projectName}</span>
            </div>
        </div>
        <div>
            <IconChevronDown size={20} className="text-on-surface" />
        </div>
    </div>
  )
}

export default SidebarProjectTab