import { API_ENDPOINT } from '@/app/services/api';
import React from 'react'
import { KanbanBoard } from '../boards/kanban-board';

function IssueAppContent() {
  return (
    <div>
      <KanbanBoard />
    </div>
  )
}

export default IssueAppContent