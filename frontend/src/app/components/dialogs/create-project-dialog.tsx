'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DialogHeaderContent from './content/dialog-header-content';
import Button from '@/app/packages/ui/button';
import { Input, TextArea } from '@/app/packages/ui/input';
import { Chip } from '@/app/packages/ui/chip';
import { IconChevronRight } from '@tabler/icons-react';
import { postDataMethod } from '@/app/services/api';
import { ObjectId } from 'bson'
import { generateObjectId } from '@/app/helpers';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


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
        const response = await postDataMethod('http://localhost:8080/api/projects/', {
          projectId: projectId, // Generating a unique project ID
          projectName: values.projectName,
          projectDescription: values.projectDescription,
          projectCreator: session?.user.id,
          projectIcon: 'https://example.com/icon.png', // Static for now, can be dynamic
        });
        console.log('Project created successfully:', response);
        // router.push("/client/[id]/", {id: response.projectId});
        window.location.href = "/client/"+response.projectId+"/";
        // resetForm();
      } catch (error) {
        console.error('Error creating project:', session?.user.id);
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
