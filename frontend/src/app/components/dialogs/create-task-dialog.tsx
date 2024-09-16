'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DialogHeaderContent from './content/dialog-header-content';
import Button from '@/app/packages/ui/button';
import { Input, TextArea } from '@/app/packages/ui/input';
import { Chip } from '@/app/packages/ui/chip';
import { IconChevronDown, IconChevronRight, IconUser, IconWifi1, IconWifi2 } from '@tabler/icons-react';
import { postDataMethod } from '@/app/services/api';
import { ObjectId } from 'bson'
import { generateObjectId } from '@/app/helpers';
import { useSession } from 'next-auth/react';
import AnimatedPopover from '@/app/packages/ui/animatedPopover';
import AnimatedDropdown from '@/app/packages/ui/animatedDropdown';


const CreateTaskDialog = () => {
  const {data: session} = useSession();
  // Formik form handler
  const formik = useFormik({
    initialValues: {
      taskName: '',
      taskDescription: '',
    },
    validationSchema: Yup.object({
      taskName: Yup.string().required('Task Name is required'),
      taskDescription: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const taskId = generateObjectId();
        const response = await postDataMethod('http://localhost:8080/api/tasks/', {
          taskId: taskId, // Generating a unique task ID
          taskName: values.taskName,
          taskDescription: values.taskDescription,
          taskCreator: session?.user.id,
          taskIcon: 'https://example.com/icon.png', // Static for now, can be dynamic
        });
        console.log('Task created successfully:', response);
        resetForm();
      } catch (error) {
        console.error('Error creating task:', session?.user.id);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-[650px] h-full p-[15px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-row gap-2 items-center">
          <Chip label="Task.A" size="s" />
          <IconChevronRight size={12} color="#fff" />
          <span className="font-normal text-xs">New Task</span>
        </div>
        <div className="flex flex-col gap-2 pt-3 pb-3">
          <Input
  id="taskName"
  name="taskName" // Correct name attribute
  placeholder="Task Name"
  variant="unstyled"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.taskName}
/>

          {formik.touched.taskName && formik.errors.taskName ? (
            <div className="text-error text-xs">{formik.errors.taskName}</div>
          ) : null}
          
          <TextArea
            id="taskDescription"
            name="taskDescription"
            placeholder="Write a description, a task brief, or collect ideas..."
            variant="unstyled"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.taskDescription}
          />
          {formik.touched.taskDescription && formik.errors.taskDescription ? (
            <div className="text-error text-xs">{formik.errors.taskDescription}</div>
          ) : null}
        </div>
        <div className="flex flex-row gap-2">
              <Button intent="secondary" size="s">
            <div className="flex flex-row gap-1 items-center justify-center">
            <IconWifi2 color="#fff" size={15} />
            Priority
            <IconChevronDown size={15} />
            </div>
          </Button>
          <Button intent="secondary" size="s">
            <div className="flex flex-row gap-1 items-center justify-center">
            <IconUser color="#fff" size={15} />
            Assignee
            <IconChevronDown size={15} />
            </div>
          </Button>
        </div>
        <div className="flex flex-row gap-2 justify-end items-center">
          <Button intent="secondary" size="s" type="button" onClick={() => formik.resetForm()}>
            Cancel
          </Button>
          <Button intent="primary" size="s" type="submit" disabled={formik.isSubmitting}>
            Create Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskDialog;
