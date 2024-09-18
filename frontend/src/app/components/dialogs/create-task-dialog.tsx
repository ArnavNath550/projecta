'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/app/packages/ui/button';
import { Input, TextArea } from '@/app/packages/ui/input';
import { Chip } from '@/app/packages/ui/chip';
import { IconChevronDown, IconChevronRight, IconUser, IconWifi2 } from '@tabler/icons-react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { generateObjectId } from '@/app/helpers';

const CreateTaskDialog = () => {
  const { data: session } = useSession();

  const params = useParams();
  
  // Formik form handler
  const formik = useFormik({
    initialValues: {
      taskName: '',
      taskDescription: '',
      taskPriority: 'medium', // Added taskPriority
    },
    validationSchema: Yup.object({
      taskName: Yup.string().required('Task Name is required'),
      taskDescription: Yup.string(),
      taskPriority: Yup.string().oneOf(['low', 'medium', 'high'], 'Invalid priority'), // Validation for taskPriority
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const taskId = generateObjectId(); // Example taskId generation, replace with your method
        
        const response = await axios.post('http://localhost:8080/api/tasks', {
          taskId,
          projectId: params.id, // Replace with actual project ID
          taskCreator: session?.user.id,
          taskAssignees: [], // Replace with actual assignees if needed
          taskName: values.taskName,
          taskDescription: values.taskDescription,
          taskPriority: values.taskPriority,
        });

        console.log('Task created successfully:', response.data);
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
            name="taskName"
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
