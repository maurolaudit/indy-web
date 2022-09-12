import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import { MultiValue } from 'react-select'
import { SocialMediaChannelOptions } from '../../constants/options/SocialMediaChannelOptions'
import { SocialMediaStatusOptions } from '../../constants/options/SocialMediaStatusOptions'
import { CreateSocialMediaFormSchema } from '../../schemas/CreateSocialMediaFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { EditSocialMediaForm } from '../../types/forms/EditSocialMediaForm.type'
import { SelectOption } from '../../types/SelectOption.type'
import { SocialMedia } from '../../types/SocialMedia.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { Card } from '../Card'
import { CreateSelectNoFormik } from '../CreateSelectNoFormik'
import { DateInput } from '../DateInput'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { EditIcon } from '../icons/EditIcon'
import { FloppyDiskIcon } from '../icons/FloppyDiskIcon'
import { PlusIcon } from '../icons/PlusIcon'
import { LinkButton } from '../LinkButton'
import { Modal } from '../Modal'
import { PhotographyVideographyFileButton } from '../PhotographyVideographyFileButton'
import { Select } from '../Select'
import { TextInput } from '../TextInput'
import { TimeInput } from '../TimeInput'
import { SocialMediaFileModal, useSocialMediaFileModalStore } from './SocialMediaFileModal'
import {
  UploadSocialMediaFileModal,
  useUploadSocialMediaFileModalStore,
} from './UploadSocialMediaFileModal'

export const EditSocialMediaModal = ({
  isVisible,
  onClose,
  socialMedia,
}: {
  isVisible: boolean
  onClose: () => void
  socialMedia: SocialMedia
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const submitForm = async (values: EditSocialMediaForm) => {
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

      values.postDate = new Date(postDateTime)
    }

    try {
      const { status } = await axios.post(
        `/v1/social-media/${socialMedia.id}`,
        objectWithFileToFormData(values)
      )
      if (status === 200) {
        queryClient.invalidateQueries('socialMedia')
        showToast({
          type: 'success',
          message: `All changes was successfully saved!`,
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  const { toggleShowSocialMediaFileModal } = useSocialMediaFileModalStore()

  const { toggleUploadSocialMediaFileModal } = useUploadSocialMediaFileModalStore()

  const toggleUploadFile = () => toggleUploadSocialMediaFileModal(socialMedia)

  if (!socialMedia) return null

  return (
    <>
      {isVisible && (
        <Modal title="Edit Social Media" onClose={onClose}>
          <Formik
            initialValues={{
              post: socialMedia.post,
              attachments: socialMedia?.attachments,
              copy: socialMedia?.copy,
              status: socialMedia.status,
              channels: socialMedia?.channels,
              notes: socialMedia?.notes,
              postDate: socialMedia?.postDate && new Date(socialMedia?.postDate),
              postTime: socialMedia?.postDate && new Date(socialMedia?.postDate),
              _method: 'PUT',
            }}
            validationSchema={CreateSocialMediaFormSchema}
            onSubmit={submitForm}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="flex w-full flex-col">
                  <Card className="mb-5 h-fit w-9/12">
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Post Topic"
                      label="Post Topic"
                      name="post"
                      className="mb-5"
                    />
                    <div className="mb-5 flex space-x-5">
                      <DateInput name="postDate" placeholder="Select Post Date" label="Post Date" />
                      <TimeInput name="postTime" placeholder="Select Time" label="Post Time" />
                    </div>
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Copy"
                      name="copy"
                      label="Copy"
                      className="mb-5"
                    />
                    <Select
                      label="Status"
                      name="status"
                      Icon={ClipboardIcon}
                      options={SocialMediaStatusOptions}
                      defaultValue={SocialMediaStatusOptions.find(
                        ({ value }) => value === socialMedia.status
                      )}
                      className="mb-5"
                    />
                    <label className="mb-2 inline-block text-xs font-medium text-metallic-silver">
                      Channels
                    </label>
                    <CreateSelectNoFormik
                      options={SocialMediaChannelOptions}
                      className="mb-5"
                      placeholder="Select Channel"
                      name="channels"
                      defaultValue={(() => {
                        if (socialMedia.channels) {
                          const seletedChannel = socialMedia.channels?.map((channel) => ({
                            value: channel,
                            label: channel,
                          }))

                          return seletedChannel
                        }
                      })()}
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
                      label="Notes"
                      placeholder="Enter Notes"
                      name="notes"
                      className="mb-5"
                    />
                  </Card>
                  <Card title="Attachment" className="mb-5 h-fit w-9/12">
                    <button
                      onClick={toggleUploadFile}
                      className="absolute top-6 right-6 flex space-x-2"
                      type="button"
                    >
                      <PlusIcon className="stroke-halloween-orange" />
                      <div className=" text-sm font-semibold text-halloween-orange">
                        Upload File
                      </div>
                    </button>
                    <div className="flex flex-wrap gap-4">
                      {!!socialMedia.attachments ? (
                        socialMedia.attachments.map(
                          ({ socialMediaAttachmentId, url, thumbnailUrl, name, fileType }) => {
                            const toggleFile = () =>
                              toggleShowSocialMediaFileModal(
                                url,
                                fileType,
                                name,
                                socialMediaAttachmentId,
                                socialMedia.id
                              )

                            return (
                              <>
                                <PhotographyVideographyFileButton
                                  key={`socialMediaFile-${socialMediaAttachmentId}`}
                                  className="h-35 w-35"
                                  url={url}
                                  fileType={fileType}
                                  name={name}
                                  thumbnailUrl={thumbnailUrl}
                                  onClick={toggleFile}
                                />
                              </>
                            )
                          }
                        )
                      ) : (
                        <div className="m-auto text-base text-metallic-silver">No files found.</div>
                      )}
                    </div>
                  </Card>
                  <Card className="h-fit w-9/12">
                    <div className="flex space-x-5">
                      <LinkButton title="Cancel" href="/social-media" light />
                      <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                        <FloppyDiskIcon className="stroke-white" />
                        <div>Save</div>
                      </Button>
                    </div>
                  </Card>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
      <SocialMediaFileModal />
      <UploadSocialMediaFileModal />
    </>
  )
}
