import { renderHTML } from '@/app/helpers'
import { Chip } from '@/app/packages/ui/chip'
import { Input } from '@/app/packages/ui/input'
import { IconLineDashed, IconStatusChange, IconTag } from '@tabler/icons-react'
import React from 'react'

type Props = {
    issueId: number,
    issueTitle: string,
    issueDescription: string,
}

function IssueDetailDialog(props: Props) {
  return (
    <div className="w-[850px]">
        <div className="p-3">
            <div className="p-2 font-medium text-2xl">
                <Input
                    id="issue-title"
                    variant="unstyled"
                    value={props.issueTitle}
                    placeholder="Issue Title"
                />
            </div>
            <div className="flex flex-row items-center gap-2 pl-2 pr-2 pb-3 border-b-[1px] border-surface-border">
                <Chip   
                    label='Status'
                    icon={<IconStatusChange size={12} />}
                    size="base"
                />
                <Chip   
                    label='Priority'
                    icon={<IconLineDashed size={12} />}
                    size="base"
                />
                <Chip   
                    label='Tags'
                    icon={<IconTag size={12} />}
                    size="base"
                />
            </div>
            <div className="p-2">
                {renderHTML(props.issueDescription)}
            </div>
        </div>
    </div>
  )
}

export default IssueDetailDialog