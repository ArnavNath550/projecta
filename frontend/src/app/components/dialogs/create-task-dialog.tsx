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
import { generateObjectId } from '@/app/helpers';
import AnimatedDropdown from '@/app/packages/ui/animatedDropdown';
import TooltipButton from '@/app/packages/ui/animatedTooltip';
import { useKeyPress } from '../../../../helpers';
import { API_ENDPOINT } from '@/app/services/api';

import Editor from '../editor';
import AnimatedTagsDropdown from '@/app/packages/ui/animatedDropdown/animated-tags-dropdown';
import CalendarDropdown from '@/app/packages/ui/calendarPicker';

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
      issuePriority: Yup.string().oneOf(['low', 'medium', 'high'], 'Invalid priority').required(),
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
        "issue_priority": values.issuePriority,
        "issue_tags": selectedTags,
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
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
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
        const tagItems = response.data.data.map(tag => ({
          label: tag.tag_name,
          value: tag.tag_name.toUpperCase(), // Adjust value based on your logic
        }));
        setTags(tagItems);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const addTag = (value) => {
    if (selectedTags.indexOf(value) > -1) {
        // If the tag exists, remove it
        setSelectedTags(selectedTags.filter(tag => tag !== value));
    } else {
        // If the tag does not exist, add it
        setSelectedTags([...selectedTags, value]);
    }
};


  return (
    <div className="w-[650px] h-full p-[15px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-row gap-2 items-center">
          <Chip label="Project.A" size="s" />
          <IconChevronRight size={12} color="#fff" />
          <span className="font-normal text-xs">New Issue</span>
        </div>
        <div className="flex flex-col gap-2 pt-3 pb-3">
          {/* Update Issue Name input field to reflect state */}
          <Input
            id="issueName"
            name="issueName"
            placeholder="Issue Name"
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
            {selectedTags.length > 0 ?(
              <div className="flex flex-row items-center gap-3 text-xs font-semiold text-on-surface">
                Tags
                {selectedTags.map((y) => {
                  return <div className="animate-fade-in-left"><Chip size="s" label={y} icon={<IconX size={12} onClick={() => addTag(y)}/>} /></div>;
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
              dropdownItems={[
                { label: 'Low', value: 'LOW' },
                { label: 'Medium', value: 'MEDIUM' },
                { label: 'High', value: 'HIGH' }
              ]}
              itemAction={(value: string) => setPriority(value.toLowerCase())}
            />
            <AnimatedTagsDropdown
              trigger={
                <Chip size="base" label={`Tags`} icon={<IconLineDashed size={14}/>}/>
              }
              dropdownItems={tags}
              itemAction={(value: string) => addTag(value)}
            />

            <div className="relative">
              <Chip size="base" label={"Due Date"} icon={<IconCalendar size={14}/>}/>
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
