import axios from 'axios'
import { Form, Formik } from 'formik'
import { NewAnimationCategoryFormSchema } from '../../schemas/NewAnimationCategoryFormSchema'
import { NewAnimationCategoryForm } from '../../types/forms/NewAnimationCategoryForm.type'
import Button from '../Button'
import PencilIcon from '../icons/PencilIcon'
import Modal from '../Modal'
import TextInput from '../TextInput'

const NewAnimationCategoryModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const formInitialValues: NewAnimationCategoryForm = {
    name: '',
  }

  const submitForm = async (
    values: NewAnimationCategoryForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/library-categories', values)

    if (status === 200) {
      onClose()
    }

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Category Animation" onClose={onClose}>
          <Formik
            validationSchema={NewAnimationCategoryFormSchema}
            initialValues={formInitialValues}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  type="text"
                  Icon={PencilIcon}
                  placeholder="Category Animation  Name"
                  name="name"
                  className="mb-8"
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

export default NewAnimationCategoryModal