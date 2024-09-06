import React from 'react'
import ProjectSelectorItem from './project-selector-item'
import DialogHeaderContent from './content/dialog-header-content'
import Button from '@/app/packages/ui/button'
import AnimatedDialog from '@/app/packages/ui/animatedDialog'
import CreateProjectDialog from './create-project-dialog'
import { API_ENDPOINT } from '@/app/services/api'
import axios from 'axios'

function ProjectSelectorDialog() {
  return (
    <div className="p-2">
        <div className="p-3 flex flex-row justify-between items-center">
        <DialogHeaderContent 
            dialogHeader='Your Projects'
            dialogDescription='Choose which project you want to enter'
        />
        <AnimatedDialog
          content={<CreateProjectDialog />}
          trigger={
            <Button>
          <span>Create Project</span>
        </Button>
          }
           />
        </div>
        <ProjectSelectorItem />
        <ProjectSelectorItem />
    </div>
  )
}

export default ProjectSelectorDialog