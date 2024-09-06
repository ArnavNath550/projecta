'use client'
import React, { ReactNode } from 'react'
import AppContentNav from './app-content-nav'
import { useSession } from 'next-auth/react'

type ContentType = {
  content: ReactNode
}

function AppContent(props: ContentType) {
  const { data: session } = useSession();
  return (
    <div className="w-full h-full p-5 pt-2 overflow-scroll">
      <AppContentNav />
      <div className="pt-2 pb-3 w-full h-full">
        <div className="p-2 rounded-md w-full h-full">
          {props.content}
        </div>
      </div>
    </div>
  )
}

export default AppContent