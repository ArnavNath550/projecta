import AnimatedDialog from '@/app/packages/ui/animatedDialog'
import Button from '@/app/packages/ui/button'
import EmptyState from '@/app/packages/ui/emptyStates'
import React from 'react'
import CreateProjectLayerDialog from '../dialogs/create-project-layer-dialog'

type Props = {
    id: string
}

function LayersAppContent(props: Props) {
const [isCreateLayerModalOpen, setCreateLayerModalOpen] = React.useState(false);
  return (
    <div className="w-full h-full flex items-center justify-center">
        <EmptyState 
            image="/images/layers-illustration.svg"
            headingText="Let's create your Project's Layers"
            subHeadingText='Split up your project into different layers, eg. Frontend, Backend, Mobile, Server. Manage issues/backlogs between Layers'
            emptyStateButton={
                <AnimatedDialog 
                    trigger={<Button intent="primary" size="base" className="animate-fade-in delay-400">
                        Create Layer
                      </Button>}
                    content={<CreateProjectLayerDialog />}
                    isOpen={isCreateLayerModalOpen}
                    setIsOpen={setCreateLayerModalOpen}
                />
            }
        />
    </div>
  )
}

export default LayersAppContent