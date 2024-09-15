'use client'
import AppContent from '@/app/components/app-content'
import { CustomKanban } from '@/app/components/app-content/tasks-app-content'
import FullPageLoader from '@/app/components/loaders/full-page-loader'
import Sidebar from '@/app/components/sidebar'
import { API_ENDPOINT } from '@/app/services/api'
import { serviceFetchProjectDetails } from '@/app/services/project-service'
import { IconCircle, IconStack, IconTable } from '@tabler/icons-react'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

function Client() {
  const params = useParams<{ id: number; }>()
  useEffect(() => {
    window.location.href = "/client/"+params.id+"/tasks";
  }, []);

  return (
    <FullPageLoader />
  )
}

export default Client