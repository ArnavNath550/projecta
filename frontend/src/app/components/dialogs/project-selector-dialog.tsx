import React from 'react'
import ProjectSelectorItem from './project-selector-item'
import DialogHeaderContent from './content/dialog-header-content'

function ProjectSelectorDialog() {
  return (
    <div className="p-2">
        <div className="p-3">
        <DialogHeaderContent 
            dialogHeader='Your Projects'
            dialogDescription='Choose which project you want to enter'
        />
        </div>
        <ProjectSelectorItem />
        <ProjectSelectorItem />
    </div>
  )
}

export default ProjectSelectorDialog