import { useSession } from 'next-auth/react'
import { ReactElement, useEffect, useMemo } from 'react'
import { ClientSocialMediaList } from '../components/pages/client/ClientSocialMediaList'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const SocialMediaPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Social Media')
  }, [])

  const { data: session } = useSession()

  const page = useMemo(() => {
    if (!!session) {
      if (session.isClient) {
        return <ClientSocialMediaList clientId={session!.user.userType.client.id} />
      }
    }

    return null
  }, [!!session])

  return page
}

SocialMediaPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default SocialMediaPage
