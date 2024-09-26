import Button from '@/app/packages/ui/button'
import { Input } from '@/app/packages/ui/input'
import React from 'react'

type Props = {
    taskName: string,
    taskDescription: string
}

function TaskDetailsDialog(props: Props) {
  return (
    <div className="w-[650px]">
        <div className="p-5 flex flex-col gap-2">
            <Input 
                value={props.taskName}
                variant="unstyled"
            />
            <div>
                <span className="text-sm">
                    {props.taskDescription}
                </span>
            </div>
        </div>
        <div className="border-t-[1px] border-t-surface-border">
        <div className="p-5 flex flex-row items-center justify-between">
            <div className="flex flex-row gap-2">
                <Button intent="secondary" size="s">
                    Medium
                </Button>
                <Button intent="secondary" size="s">
                Arnav Nath
                </Button> 
            </div>
            
            <Button intent="primary" size="base">
                Update
            </Button>
        </div>
        </div>
    </div>
  )
}

export default TaskDetailsDialog