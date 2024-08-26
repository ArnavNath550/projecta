import React from 'react'

type Props = {
  userName: string
}

function SidebarUserTab(props: Props) {
  return (
    <div className="flex flex-row gap-2.5 items-center p-1 rouned-md cursor-pointer">
        <div className="p-2 bg-surface rounded-sm">

        </div>
        <div>
            <span className="font-regular text-sm">{props.userName}</span>
        </div>
    </div>
  )
}

export default SidebarUserTab