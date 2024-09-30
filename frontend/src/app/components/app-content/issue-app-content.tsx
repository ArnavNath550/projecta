import { API_ENDPOINT } from '@/app/services/api';
import React from 'react'
import TableDataView from '../boards/table-data-view';

function IssueAppContent() {
  const [viewType, setViewType] = React.useState('BOARD');
  return (
    <div>
      {viewType == 'BOARD' ? (
        <TableDataView />
      ) : (
        <span>Kanban</span>
      )}
    </div>
  )
}

export default IssueAppContent