import React from 'react'
import AppContentNav from './app-content-nav'

function AppContent() {
  return (
    <div className="w-full h-full p-3 overflow-scroll">
      <AppContentNav />
      <div className="pt-2 pb-3 w-full h-full">
        <div className="p-2 bg-background border-[1px] border-surface rounded-md w-full h-full">

        </div>
      </div>
    </div>
  )
}

export default AppContent