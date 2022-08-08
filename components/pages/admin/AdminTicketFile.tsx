import axios from 'axios'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { Page } from '../../../types/Page.type'
import { TicketFile } from '../../../types/TicketFile.type'
import { TicketFileFeedback } from '../../../types/TicketFileFeedback.type'
import { Button } from '../../Button'
import { FileDisplay } from '../../FileDisplay'
import { DownloadIcon } from '../../icons/DownloadIcon'
import { PrintIcon } from '../../icons/PrintIcon'
import { Pill } from '../../Pill'
import { TicketFileFeedbackCard } from '../../tickets/TicketFileFeedbackCard'
import { TitleValue } from '../../TitleValue'

export const AdminTicketFile = ({ ticketFileId }: { ticketFileId: number }) => {
  const { setHeader } = usePanelLayoutStore()

  const { data: ticketFile } = useQuery(
    ['ticketFile', ticketFileId],
    async () => {
      const { data } = await axios.get<TicketFile>(`/v1/ticket-files/${ticketFileId}`)

      return data
    },
    {
      enabled: ticketFileId !== -1,
    }
  )

  const { data: fileFeedbacks } = useQuery(
    ['fileFeedbacks', ticketFileId],
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<TicketFileFeedback>
        page: Page
      }>(`/v1/ticket-files/${ticketFileId}/feedbacks`)

      return data
    },
    {
      enabled: ticketFileId !== -1,
    }
  )

  const downloadFile = () => {
    if (!!ticketFile && ticketFile?.signedUrl !== null) {
      fetch(ticketFile.signedUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', ticketFile.name)
          document.body.appendChild(link)
          link.click()
        })
    }
  }

  useEffect(() => {
    setHeader('Ticket File')
  }, [])

  return (
    <>
      {!!ticketFile && ticketFileId !== -1 && (
        <div className="mx-auto flex w-full max-w-8xl space-x-6">
          <div className="w-140 space-y-5">
            <div>
              <FileDisplay
                src={ticketFile.signedUrl}
                type={ticketFile.fileType}
                imageHeight={560}
                imageWidth={560}
                imageAlt={ticketFile.name}
                className="rounded-xl"
                videoClassName="w-140 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <TitleValue title="ID" className="flex items-center justify-between">
                {ticketFile.id}
              </TitleValue>
              <TitleValue title="Name" className="flex items-center justify-between">
                {ticketFile.name}
              </TitleValue>
              <TitleValue title="Status" className="flex items-center justify-between">
                <Pill
                  twBackgroundColor={(() => {
                    switch (ticketFile.status) {
                      case 'approved':
                        return 'bg-honeydew'
                      case 'back from review':
                        return 'bg-alice-blue'
                      case 'deleted':
                        return 'bg-light-tart-orange'
                      case 'in progress':
                        return 'bg-honeydew'
                      case 'for review':
                        return 'bg-light-navy'
                      case 'new':
                        return 'bg-alice-blue'
                    }
                  })()}
                  twTextColor={(() => {
                    switch (ticketFile.status) {
                      case 'approved':
                        return 'text-jungle-green'
                      case 'back from review':
                        return 'text-bleu-de-france'
                      case 'deleted':
                        return 'text-tart-orange'
                      case 'in progress':
                        return 'text-jungle-green'
                      case 'for review':
                        return 'text-bleu-de-france'
                      case 'new':
                        return 'text-bleu-de-france'
                    }
                  })()}
                  value={ticketFile.status}
                />
              </TitleValue>
              <TitleValue title="Approval Status" className="flex items-center justify-between">
                <Pill
                  twBackgroundColor={ticketFile.isApproved ? 'bg-honeydew' : 'bg-light-tart-orange'}
                  twTextColor={ticketFile.isApproved ? 'text-jungle-green' : 'text-tart-orange'}
                  value={ticketFile.isApproved ? 'Approved' : 'Not Approved'}
                />
              </TitleValue>
            </div>
            <div className="flex space-x-5">
              <Button
                ariaLabel="Download"
                className="text-bleu-de-france"
                type="button"
                onClick={downloadFile}
                light
              >
                <DownloadIcon className="stroke-bleu-de-france" />
                <div>Download</div>
              </Button>
              <Button ariaLabel="Print" className="text-orchid" type="button" light>
                <PrintIcon className="stroke-orchid" />
                <div>Print</div>
              </Button>
            </div>
          </div>
          <div className="flex-1 space-y-5">
            <div className="max-h-130 space-y-5 overflow-y-auto">
              {fileFeedbacks?.map(({ id, feedback, createdAt, feedbackBy }) => (
                <TicketFileFeedbackCard
                  key={`ticket-file-feedback-${id}`}
                  feedback={feedback}
                  createdAt={createdAt}
                  createdBy={feedbackBy}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}