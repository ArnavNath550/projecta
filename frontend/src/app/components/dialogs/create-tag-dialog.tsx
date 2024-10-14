import { Input } from '@/app/packages/ui/input'
import React from 'react'
import DialogHeaderContent from './content/dialog-header-content'
import { Chip } from '@/app/packages/ui/chip'
import { SelectInput } from '@/app/packages/ui/input/select-input'
import { generateObjectId, getColourByValue } from '@/app/helpers'
import Button from '@/app/packages/ui/button'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { createIssueTag, Tag } from '@/app/api/actions/issue-actions'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

interface TagFormValues {
  tagName: string;
  tagColour: string;
}

// Define Yup validation schema
const validationSchema = Yup.object({
  tagName: Yup.string()
    .min(2, 'Tag name must be at least 2 characters')
    .required('Tag name is required'),
  tagColour: Yup.string().required('Tag colour is required'),
});

function CreateTagDialog() {
    const {data:session} = useSession();
    const params = useParams();
  const [tagHexCode, setTagHexCode] = React.useState("");
  const [tagName, setTagName] = React.useState("");

  const handleSelectColour = (colourName: string, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
    setFieldValue('tagColour', colourName);
  }

  const handleColourChange = (colourName: string) => {
    const decodeColour = getColourByValue(colourName.toUpperCase());
    setTagHexCode(decodeColour?.hexCode || '');
  };

  return (
    <div className="flex flex-col gap-2 p-4 w-[500px]">
      <Formik
        initialValues={{
          tagName: tagName,
          tagColour: tagHexCode,
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          // Handle form submission logic
          console.log(values);
          const issueTag: Tag = {
            tag_name: values.tagName,
            tag_colour: values.tagColour,
            tag_id: generateObjectId(),
            tag_creator: session?.user.id,
            project_id: params.id,
          };
          

          createIssueTag(issueTag);

          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form>
            <div className="flex flex-row items-center justify-center bg-page-gradient rounded-md p-3">
              <Chip 
                label={values.tagName !== "" ? values.tagName : 'Your Tag'} 
                size="l" 
                icon={<div className={`w-[8px] h-[8px] rounded-full bg-[${tagHexCode}]`}></div>} 
              />
            </div>
            <div className="flex flex-col gap-2 pt-3 pb-3">
              <div>
                <Input
                  name="tagName"
                  as={Input}
                  variant="unstyled"
                  onChange={(e) => setTagName(e.target.value)}
                  placeholder="Tag Name"
                />
                {touched.tagName && errors.tagName && (
                  <div className="text-error text-xs">{errors.tagName}</div>
                )}
              </div>
              <SelectInput
                placeholder={values.tagColour === "" ? 'Select a Colour' : values.tagColour}
                selectAction={(colourName) => {
                  handleSelectColour(colourName, setFieldValue);
                  handleColourChange(colourName);
                }}
              />
              {touched.tagColour && errors.tagColour && (
                <div className="text-error text-xs">{errors.tagColour}</div>
              )}
            </div>
            <div className="flex items-end justify-end">
              <Button type="submit" intent="primary" size="base" disabled={isSubmitting}>
                Create Tag
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateTagDialog
