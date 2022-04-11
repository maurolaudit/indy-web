import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query'
import { NewAnimationFormSchema } from '../../schemas/NewAnimationFormSchema'
import { CategoryAnimation } from '../../types/CategoryAnimation.type'
import { NewAnimationForm } from '../../types/forms/NewAnimationForm.type'
import { Page } from '../../types/Page.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import Button from '../common/Button.component'
import FileInput from '../common/FileInput.component'
import PencilIcon from '../common/Icons/Pencil.icon'
import Select from '../common/Select.component'
import TextInput from '../common/TextInput.component'
import Modal from './Modal.component'

const NewAnimationModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const { data: session } = useSession()

  const formInitialValues: NewAnimationForm = {
    title: '',
    description: '',
    libraryCategoryId: -1,
    file: null,
  }

  const { data: categories } = useQuery('categories', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<CategoryAnimation>
      page: Page
    }>('/v1/library-categories?size=100', {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    return data
  })

  const categoryOptions = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const submitForm = async (
    values: NewAnimationForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/libraries', objectWithFileToFormData(values), {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    if (status === 200) {
      onClose()
    }

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Animation" onClose={onClose}>
          <Formik
            validationSchema={NewAnimationFormSchema}
            initialValues={formInitialValues}
            onSubmit={submitForm}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  Icon={PencilIcon}
                  placeholder="Animation Title"
                  name="title"
                  disableAutoComplete
                  className="mb-5"
                />
                <Select
                  name="libraryCategoryId"
                  Icon={PencilIcon}
                  placeholder="Select Category Animation"
                  options={categoryOptions || []}
                  setFieldValue={setFieldValue}
                  className="mb-5"
                />
                <TextInput
                  Icon={PencilIcon}
                  placeholder="Description"
                  name="description"
                  disableAutoComplete
                  className="mb-5"
                />
                <FileInput
                  label="Animation File"
                  name="file"
                  setFieldValue={setFieldValue}
                  className="mb-8"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" light onClick={onClose}>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}

export default NewAnimationModal
