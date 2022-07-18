import axios from 'axios'
import { signOut as nextAuthSignOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, ReactNode, useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { FancyButton } from '../components/FancyButton'
import { FancyLink } from '../components/FancyLink'
import { CalendarAddIcon } from '../components/icons/CalendarAddIcon'
import { IndyIcon } from '../components/icons/IndyIcon'
import { LifeBuoyIcon } from '../components/icons/LifeBuoyIcon'
import { LogoutIcon } from '../components/icons/LogoutIcon'
import { MagnifyingGlassIcon } from '../components/icons/MagnifyingGlassIcon'
import {
  CreateSupportRequestModal,
  useCreateSupportRequestModalStore,
} from '../components/modals/CreateSupportRequestModal'
import {
  CreateSupportTicketModal,
  useCreateSupportTicketModalStore,
} from '../components/modals/CreateSupportTicketModal'
import { RouteButton } from '../components/RouteButton'
import { TicketsAndNotifacationsCountCard } from '../components/TicketsAndNotifacationsCountCard'
import { AdminRoutes } from '../constants/routes/AdminRoutes'
import { ClientRoutes } from '../constants/routes/ClientRoutes'
import { ManagerRoutes } from '../constants/routes/ManagerRoutes'
import { StaffRoutes } from '../constants/routes/StaffRoutes'
import DailyPressLogoWhite from '../public/images/daily-press-logo-white.png'
import DummyAvatar from '../public/images/dummy-avatar.png'
import { TicketsAndNotifacationsCount } from '../types/TicketsAndNotifacationsCount.type'

export const usePanelLayoutStore = createStore(
  combine(
    {
      header: '',
      subHeader: '',
      buttons: (<></>) as ReactNode,
    },
    (set) => ({
      setHeader: (header: string) => set(() => ({ header })),
      setSubHeader: (subHeader: string) => set(() => ({ subHeader })),
      setButtons: (buttons: ReactNode) => set(() => ({ buttons })),
    })
  )
)

const PanelLayout = ({ children }: { children: ReactNode }) => {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      replace('/auth/login')
    },
  })
  const { replace, asPath } = useRouter()
  const { header, subHeader, buttons, setButtons } = usePanelLayoutStore()
  const { toggleModal: toggleSupportRequestModal } = useCreateSupportRequestModalStore()
  const { toggleModal: toggleSupportTicketModal } = useCreateSupportTicketModalStore()

  const { data: ticketsAndNotifacationsCount, isLoading: ticketsAndNotifacationsCountIsLoading } =
    useQuery(
      'tickes-and-notifications-count',
      async () => {
        const { data } = await axios.get<TicketsAndNotifacationsCount>(
          `/v1/${
            session?.isClient ? `clients/${session.user.userType.clientId}` : 'backend-users'
          }/ticket-notification-counts`
        )

        return data
      },
      {
        enabled: !!session && !session.isAdmin,
      }
    )

  const { panelName, routes } = useMemo(() => {
    if (session) {
      const { isAdmin, isClient, isManager, isStaff } = session

      if (isAdmin) {
        return { panelName: 'Admin Panel', routes: AdminRoutes }
      } else if (isClient) {
        return { panelName: 'Client Panel', routes: ClientRoutes }
      } else if (isManager) {
        return { panelName: 'Manager Panel', routes: ManagerRoutes }
      } else if (isStaff) {
        return { panelName: 'Staff Panel', routes: StaffRoutes }
      }
    }

    return { panelName: null, routes: [] }
  }, [session])

  useEffect(() => {
    if (session) {
      const { isClient, isManager } = session

      if (isClient) {
        setButtons(
          <>
            <FancyLink
              href="/project-brief"
              Icon={<CalendarAddIcon className="stroke-halloween-orange" />}
              title="New Project Brief"
              subtitle="Laborerivit rem cones mil"
              className="w-fit"
            />
            <FancyButton
              Icon={<LifeBuoyIcon className="fill-halloween-orange" />}
              title="Support Request"
              subtitle="Laborerivit rem cones mil"
              onClick={toggleSupportRequestModal}
              className="w-fit"
            />
            <FancyLink
              href="/marketing-planner"
              Icon={<CalendarAddIcon className="stroke-halloween-orange" />}
              title="New Marketing Planner"
              subtitle="Laborerivit rem cones mil"
              className="w-fit"
            />
          </>
        )
      } else if (isManager) {
        setButtons(
          <FancyButton
            Icon={<LifeBuoyIcon className="fill-halloween-orange" />}
            title="New Ticket"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleSupportTicketModal}
            className="w-fit"
          />
        )
      }
    }
  }, [session])

  if (status === 'loading' || !panelName) {
    return null
  }

  const signOut = () => nextAuthSignOut()

  return (
    <>
      <div className="fixed z-20 flex w-full items-center bg-white py-1 px-6 shadow-md">
        <div className="mr-102 whitespace-nowrap font-urbanist font-semibold text-onyx">
          Broncos Club
        </div>
        <MagnifyingGlassIcon className="mr-6 stroke-waterloo" />
        <Link href="#">
          <a className="mr-6 whitespace-nowrap font-urbanist font-semibold text-onyx underline-offset-1 hover:underline">
            Edit Profile
          </a>
        </Link>
        <Link href="#">
          <a className="whitespace-nowrap font-urbanist font-semibold text-onyx underline-offset-1 hover:underline">
            Settings
          </a>
        </Link>
        <IndyIcon className="m-0 ml-auto -mr-20 scale-50 p-0" />
        <Image src={DummyAvatar} alt="Dummy" height={32} width={32} className="rounded-full" />
        <div className="ml-3 mr-5 flex flex-col">
          <div className="font-urbanist text-sm font-medium text-onyx">
            {session?.user.firstName} {session?.user.lastName}
          </div>
        </div>
        <button onClick={signOut}>
          <LogoutIcon className="rotate-180 stroke-waterloo" />
        </button>
      </div>
      <div className="group fixed z-10 flex h-screen w-75 flex-none flex-col justify-between overflow-y-auto bg-charleston-green pt-20.5 transition-all 2xl:w-20 2xl:pt-16.5 2xl:hover:w-75">
        <div>
          {!session.isAdmin && (
            <div className="mb-5 grid grid-cols-3 grid-rows-1 gap-2 px-6 transition-all 2xl:grid-cols-1 2xl:grid-rows-3 2xl:px-2 2xl:pt-6 2xl:group-hover:grid-cols-3 2xl:group-hover:grid-rows-1 2xl:group-hover:px-6 2xl:group-hover:pt-4">
              <TicketsAndNotifacationsCountCard
                isLoading={ticketsAndNotifacationsCountIsLoading}
                value={ticketsAndNotifacationsCount?.openTicketCount}
                description="Pending Jobs"
              />
              <TicketsAndNotifacationsCountCard
                isLoading={ticketsAndNotifacationsCountIsLoading}
                value={ticketsAndNotifacationsCount?.newTicketCount}
                description="New Jobs"
              />
              <TicketsAndNotifacationsCountCard
                isLoading={ticketsAndNotifacationsCountIsLoading}
                value={ticketsAndNotifacationsCount?.newNotificationCount}
                description="New Notifications"
                className="2xl:hidden 2xl:group-hover:flex"
              />
              <TicketsAndNotifacationsCountCard
                isLoading={ticketsAndNotifacationsCountIsLoading}
                value={ticketsAndNotifacationsCount?.newNotificationCount}
                description="New Notifs"
                className="hidden 2xl:flex 2xl:group-hover:hidden"
              />
            </div>
          )}
          {routes.map(({ title, Icon, pathname, subRoutes = [], target }, i) => (
            <Fragment key={`route-group-${i}`}>
              <RouteButton
                route={{ title, Icon, pathname, target }}
                hasSubRoutes={subRoutes.length > 0}
                isCurrentPath={pathname === asPath}
              />
              {subRoutes.map(({ title, Icon, pathname, target }) => (
                <RouteButton
                  key={`sub-${title}-${pathname}`}
                  route={{ title, Icon, pathname, target }}
                  isCurrentPath={pathname === asPath}
                  subRoute
                />
              ))}
            </Fragment>
          ))}
        </div>
        <div className="flex w-full items-center justify-center border-t border-t-white border-opacity-20 py-5 2xl:flex-col 2xl:space-y-2">
          <Image src={DailyPressLogoWhite} alt="DailyPress" height={25} width={25} />
          <div className="ml-3 font-urbanist text-xs text-metallic-silver 2xl:ml-0 2xl:text-center">
            Copyright Daily Press {new Date().getFullYear()}
          </div>
        </div>
      </div>
      <div className="flex h-screen bg-cultured pt-14.5 pl-75 transition-all 2xl:pl-20">
        <div className="w-full overflow-y-auto p-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="font-urbanist text-3xl font-bold text-onyx">{header}</div>
              <div className="font-urbanist font-semibold text-halloween-orange">{subHeader}</div>
            </div>
            <div className="font-circular-std text-5xl text-charleston-green">
              Indy<span className="text-halloween-orange">.</span>
            </div>
          </div>
          <div className="mb-6 flex space-x-6 empty:hidden">{buttons}</div>
          <hr className="mb-6 border-t-bright-gray" />
          <div>{children}</div>
        </div>
      </div>
      {session.isClient && <CreateSupportRequestModal />}
      {session.isManager && <CreateSupportTicketModal />}
    </>
  )
}

export default PanelLayout
