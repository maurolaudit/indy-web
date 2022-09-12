import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import { MultiValue } from 'react-select'
import { SocialMediaChannelOptions } from '../../constants/options/SocialMediaChannelOptions'
import { SocialMediaStatusOptions } from '../../constants/options/SocialMediaStatusOptions'
import { CreateSocialMediaFormSchema } from '../../schemas/CreateSocialMediaFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { CreateSocialMediaForm } from '../../types/forms/CreateSocialMediaForm.type'
import { SelectOption } from '../../types/SelectOption.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { CreateSelectNoFormik } from '../CreateSelectNoFormik'
import { DateInput } from '../DateInput'
import { FileDropZone } from '../FileDropZone'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { EditIcon } from '../icons/EditIcon'
import { FloppyDiskIcon } from '../icons/FloppyDiskIcon'
import { LinkButton } from '../LinkButton'
import { Modal } from '../Modal'
import { Select } from '../Select'
import { TextInput } from '../TextInput'
import { TimeInput } from '../TimeInput'

export const CreateSocialMediaModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { replace } = useRouter()
  const { data: session } = useSession()

  const submitForm = async (values: CreateSocialMediaForm) => {
    if (values.postDate && values.postTime) {
      const postDate = new Date(values.postDate)
      const postTime = new Date(values.postTime)
      const postDateTime = Date.UTC(
        postDate.getUTCFullYear(),
        postDate.getUTCMonth(),
        postDate.getUTCDate(),
        postTime.getUTCHours(),
        postTime.getUTCMinutes(),
        postTime.getUTCSeconds()
      )

      values.postDate = values.postTime = new Date(postDateTime)
    }

    try {
      const { status } = await axios.post<CreateSocialMediaForm>(
        `/v1/clients/${session?.user.userType.client.id}/social-media`,
        objectWithFileToFormData(values)
      )
      if (status === 200) {
        queryClient.invalidateQueries('socialMedia')
        replace('/social-media')
        onClose()
        showToast({
          type: 'success',
          message: `New Social Media successfully created!`,
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
        <Modal title="New Social Media" onClose={onClose}>
          <div className="mx-auto w-full max-w-8xl">
            <Formik
              validationSchema={CreateSocialMediaFormSchema}
              initialValues={{
                post: '',
                postDate: null,
                postTime: null,
                attachments: [],
                copy: '',
                status: '',
                channels: [],
                notes: '',
              }}
              onSubmit={submitForm}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="flex w-140 flex-col">
                  <TextInput
                    type="text"
                    Icon={EditIcon}
                    placeholder="Enter Post Topic"
                    name="post"
                    className="mb-5"
                  />
                  <div className="mb-5 flex space-x-5">
                    <DateInput name="postDate" placeholder="Select Post Date" />
                    <TimeInput name="postTime" placeholder="Select Time" />
                  </div>
                  <TextInput
                    type="text"
                    Icon={EditIcon}
                    placeholder="Enter Copy"
                    name="copy"
                    className="mb-5"
                  />
                  <Select
                    label="Status"
                    name="status"
                    Icon={ClipboardIcon}
                    options={SocialMediaStatusOptions}
                    className="mb-5"
                  />
                  <CreateSelectNoFormik
                    options={SocialMediaChannelOptions}
                    className="mb-5"
                    placeholder="Select Channel"
                    name="channels"
                    isMulti
                    onChange={(channel: MultiValue<SelectOption<string>>) => {
                      setFieldValue(
                        'channels',
                        channel.map((option) => option.value)
                      )
                    }}
                  />
                  <TextInput
                    type="text"
                    Icon={EditIcon}
                    placeholder="Enter Notes"
                    name="notes"
                    className="mb-5"
                  />
                  <FileDropZone
                    label="Upload Attachment"
                    name="attachments"
                    maxSize={250}
                    mimeType="image/gif"
                    accept={['.gif', '.jpeg', '.mp4', '.png', '.jpg']}
                    multiple
                    className="mb-8"
                  />
                  <div className="flex space-x-5">
                    <LinkButton title="Cancel" href="/social-media" light />
                    <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                      <FloppyDiskIcon className="stroke-white" />
                      <div>Save</div>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      )}
    </>
  )
}
