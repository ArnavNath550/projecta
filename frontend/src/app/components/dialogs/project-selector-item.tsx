import Button from '@/app/packages/ui/button'
import React from 'react'

function ProjectSelectorItem() {
  return (
    <div className="flex flex-row justify-between items-center w-[500px] p-3 hover:bg-surface-lighter rounded-md cursor-pointer transition-all">
        <div className="flex flex-row gap-4 items-center w-[500px]">
        <div>
            <div className={`p-0.5 w-[50px] h-[50px] flex items-center justify-center text-2xl bg-on-surface rounded-md`}>
                💻
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <div className="font-medium text-lg">
                Rocket Os
            </div>
            <div className="flex flex-row items-center ml-[10px]">
                <div className="w-[30px] h-[30px] bg-surface-lighter border-[1px] border-surface-border rounded-full -ml-[10px] z-30"></div>
                <div className="w-[30px] h-[30px] bg-surface-lighter border-[1px] border-surface-border rounded-full -ml-[10px] z-20"></div>
                <div className="w-[30px] h-[30px] bg-surface-lighter border-[1px] border-surface-border rounded-full -ml-[10px] z-10"></div>
            </div>
        </div>
        </div>
        <div>
            <Button intent="primary" size="l">
                Enter
            </Button>
        </div>
    </div>
  )
}

export default ProjectSelectorItem