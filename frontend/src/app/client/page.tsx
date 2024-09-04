import AppContent from '@/app/components/app-content'
import Sidebar from '@/app/components/sidebar'
import React from 'react'

function Client() {
  return (
    <div className="w-full h-full flex flex-row">
      <Sidebar />
      <AppContent />
    </div>
  )
}

export default Client