'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DialogHeaderContent from './content/dialog-header-content';
import Button from '@/app/packages/ui/button';
import { Input, TextArea } from '@/app/packages/ui/input';
import { Chip } from '@/app/packages/ui/chip';
import { IconChevronRight } from '@tabler/icons-react';
import { API_ENDPOINT, postDataMethod } from '@/app/services/api';
import { ObjectId } from 'bson'
import { generateObjectId } from '@/app/helpers';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { userAgent } from 'next/server';


const CreateProjectDialog = () => {
  const {data: session} = useSession();
  const router = useRouter();

// Formik form handler
const formik = useFormik({
  initialValues: {
    projectName: '',
    projectDescription: '',
  },
  validationSchema: Yup.object({
    projectName: Yup.string().required('Project Name is required'),
    projectDescription: Yup.string(),
  }),
  onSubmit: async (values, { setSubmitting, resetForm }) => {
    try {
      const projectId = generateObjectId();
      // Create project
      const response = await postDataMethod(API_ENDPOINT + '/api/projects/', {
        "project_name": values.projectName,
        "project_icon": "",
        "project_identifer": values.projectName,
        "project_creator": session?.user.id,
        "project_id": projectId
      });
      

      // Hard-coded tasks to insert after project creation
      // const issues = [
      //   {
      //     taskId: generateObjectId(),
      //     taskName: "Fix login bug",
      //     taskDescription: "Resolve the issue where login tokens are not being persisted",
      //     taskPriority: "high",
      //     taskType: "bug"
      //   },
      //   {
      //     taskId: generateObjectId(),
      //     taskName: "Improve UI responsiveness",
      //     taskDescription: "Enhance the layout on mobile devices for better usability",
      //     taskPriority: "medium",
      //     taskType: "feature"
      //   },
      //   {
      //     taskId: generateObjectId(),
      //     taskName: "Database optimization",
      //     taskDescription: "Optimize queries to reduce response time for large datasets",
      //     taskPriority: "low",
      //     taskType: "optimization"
      //   }
      // ];

      // // Insert each task under the created project
      // for (const issue of issues) {
      //   await postDataMethod('http://localhost:8080/api/tasks', {
      //     taskId: issue.taskId,
      //     projectId: response.projectId, // Use the created project ID
      //     taskCreator: session?.user.id,
      //     taskAssignees: [],
      //     taskName: issue.taskName,
      //     taskDescription: issue.taskDescription,
      //     taskPriority: issue.taskPriority,
      //     taskType: issue.taskType
      //   });
      // }

      // console.log('All tasks added successfully');
      
      // Redirect to project page
      window.location.href = "/client/" + response.projectId + "/";

      // Optionally reset the form
      // resetForm();
    } catch (error) {
      console.error('Error creating project or tasks:', session?.user.id, error);
    } finally {
      setSubmitting(false);
    }
  },
});


  return (
    <div className="w-[500px] h-full p-[25px] pl-[30px] pr-[30px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-row gap-2 items-center">
          <Chip label="Project.A" size="s" />
          <IconChevronRight size={12} color="#fff" />
          <span className="font-normal text-xs">New Project</span>
        </div>
        <div className="flex flex-col gap-2 pt-3 pb-3">
          <Input
            id="projectName"
            name="projectName"
            placeholder="Project Name"
            variant="unstyled"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.projectName}
          />
          {formik.touched.projectName && formik.errors.projectName ? (
            <div className="text-error text-xs">{formik.errors.projectName}</div>
          ) : null}
          
          <TextArea
            id="projectDescription"
            name="projectDescription"
            placeholder="Write a description, a project brief, or collect ideas..."
            variant="unstyled"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.projectDescription}
          />
          {formik.touched.projectDescription && formik.errors.projectDescription ? (
            <div className="text-error text-xs">{formik.errors.projectDescription}</div>
          ) : null}
        </div>
        <div className="flex flex-row gap-2 justify-end items-center">
          <Button intent="secondary" size="s" type="button" onClick={() => formik.resetForm()}>
            Cancel
          </Button>
          <Button intent="primary" size="s" type="submit" disabled={formik.isSubmitting}>
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectDialog;
