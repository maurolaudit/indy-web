import Head from 'next/head'
import { ReactElement, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import UserIcon from '../../components/common/icons/UserIcon'
import Card from '../../components/panel/Card'
import FancyButton from '../../components/panel/FancyButton'
import NewDepartmentModal from '../../components/panel/modals/NewDepartmentModal'
import { AdminRoutes } from '../../constants/routes/AdminRoutes'
import { DepartmentTableColumns } from '../../constants/tables/DepartmentTableColumns'
import PanelLayout from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const Departments: NextPageWithLayout = () => {
  const [isNewDepartmentModalVisible, setNewDepartmentModalVisible] = useState(false)

  const toggleNewDepartmentModal = () => setNewDepartmentModalVisible(!isNewDepartmentModalVisible)

  return (
    <>
      <Head>
        <title>Daily Press - Client</title>
      </Head>
      <div className="mx-auto grid h-262.5 w-270 grid-rows-10 gap-6">
        <FancyButton
          Icon={
            <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-honeydew">
              <UserIcon className="stroke-jungle-green" />
            </div>
          }
          title="Create Department"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewDepartmentModal}
          className="row-span-1 w-fit"
        />
        <Card title="Departments" className="row-span-11">
          <DataTable
            dataEndpoint="/v1/departments"
            columns={DepartmentTableColumns}
            initialPageSize={20}
            tableQueryKey="departments"
            ofString="Departments"
          />
        </Card>
        <NewDepartmentModal
          isVisible={isNewDepartmentModalVisible}
          onClose={toggleNewDepartmentModal}
        />
      </div>
    </>
  )
}

Departments.getLayout = (page: ReactElement) => (
  <PanelLayout routes={AdminRoutes}>{page}</PanelLayout>
)

export default Departments