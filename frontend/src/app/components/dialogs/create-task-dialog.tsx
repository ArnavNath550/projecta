'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/app/packages/ui/button';
import { Input, TextArea } from '@/app/packages/ui/input';
import { Chip } from '@/app/packages/ui/chip';
import { IconCalendar, IconChevronDown, IconChevronRight, IconLineDashed, IconTags, IconTimeDuration0, IconUser, IconUserCircle, IconWifi2, IconX } from '@tabler/icons-react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { generateObjectId, ISSUE_PRIORITY_LIST } from '@/app/helpers';
import AnimatedDropdown from '@/app/packages/ui/animatedDropdown';
import TooltipButton from '@/app/packages/ui/animatedTooltip';
import { useKeyPress } from '../../../../helpers';
import { API_ENDPOINT } from '@/app/services/api';

import Editor from '../editor';
import AnimatedTagsDropdown from '@/app/packages/ui/animatedDropdown/animated-tags-dropdown';
import CalendarDropdown from '@/app/packages/ui/calendarPicker';
import AnimatedDialog from '@/app/packages/ui/animatedDialog';
import SetIssueDueDateDialog from './issues/create-issue/set-issue-due-date-dialog';
import TagSelectorDialog from './list-content/tag-selector-dialog';
import CreateTagDialog from './create-tag-dialog';
import { format, formatDate } from 'date-fns';

type Props = {
  taskStatus: string,
  reloadIssues: () => any,
  setCloseIssueDialog: () => void
}

const CreateTaskDialog = (props: Props) => {
  const { data: session } = useSession();
  const [priority, setPriority] = React.useState("");
  const [issueName, setIssueName] = React.useState("");
  const [issueDescription, setIssueDescription] = React.useState("");

  const [isIssueDueDateIsOpen, setIssueDueDateIsOpen] = React.useState(false);
  const [selectedDueDate, setSelectedDueDate] = React.useState("");
  const [isIssueTagsOpen, setIsIssueTagsOpen] = React.useState(false);

  const params = useParams();
  
  // Formik form handler
  const formik = useFormik({
    initialValues: {
      issueName: issueName,
      issueDescription: issueDescription,
      issuePriority: priority
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      issueName: Yup.string().required('Issue Name is required'),
      issueDescription: Yup.string(),
      issuePriority: Yup.string().oneOf(['LOW', 'MEDIUM', 'HIGH', 'URGENT'], 'Invalid priority').required(),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await createTask(values, setSubmitting, resetForm, props.reloadIssues);
    },
  });

  const createTask  = async(values: any, setSubmitting: any, resetForm: () => void, reloadIssues: () => void) => {
    try {
      const issueId = generateObjectId();

      const response = await axios.post(API_ENDPOINT + '/issues', {
        "issue_name": values.issueName,
        "issue_description": values.issueDescription,
        "issue_status": props.taskStatus,
        "issue_due_date": selectedDueDate,
        "issue_priority": values.issuePriority,
        "issue_tags": issueSelectedTags,
        "issue_identifier": "ISSUE-"+issueId,
        "issue_id": issueId,
        "project_creator": session?.user.id,
        "project_id": params.id
      });

      reloadIssues();
      props.setCloseIssueDialog(false);
      resetForm();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  useKeyPress(['Enter'], formik.submitForm);

  // tags
  const [tags, setTags] = React.useState<{ label: string, value: string }[]>([]);
  const [issueSelectedTags, setIssueSelectedTags] = React.useState([]);
  const [issueViewState, setIssueViewState] = React.useState<String>("ISSUE");

  interface Tag {
    id: number;
    tag_name: string;
    tag_colour: string;
    tag_id: string;
    tag_creator: string;
    project_id: string;
    created_at: string;
  }

  React.useEffect(() => {
    // Fetch tags when the component mounts
    const fetchTags = async () => {
      try {
        const response = await axios.get<{ data: Tag[] }>(API_ENDPOINT + `/tags/project/${params.id}`);
        setTags(response.data.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);


  return (
    <div className="w-[650px] h-full p-[15px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-row gap-2 items-center">
          <Chip label="Project.A" size="s" />
          <IconChevronRight size={12} color="#fff" />
          <span className="font-normal text-xs">{props.taskStatus == "ISBACK" ? "Backlog" : "New Issue"}</span>
        </div>
        <div className="flex flex-col gap-2 pt-3 pb-3">
          {/* Update Issue Name input field to reflect state */}
          <Input
            id="issueName"
            name="issueName"
            placeholder={props.taskStatus == "ISBACK" ? "Backlog Name" : "Issue Name"}
            variant="unstyled"
            onChange={(e) => {
              formik.handleChange(e); // Formik handle change
              setIssueName(e.target.value); // Update state with the new value
            }}
            onBlur={formik.handleBlur}
            value={formik.values.issueName}
          />
          {formik.touched.issueName && formik.errors.issueName ? (
            <div className="text-error text-xs">{formik.errors.issueName}</div>
          ) : null}

          <Editor
            editorState={issueDescription}
            setEditorState={setIssueDescription}
          />
          {formik.errors.issueDescription ? (
            <div className="text-error text-xs">{formik.errors.issueDescription}</div>
          ) : null}
          <div className="flex flex-row gap-2 items-center">
            {issueSelectedTags.length > 0 ?(
              <div className="flex flex-row items-center gap-3 text-xs font-semiold text-on-surface">
                Tags
                {issueSelectedTags.map((y) => {
                  return <div className="animate-fade-in-left"><Chip size="s" label={y.tag_name} icon={<IconX size={12} />} /></div>;
                })}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <AnimatedDropdown
              trigger={
                <Chip size="base" label={priority ? priority : "Priority"} icon={<IconLineDashed size={14}/>}/>
              }
              dropdownItems={ISSUE_PRIORITY_LIST}
              itemAction={(value: string) => setPriority(value)}
            />
            <div className="relative">
              <AnimatedDialog
                trigger={<Chip size="base" label={`Tags`} icon={<IconLineDashed size={14}/>}/>}
                content={tags.length > 0 ? <TagSelectorDialog list={tags} setIssueSelectedTags={(selectedTags: Tag[]) => setIssueSelectedTags(selectedTags)} setCloseTagSelectorDialog={setIsIssueTagsOpen}/> : <CreateTagDialog />}
                isOpen={isIssueTagsOpen}
                setIsOpen={setIsIssueTagsOpen}
              />
            </div>
            <div className="relative">
              <AnimatedDialog 
                isOpen={isIssueDueDateIsOpen}
                setIsOpen={setIssueDueDateIsOpen}
                trigger={<Chip size="base" label={selectedDueDate ? format(new Date(selectedDueDate), 'd MMM') : "Due Date"} icon={<IconCalendar size={14}/>}/>}
                content={
                  <SetIssueDueDateDialog selectedDueDate={selectedDueDate} setSelectedDueDate={setSelectedDueDate} onSetIssueDueDateDialogClosed={setIssueDueDateIsOpen}/>
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-end items-center">
          <Button intent="secondary" size="s" type="button" onClick={() => props.setCloseIssueDialog}>
            Cancel
          </Button>
          <TooltipButton
            tooltipText=''
            keyboardShortcut={['Ctrl', 'Enter']}
            buttonContent={<Button intent="primary" size="s" type="submit" disabled={formik.isSubmitting}>
            Create Issue
          </Button>}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateTaskDialog;
