import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { NewAnimationCategoryForm } from '../../interfaces/NewAnimationCategoryForm.interface'
import Button from '../Common/Button.component'
import PencilIcon from '../Common/Icons/Pencil.icon'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'

const NewAnimationCategoryModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { data: session } = useSession()

  const formInitialValues: NewAnimationCategoryForm = {
    name: '',
  }

  const submitForm = async (
    values: NewAnimationCategoryForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/library-categories', values, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    if (status === 200) {
    } else {
      setSubmitting(false)
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Category Animation" onClose={onClose}>
          <Formik initialValues={formInitialValues} onSubmit={submitForm}>
            {({ isSubmitting }) => (
              <Form className="flex w-[560px] flex-col">
                <TextInput
                  Icon={PencilIcon}
                  placeholder="Category Animation  Name"
                  name="name"
                  disableAutoComplete
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

export default NewAnimationCategoryModal
