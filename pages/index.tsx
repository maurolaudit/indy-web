import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const Home: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const { status } = useSession()

  if (status === 'unauthenticated') {
    replace('/auth/login')
  }

  if (status === 'authenticated') {
    replace('/dashboard')
  }

  return null
}

export default Home
