import { API_ENDPOINT } from '@/app/services/api';
import React from 'react'
import {KanbanBoard} from '../boards/kanban-board-v2';
import { useParams } from 'next/navigation';
import Workflows from '../issues/workflows';
import EmptyState from '@/app/packages/ui/emptyStates';
import AnimatedDialog from '@/app/packages/ui/animatedDialog';
import Button from '@/app/packages/ui/button';
import CreateTaskDialog from '../dialogs/create-task-dialog';

function IssueAppContent() {
  const params = useParams<{ id: number; }>()
  const id = params.id;

  return (
    <div className="App">
      <KanbanBoard projectId={id} />
    </div>
  );
}

export default IssueAppContent