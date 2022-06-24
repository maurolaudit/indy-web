import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQuery, useQueryClient } from 'react-query'
import { NewAnimationFormSchema } from '../../schemas/NewAnimationFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { AnimationCategory } from '../../types/AnimationCategory.type'
import { NewAnimationForm } from '../../types/forms/NewAnimationForm.type'
import { Page } from '../../types/Page.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { FileDropZone } from '../FileDropZone'
import { PencilIcon } from '../icons/PencilIcon'
import { Modal } from '../Modal'
import { Select } from '../Select'
import { TextInput } from '../TextInput'

export const NewAnimationModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { showToast } = useToastStore()
  const queryClient = useQueryClient()

  const { data: categories } = useQuery(
    'categories',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<AnimationCategory>
        page: Page
      }>('/v1/library-categories', {
        params: {
          size: 100,
        },
      })

      return data
    },
    {
      enabled: isVisible,
    }
  )

  const categoryOptions = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const submitForm = async (values: NewAnimationForm) => {
    try {
      const { status } = await axios.post('/v1/libraries', objectWithFileToFormData(values))

      if (status === 200) {
        queryClient.invalidateQueries('animations')
        onClose()
        showToast({
          type: 'success',
          message: 'New Animation successfully created!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Animation" onClose={onClose}>
          <Formik
            validationSchema={NewAnimationFormSchema}
            initialValues={{
              title: '',
              description: '',
              libraryCategoryId: -1,
              file: null,
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  type="text"
                  Icon={PencilIcon}
                  placeholder="Animation Title"
                  name="title"
                  className="mb-5"
                />
                <Select
                  name="libraryCategoryId"
                  Icon={PencilIcon}
                  placeholder="Select Category Animation"
                  options={categoryOptions || []}
                  className="mb-5"
                />
                <TextInput
                  type="text"
                  Icon={PencilIcon}
                  placeholder="Description"
                  name="description"
                  className="mb-5"
                />
                <FileDropZone
                  label="Upload Assets"
                  name="file"
                  className="mb-8"
                  maxSize={250}
                  mimeType="video/mp4"
                  accept={['.mp4']}
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
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
