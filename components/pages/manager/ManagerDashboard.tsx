import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ClientTicketsTableColumns } from '../../../constants/tables/ClientTicketsTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { useTicketStore } from '../../../store/TicketStore'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'
import { FancyButton } from '../../FancyButton'
import { LifeBuoyIcon } from '../../icons/LifeBuoyIcon'
import { CreateSupportTicketModal } from '../../modals/CreateSupportTicketModal'
import { DeleteTicketModal } from '../../modals/DeleteTicketModal'
import { EditTicketModal } from '../../modals/EditTicketModal'

export const ManagerDashboard = () => {
  const { data: session } = useSession()
  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()
  const { setHeader, setSubHeader } = usePanelLayoutStore()

  const [isCreateSupportRequestModalVisible, setCreateSupportRequestModalVisible] = useState(false)

  const toggleCreateSupportRequestModal = () =>
    setCreateSupportRequestModalVisible(!isCreateSupportRequestModalVisible)

  useEffect(() => {
    setHeader('Dashboard')
    setSubHeader(`Welcome back, ${session?.user.firstName}`)

    return () => {
      setSubHeader('')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Dashboard</title>
      </Head>
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
        <FancyButton
          Icon={<LifeBuoyIcon className="fill-halloween-orange" />}
          title="Support Request"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleCreateSupportRequestModal}
          className="w-fit"
        />
        <hr className="border-t-bright-gray" />
        <Card title="Project Status Table">
          {!!session && session.user.userType.departments.length > 0 ? (
            <DataTable
              columns={ClientTicketsTableColumns}
              dataEndpoint={`/v1/departments/${session?.user.userType.departments[0].id}/tickets`}
              tableQueryKey={['tickets']}
              ofString="Projects"
            />
          ) : (
            <div className="m-auto w-fit font-urbanist text-base text-metallic-silver">
              No projects to display. 😶
            </div>
          )}
        </Card>
      </div>
      <CreateSupportTicketModal
        isVisible={isCreateSupportRequestModalVisible}
        onClose={toggleCreateSupportRequestModal}
      />
      <EditTicketModal
        isVisible={isEditTicketModalVisible}
        onClose={toggleEditTicketModal}
        ticket={activeTicket}
      />
      <DeleteTicketModal
        isVisible={isDeleteTicketModalVisible}
        onClose={toggleDeleteTicketModal}
        ticket={activeTicket}
      />
    </>
  )
}
