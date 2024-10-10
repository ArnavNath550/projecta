import { renderHTML } from '@/app/helpers';
import Button from '@/app/packages/ui/button';
import { Chip } from '@/app/packages/ui/chip';
import { Input } from '@/app/packages/ui/input';
import { IconArrowLeft, IconArrowRight, IconLineDashed, IconLink, IconStatusChange, IconX } from '@tabler/icons-react';
import React from 'react';
import Editor from '../editor';
import AnimatedDropdown from '@/app/packages/ui/animatedDropdown';
import AnimatedTagsDropdown from '@/app/packages/ui/animatedDropdown/animated-tags-dropdown';
import { API_ENDPOINT } from '@/app/services/api';
import axios, { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import TooltipButton from '@/app/packages/ui/animatedTooltip';
import AnimatedToast from '@/app/packages/ui/animatedToast';

type Props = {
  id: number;
  issueId: number;
};

interface Tag {
  id: number;
  tag_name: string;
  tag_colour: string;
  tag_id: string;
  tag_creator: string;
  project_id: string;
  created_at: string;
}

function IssueDetailDialog(props: Props) {
  const [issueTitle, setIssueTitle] = React.useState('');
  const [issueDescription, setIssueDescription] = React.useState('');
  const [issuePriority, setIssuePriority] = React.useState('');
  const [tags, setTags] = React.useState<{ label: string; value: string }[]>([]);
  const [issueStatus, setIssueStatus] = React.useState('');

  const [selectedTags, setSelectedTags] = React.useState([]);
  const [issueUpdatedChangesToastOpen, setIssueUpdatedChangesToastOpen] = React.useState(false);

  const params = useParams();

  // Fetch issue details when the component mounts
  const fetchIssueDetails = async () => {
    try {
      const response = await axios.get(API_ENDPOINT + `/issues/` + props.issueId);
      const data = response.data;

      setIssueDescription(data.issue_description);
      setIssuePriority(data.issue_priority);
      setTags(data.issue_tags);
      setIssueTitle(data.issue_name);
      setIssueStatus(data.issue_status);
    } catch (error) {
      console.log('Error fetching issue data: ', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get<{ data: Tag[] }>(API_ENDPOINT + `/tags/project/${params.id}`);
      const tagItems = response.data.data.map((tag) => ({
        label: tag.tag_name,
        value: tag.tag_name.toUpperCase(), // Adjust value based on your logic
      }));
      setTags(tagItems);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  React.useEffect(() => {
    fetchTags();
    fetchIssueDetails();
  }, []);

  const addTag = (value: string) => {
    if (selectedTags.indexOf(value) > -1) {
      // If the tag exists, remove it
      setSelectedTags(selectedTags.filter((tag) => tag !== value));
    } else {
      // If the tag does not exist, add it
      setSelectedTags([...selectedTags, value]);
    }
  };

  const updateIssue = async (issueId: string, issueName: string, issueDescription: string) => {
    try {
      const response = await axios.put(API_ENDPOINT + `/issues/${issueId}`, {
        issue_name: issueName,
        issue_description: issueDescription,
      });
      console.log('Issue updated successfully:', response.data);
      setIssueUpdatedChangesToastOpen(true); // Trigger the toast notification on successful update
    } catch (error: AxiosError) {
      console.error('Error updating issue:', error.response ? error.response.data : error.message);
    }
  };

  const handleTitleBlur = () => {
    updateIssue(props.issueId.toString(), issueTitle, issueDescription);
  };

  const handleDescriptionBlur = () => {
    updateIssue(props.issueId.toString(), issueTitle, issueDescription);
  };

  return (
    <div className="max-w-[850px]">
      <AnimatedToast
        title="Issue Updated"
        description="Your issue has been updated"
        open={issueUpdatedChangesToastOpen}
        setOpen={setIssueUpdatedChangesToastOpen}
        duration={3000}
      />
      <div className="flex flex-row items-center gap-2 pl-3 pt-3">
        <Button intent="unstyled" size="s">
          <IconArrowLeft size={12} color="#fff" />
        </Button>
        <Button intent="unstyled" size="s">
          <IconArrowRight size={12} color="#fff" />
        </Button>
      </div>
      <div className="p-3 pt-0">
        <div className="p-2 font-medium text-2xl">
          <Input
            id="issue-title"
            variant="unstyled"
            value={issueTitle}
            placeholder="Issue Title"
            onChange={(e) => setIssueTitle(e.target.value)}
            onBlur={handleTitleBlur} // Update on blur
          />
        </div>
        <div className="flex flex-col gap-2 pl-2 pr-2 border-b-[1px] border-surface-border">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-2 pr-2">
              <Chip label={issueStatus} icon={<IconStatusChange size={12} />} size="base" />
              <AnimatedDropdown
                trigger={<Chip size="base" label={issuePriority ? issuePriority : 'Priority'} icon={<IconLineDashed size={14} />} />}
                dropdownItems={[
                  { label: 'Low', value: 'LOW' },
                  { label: 'Medium', value: 'MEDIUM' },
                  { label: 'High', value: 'HIGH' },
                ]}
                itemAction={(value: string) => setIssuePriority(value.toLowerCase())}
              />
            </div>
            <div>
              <TooltipButton
                buttonContent={
                  <Button intent="unstyled" size="s">
                    <IconLink size={15} color="#fff" />
                  </Button>
                }
                tooltipText="Copy Link"
              />
            </div>
          </div>
          {selectedTags.length > 0 ? (
            <div className="flex flex-row gap-2 text-xs items-center">
              <span className="text-on-surface">Tags</span>
              {selectedTags.map((y) => (
                <Chip size="s" label={y} icon={<IconX size={12} color="#fff" onClick={() => addTag(y)} />} />
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="p-2 pt-3 pb-3 leading-[35px] text-s">
          <Editor editorState={issueDescription} setEditorState={setIssueDescription} onBlur={handleDescriptionBlur} />
        </div>
      </div>
    </div>
  );
}

export default IssueDetailDialog;
