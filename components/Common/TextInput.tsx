import { Field } from 'formik'
import { useState } from 'react'
import { Icon } from '../../types/Icon.type'
import FormErrorMessage from './FormErrorMessage'
import EyeOpenIcon from './icons/EyeOpenIcon'

const TextInput = ({
  type = 'text',
  name,
  Icon,
  placeholder,
  disableAutoComplete = false,
  className,
}: {
  type?: 'text' | 'email' | 'password'
  name: string
  Icon: Icon
  placeholder: string
  disableAutoComplete?: boolean
  className?: string
}) => {
  const [isShowPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword(!isShowPassword)

  return (
    <div className={`w-full ${className}`}>
      <div className="relative flex items-center">
        <Icon className="pointer-events-none absolute ml-6 stroke-lavender-gray" />
        <Field
          className="min-h-12.5 w-full rounded-xl bg-transparent px-13 font-urbanist text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray selection:bg-jungle-green selection:text-white focus:ring-2 focus:ring-jungle-green focus:ring-opacity-40"
          type={isShowPassword ? 'text' : type}
          name={name}
          id={name}
          spellCheck={false}
          placeholder={placeholder}
          autoComplete={disableAutoComplete ? (type === 'text' ? 'off' : 'new-password') : 'on'}
        />
        {type === 'password' && (
          <button
            className="absolute right-0 mr-6"
            aria-label="Show Password"
            onClick={toggleShowPassword}
            tabIndex={-1}
            type="button"
          >
            <EyeOpenIcon className="stroke-lavender-gray" />
          </button>
        )}
      </div>
      <FormErrorMessage name={name} />
    </div>
  )
}

export default TextInput