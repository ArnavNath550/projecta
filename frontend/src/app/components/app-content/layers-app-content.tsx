import EmptyState from '@/app/packages/ui/emptyStates'
import React from 'react'

type Props = {
    id: string
}

function LayersAppContent(props: Props) {
  return (
    <div>
        <EmptyState />
    </div>
  )
}

export default LayersAppContent