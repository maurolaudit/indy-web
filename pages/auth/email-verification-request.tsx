import axios from 'axios'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import Button from '../../components/common/Button'
import CaretIcon from '../../components/common/icons/CaretIcon'
import EmailIcon from '../../components/common/icons/EmailIcon'
import TextInput from '../../components/common/TextInput'
import AuthLayout from '../../layouts/Auth.layout'
import { ForgotPasswordFormSchema } from '../../schemas/ForgotPasswordFormSchema'
import { ForgotPasswordForm } from '../../types/forms/ForgotPasswordForm.type'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const EmailVerificationRequest: NextPageWithLayout = () => {
  const { replace } = useRouter()

  const formInitialValues: ForgotPasswordForm = {
    email: '',
  }

  const submitForm = async (
    values: ForgotPasswordForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/send-email-verification', values)

    if (status === 200) {
      replace('/auth/login')
    } else {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Daily Press - Send Email Verification</title>
      </Head>
      <Formik
        validationSchema={ForgotPasswordFormSchema}
        initialValues={formInitialValues}
        onSubmit={submitForm}
      >
        {({ isSubmitting }) => (
          <Form className="flex w-103 flex-col items-center">
            <TextInput
              type="email"
              name="email"
              Icon={EmailIcon}
              placeholder="Enter email"
              className="mb-8"
              disableAutoComplete
            />
            <Button
              type="submit"
              ariaLabel="Send Link"
              disabled={isSubmitting}
              className="mb-5 max-w-75"
            >
              <div>Send Email Verification Link</div>
              <CaretIcon className="rotate-90 stroke-white" />
            </Button>
            <Link href="/auth/login">
              <a className="font-urbanist text-sm font-medium text-metallic-silver underline-offset-1 hover:underline">
                Cancel
              </a>
            </Link>
          </Form>
        )}
      </Formik>
    </>
  )
}

EmailVerificationRequest.getLayout = (page: ReactElement) => (
  <AuthLayout
    title="Send Email Verification Link"
    subtitle={
      <>
        Enter your email and we will send you
        <br />
        one-time link to verify your email
      </>
    }
  >
    {page}
  </AuthLayout>
)

export default EmailVerificationRequest