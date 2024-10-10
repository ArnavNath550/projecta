import { IconCircle } from '@tabler/icons-react'
import * as React from 'react'

type Props = {
    workflowName: string,
    workflowDescription: string
}

const WorkflowItem: React.ReactNode = (props: Props) => {
    return (
        <div className="flex flex-row gap-2 items-center bg-on-surface-darker border-[1px] border-surface-border p-2 rounded-md">
            <div>
                <IconCircle size={12} color="#fff" />
            </div>
            <div className="flex-col gap-2">
                <div className="text-md font-medium">
                    {props.workflowName}
                </div>
                <div className="text-xs font-normal text-on-surface">
                    {props.workflowDescription}
                </div>
            </div>
        </div>
    )
}

export default WorkflowItem;