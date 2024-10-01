import { API_ENDPOINT } from '@/app/services/api';
import React from 'react'
import { KanbanBoard } from '../boards/kanban-board';
import { useParams } from 'next/navigation';

function IssueAppContent() {
  const params = useParams<{ id: number; }>()
  const id = params.id;

  return (
    <div>
      <KanbanBoard projectId={id} />
    </div>
  )
}

export default IssueAppContent