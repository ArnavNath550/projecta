"use client"
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/app/packages/ui/button';
import { Input } from '@/app/packages/ui/input';
import { API_ENDPOINT, postDataMethod } from '@/app/services/api';
import { generateObjectId } from '@/app/helpers';
import { useSession } from 'next-auth/react';

const CreateProject = () => {
    const {data: session} = useSession();
  // Formik form handler
  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectUrl: '',
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required('Project Name is required'),
      projectUrl: Yup.string()
        .required('Project URL is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        console.log(`values`, JSON.stringify(values))
        const projectId = generateObjectId();
        // Mock API call, replace with your postDataMethod or axios
        const response = await postDataMethod(API_ENDPOINT + '/projects/', {
          "project_name": values.projectName,
          "project_icon": "https://example.com/project_icon.png",
          "project_identifer": "vhe001",
          "project_creator": session?.user.id,
          "project_id": projectId
        });
  
        // // Hard-coded tasks to insert after project creation
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
        //     taskType: issue.taskType,
        //   });
        // }
  
        // console.log('All tasks added successfully');
        
        // Redirect to project page
         window.location.href = "/client/" + projectId + "/issues";
        console.log(response);
  
        // Reset form
        resetForm();
      } catch (error) {
        console.error('Error creating project or tasks:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8 items-center justify-center m-auto animate-fade-up">
        <svg width="65" height="65" className="z-50" viewBox="0 0 259 261" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_91_2)">
<path d="M194.25 0H64.7497C28.9896 0 0 29.1744 0 65.1623V195.487C0 231.476 28.9896 260.65 64.7497 260.65H194.25C230.01 260.65 259 231.476 259 195.487V65.1623C259 29.1744 230.01 0 194.25 0Z" fill="url(#paint0_linear_91_2)"/>
<path d="M120.713 80.9336C126.174 78.0879 132.667 78.0879 138.128 80.9336L202.987 114.735C216.623 121.842 216.623 141.471 202.987 148.577L138.128 182.379C132.667 185.225 126.174 185.225 120.713 182.379L55.8543 148.577C42.2179 141.471 42.2179 121.842 55.8543 114.735L120.713 80.9336Z" fill="#E4E1FF" fill-opacity="0.8"/>
<path d="M120.713 107.611C126.174 104.765 132.667 104.765 138.128 107.611L202.987 141.412C216.623 148.519 216.623 168.148 202.987 175.255L138.128 209.056C132.667 211.902 126.174 211.902 120.713 209.056L55.8543 175.255C42.2179 168.148 42.2179 148.519 55.8543 141.412L120.713 107.611Z" fill="#DBD8FF" fill-opacity="0.6"/>
<path d="M120.713 50.4453C126.174 47.5996 132.667 47.5996 138.128 50.4453L202.987 84.2472C216.623 91.3539 216.623 110.982 202.987 118.089L138.128 151.89C132.667 154.736 126.174 154.736 120.713 151.89L55.8543 118.089C42.2179 110.982 42.2179 91.3539 55.8543 84.2472L120.713 50.4453Z" fill="#ECEAFF"/>
</g>
<defs>
<linearGradient id="paint0_linear_91_2" x1="129.5" y1="0" x2="1.36528e-05" y2="279.13" gradientUnits="userSpaceOnUse">
<stop stop-color="#CAC5FF"/>
<stop offset="1" stop-color="#4531D8"/>
</linearGradient>
<clipPath id="clip0_91_2">
<rect width="259" height="261" fill="white"/>
</clipPath>
</defs>
        </svg>
        
        <div className="flex flex-col gap-4 blur-fade-move-animation bg-background z-50 relative ">
          <div className="flex flex-col gap-2 bg-background z-50 relative">
            <div className="text-2xl font-medium text-center animate-fade-up delay-150">
              Create New Project
            </div>
            <div className="text-sm font-regular text-center animate-fade-up text-on-surface">
              Create your brand new project on Project.A
            </div>
          </div>

          <div className="w-[350px] m-auto text-center flex flex-col gap-3 animate-fade-up delay-300">
          <div className="flex flex-col gap-2 text-left w-full">
            <Input
              name="projectName"
              variant="default"
              placeholder="Project Name"
              classes="p-3"
              value={formik.values.projectName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.projectName && formik.errors.projectName ? (
              <div className="text-error text-sm">{formik.errors.projectName}</div>
            ) : null}
            </div>

            <div className="flex flex-col gap-2 text-left w-full">
              <Input
                name="projectUrl"
                variant="default"
                placeholder="Project URL"
                classes="p-3"
                value={formik.values.projectUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.projectUrl && formik.errors.projectUrl ? (
                <div className="text-error text-sm">{formik.errors.projectUrl}</div>
              ) : null}
            </div>

            
            <Button
              type="submit"
              intent="primary"
              size="l"
              classes="button-shine"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Creating...' : 'Create Project'}
            </Button>

            <Button
              type="button"
              intent="unstyled"
              size="l"
            >
              Back
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
