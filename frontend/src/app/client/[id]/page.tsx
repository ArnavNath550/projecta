'use client'
import AppContent from '@/app/components/app-content'
import { CustomKanban } from '@/app/components/app-content/tasks-app-content-v2'
import FullPageLoader from '@/app/components/loaders/full-page-loader'
import Sidebar from '@/app/components/sidebar'
import { API_ENDPOINT } from '@/app/services/api'
import { serviceFetchProjectDetails } from '@/app/services/project-service'
import { IconCircle, IconStack, IconTable } from '@tabler/icons-react'
import { redirect, useParams, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

function Client() {
  const params = useParams<{ id: number; }>()
  useEffect(() => {
    redirect("/client/"+params.id+"/tasks");
  }, []);

  return (
    <div></div>
  )
}

export default Client