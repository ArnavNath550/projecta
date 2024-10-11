import React from 'react'
import Button from '../button'

function EmptyState() {
  return (
    <div className="flex flex-col gap-4 text-center items-center justify-center w-[500px] m-auto">
        <div className="flex flex-col gap-2">
            <div className="text-3xl font-medium">Let's create your Project's Layers</div>
            <div className="text-sm text-on-surface">Split up your project into different layers, eg. Frontend, Backend, Mobile, Server. Manage issues/backlogs between Layers</div>
        </div>
        <div>
            <Button intent="primary" size="base">
                Create Layer
            </Button>
        </div>
    </div>
  )
}

export default EmptyState