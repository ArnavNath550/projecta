import React from 'react'
import DialogHeaderContent from './content/dialog-header-content'
import Button from '@/app/packages/ui/button'
import { Input, TextArea } from '@/app/packages/ui/input'
import { Chip } from '@/app/packages/ui/chip'
import { IconBox, IconChevronRight, IconTag, IconTagFilled } from '@tabler/icons-react'

function CreateProjectDialog() {
  return (
    <div className="w-[500px] h-full p-[25px] pl-[30px] pr-[30px]">
        <div className="flex flex-row gap-2 items-center">
          <Chip 
            label="Project.A"
            size="s"
          />
          <IconChevronRight size={12} color="#fff"/>
          <span className="font-normal text-xs">New Project</span>
        </div>
        <div className="flex flex-col gap-2 pt-3 pb-3">
          <Input 
            id='projectName'
            placeholder='Project Name'
            variant='unstyled'
          />
          <TextArea 
            id="projectDescription"
            placeholder='Write a description, a project brief, or collect ideas...'
            variant='unstyled'
          />
        </div>
        <div className="flex flex-row gap-2 justify-end items-center">
          <Button intent="secondary" size="s">
              Cancel
            </Button>
            <Button intent="primary" size="s">
              Create Project
            </Button>
        </div>
    </div>
  )
}

export default CreateProjectDialog