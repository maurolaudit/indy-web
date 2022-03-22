import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import PasswordStrengthMeter from '../../components/Auth/PasswordStrengthMeter.component'
import Button from '../../components/Common/Button.component'
import FloppyDiskIcon from '../../components/Common/Icons/FloppyDisk.icon'
import LockIcon from '../../components/Common/Icons/Lock.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import { CreateNewPasswordForm } from '../../interfaces/CreateNewPasswordForm.interface'
import AuthLayout from '../../layouts/Auth.layout'
import useStore from '../../store/store'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const CreateNewPassword: NextPageWithLayout = () => {
  const passwordStrength = useStore(({ passwordStrength }) => passwordStrength)
  const computePasswordStrength = useStore(({ computePasswordStrength }) => computePasswordStrength)

  useEffect(() => computePasswordStrength(''), [])

  const formInitialValues: CreateNewPasswordForm = {
    password: '',
    passwordConfirm: '',
  }

  const validateForm = ({ password }: { password: string }) => computePasswordStrength(password)

  return (
    <>
      <Head>
        <title>Daily Press - Create New Password</title>
      </Head>
      <Formik initialValues={formInitialValues} onSubmit={() => {}} validate={validateForm}>
        {({ isSubmitting }) => (
          <Form className="flex w-full flex-col items-center">
            <div className="mb-2 w-full">
              <TextInput
                type="password"
                name="password"
                Icon={LockIcon}
                label="Password"
                placeholder="Enter Password"
                disableAutoComplete
              />
            </div>
            <div className="mr-auto mb-2">
              <PasswordStrengthMeter strength={passwordStrength} />
            </div>
            <div className="mb-4.5 w-full">
              <div className="word font-inter text-xxs font-normal text-nevada">
                Should be at least 8 symbols and contain one small and one big character,
                <br />
                special character and number
              </div>
            </div>
            <div className="mb-8 w-full">
              <TextInput
                type="password"
                name="passwordConfirm"
                Icon={LockIcon}
                label="Confirm Password"
                placeholder="Enter Password"
                disableAutoComplete
              />
            </div>
            <div className="mb-5 flex w-78">
              <Button type="submit" ariaLabel="Save New Password" disabled={isSubmitting}>
                <FloppyDiskIcon className="stroke-white" />
                <span>Save New Password</span>
              </Button>
            </div>
            <Link href="/auth/login">Cancel</Link>
          </Form>
        )}
      </Formik>
    </>
  )
}

CreateNewPassword.getLayout = (page: ReactElement) => (
  <AuthLayout title="Password reset" subtitle="Setup your new password" className="w-142.5">
    {page}
  </AuthLayout>
)

export default CreateNewPassword
