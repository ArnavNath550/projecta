'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/app/packages/ui/button';
import { Input, TextArea } from '@/app/packages/ui/input';
import { Chip } from '@/app/packages/ui/chip';
import { IconChevronDown, IconChevronRight, IconLineDashed, IconTags, IconTimeDuration0, IconUser, IconUserCircle, IconWifi2 } from '@tabler/icons-react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { generateObjectId } from '@/app/helpers';
import AnimatedDropdown from '@/app/packages/ui/animatedDropdown';
import TooltipButton from '@/app/packages/ui/animatedTooltip';
import { useKeyPress } from '../../../../helpers';
import { API_ENDPOINT } from '@/app/services/api';

type Props = {
  taskStatus: string,
  reloadIssues: () => any,
  setIsOpen: () => void
}

const CreateTaskDialog = (props: Props) => {
  const { data: session } = useSession();
  const [priorityDropdownItems, setPriorityDropdownItems] = React.useState([
    {
      'label': 'Low',
      'value': 'LOW'
    },
    {
      'label': 'Medium',
      'value': 'MEDIUM'
    },
    {
      'label': 'High',
      'value': 'HIGH'
    }
  ]);
  const [priority, setPriority] = React.useState("");

  const params = useParams();
  
  // Formik form handler
  const formik = useFormik({
    initialValues: {
      issueName: '',
      issueDescription: '',
    },
    validationSchema: Yup.object({
      issueName: Yup.string().required('Issue Name is required'),
      issueDescription: Yup.string(),
      issuePriority: Yup.string().oneOf(['low', 'medium', 'high'], 'Invalid priority'),
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
        "issue_status": "Open",
        "issue_priority": "High",
        "issue_tags": {
          "frontend": true,
          "bug": true,
          "urgent": true
        },
        "issue_identifier": "ISSUE-12345",
        "issue_id": issueId,
        "project_creator": session?.user.id,
        "project_id": params.id
      });


      reloadIssues();
      // console.log(`response`, response);
      props.setIsOpen(false);
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

  return (
    <div className="w-[650px] h-full p-[15px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-row gap-2 items-center">
          <Chip label="Project.A" size="s" />
          <IconChevronRight size={12} color="#fff" />
          <span className="font-normal text-xs">New Task</span>
        </div>
        <div className="flex flex-col gap-2 pt-3 pb-3">
          <Input
            id="issueName"
            name="issueName"
            placeholder="Issue Name"
            variant="unstyled"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.issueName}
          />
          {formik.touched.issueName && formik.errors.issueName ? (
            <div className="text-error text-xs">{formik.errors.issueName}</div>
          ) : null}

          <TextArea
            id="issueDescription"
            name="issueDescription"
            placeholder="Write a description, a task brief, or collect ideas..."
            variant="unstyled"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.issueDescription}
          />
          {formik.touched.issueDescription && formik.errors.issueDescription ? (
            <div className="text-error text-xs">{formik.errors.issueDescription}</div>
          ) : null}

          <div className="flex flex-row gap-2">
            <AnimatedDropdown
              trigger={
                <Chip size="s" label={props.taskStatus} icon={<IconLineDashed size={14}/>}/>
              }
              dropdownItems={priorityDropdownItems}
              itemAction={(value: string) => setPriority(value)}
              />
            <AnimatedDropdown
              trigger={
                <Chip size="s" label={priority ? priority : "Priority"} icon={<IconLineDashed size={14}/>}/>
              }
              dropdownItems={priorityDropdownItems}
              itemAction={(value: string) => setPriority(value)}
              />

              <AnimatedDropdown
              trigger={
                <Chip size="s" label="Due Date" icon={<IconTimeDuration0 size={14}/>}/>
              }
              dropdownItems={priorityDropdownItems}
              itemAction={(value: string) => setPriority(value)}
              />

              <AnimatedDropdown
              trigger={
                <Chip size="s" label="Tags" icon={<IconTags size={14}/>}/>
              }
              dropdownItems={priorityDropdownItems}
              itemAction={(value: string) => setPriority(value)}
              />
            
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end items-center">
          <Button intent="secondary" size="s" type="button" onClick={() => formik.resetForm()}>
            Cancel
          </Button>
          <TooltipButton
            tooltipText=''
            keyboardShortcut={['Ctrl', 'Enter']}
            buttonContent={<Button intent="primary" size="s" type="submit" disabled={formik.isSubmitting}>
            Create Task
          </Button>}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateTaskDialog;