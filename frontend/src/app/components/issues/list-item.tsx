import { updateIssuePriority } from '@/app/api/actions/issue-actions';
import { getPriorityIcon, ISSUE_PRIORITY_LIST } from '@/app/helpers';
import AnimatedDropdown from '@/app/packages/ui/animatedDropdown';
import TooltipButton from '@/app/packages/ui/animatedTooltip';
import Button from '@/app/packages/ui/button';
import { Chip } from '@/app/packages/ui/chip';
import { IconCircleDashed, IconLineDashed, IconPlus } from '@tabler/icons-react';
import { format } from 'date-fns';
import Link from 'next/link';
import * as React from 'react'

type Props = {
    data: [],
    setIssueUpdated: () => void
}

const ListItem: React.FC = (props: Props) => {
    const [priority, setPriority] = React.useState(props.data.issue_priority);

    const handleUpdateIssuePriority = async() => {
        await updateIssuePriority(props.data.issue_id, priority);
        props.setIssueUpdated(true);
    }

    React.useEffect(() => {
        handleUpdateIssuePriority();
    }, [priority]);

    return (
        <Link className="p-3 pt-2.5 pb-2.5 flex flex-row items-center justify-between border-b-[1px] border-surface-border hover:bg-[#030715] transition-all" href={`issues/`+props.data.issue_id+'/'}>
            <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row gap-2 items-center">
                    {/* <div className="text-sm text-on-surface">
                        BKLOG-250
                    </div> */}
                    <AnimatedDropdown
                        dropdownItems={ISSUE_PRIORITY_LIST}
                        trigger={
                            <Button intent="unstyled" size="s">
                        {priority ? (
                            <div>{getPriorityIcon(priority)}</div>
                        ) : (
                            <IconLineDashed size={15} color="#fff" />
                        )}
                    </Button>
                        }
                        itemAction={(val: string) => setPriority(val)}
                        />
                        <AnimatedDropdown
                        dropdownItems={ISSUE_PRIORITY_LIST}
                        trigger={
                            <Button intent="unstyled" size="s">
                        <IconCircleDashed size={15} color="#fff" />
                    </Button>
                        }
                        />
                </div>
                <div className="text-sm font-medium">
                    {props.data.issue_name}
                </div>
            </div>

            <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center gap-2">
                    <TooltipButton
                        buttonContent={
                            <Button intent="unstyled" size="s">
                                <IconPlus size={12} color="#fff" />
                            </Button>
                        }
                        tooltipText="Add Tag"
                    />
                    {props.data.issue_tags.map((y) => {
                        return <Chip label={y} />;
                    })}
                </div>
                <span className="text-sm text-on-surface">
                    {format(new Date(props.data.created_at), 'd MMM')}
                </span>
            </div>

        </Link>
    )
}

export default ListItem;