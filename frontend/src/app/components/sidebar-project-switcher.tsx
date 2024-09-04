import { IconChevronDown } from '@tabler/icons-react'
import React from 'react'

type Props = {
    projectIcon: string,
    projectName: string
}

function SidebarProjectSwitcher(props: Props) {
  return (
    <div className="bg-surface-lighter flex flex-row justify-between items-center p-1 rounded-md cursor-pointer hover:bg-surface transition-all">
        <div className="flex flex-row gap-2.5 items-center">
            <div className={`p-0.5 w-[25px] flex items-center justify-center text-sm bg-surface rounded-sm`}>
                {props.projectIcon}
            </div>
            <span className="font-regular text-sm text-[#fff]">{props.projectName}</span>
        </div>
        <div>
            <IconChevronDown size={20} color="#fff" />
        </div>
    </div>
  )
}

export default SidebarProjectSwitcher