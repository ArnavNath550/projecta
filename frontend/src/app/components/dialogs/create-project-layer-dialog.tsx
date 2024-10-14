import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '@/app/packages/ui/button'
import { Chip } from '@/app/packages/ui/chip'
import { Input, TextArea } from '@/app/packages/ui/input'
import { IconChevronRight } from '@tabler/icons-react'

// Define validation schema using Yup
const validationSchema = Yup.object({
  layerName: Yup.string().required('Layer name is required'),
  description: Yup.string().optional(),
})

function CreateProjectLayerDialog() {
  // Formik hook to handle form state and validation
  const formik = useFormik({
    initialValues: {
      layerName: '',
      description: '',
    },
    validationSchema, // Attach Yup validation schema
    onSubmit: (values) => {
      handleSubmitProjectLayer(values);
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 p-3">
      <div className="flex flex-row gap-2 items-center">
        <Chip label="Project.A" size="s" />
        <IconChevronRight size={12} color="#fff" />
        <span className="font-normal text-xs">New Layer</span>
      </div>
      
      <div className="flex flex-row gap-5 w-[500px]">
        <div className="flex-shrink-0">
          <div className="border-[1px] w-[35px] h-[35px] rounded border-surface-border text-m items-center flex text-center justify-center hover:bg-surface">
            💻
          </div>
        </div>
        
        <div className="flex flex-col gap-2 w-full">
          <Input
            type="text"
            name="layerName"
            placeholder="Layer Name"
            variant="unstyled"
            value={formik.values.layerName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.layerName && formik.errors.layerName && (
            <div className="text-error text-sm">{formik.errors.layerName}</div>
          )}

          <TextArea
            name="description"
            placeholder="Description (Optional)"
            variant="unstyled"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center justify-end">
        <Button type="button" intent="secondary" size="base" onClick={formik.handleReset}>
          Cancel
        </Button>
        <Button type="submit" intent="primary" size="base">
          Create Layer
        </Button>
      </div>
    </form>
  )
}

export default CreateProjectLayerDialog
