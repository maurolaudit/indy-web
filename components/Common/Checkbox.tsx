import { Field } from 'formik'
import { useState } from 'react'
import CheckIcon from './icons/CheckIcon'

const Checkbox = ({
  name,
  label,
  className,
}: {
  name: string
  label: string
  className?: string
}) => {
  const [isChecked, setChecked] = useState(false)

  const toggleCheckbox = () => setChecked(!isChecked)

  return (
    <label htmlFor={name} className={`flex cursor-pointer items-center space-x-3 ${className}`}>
      <Field type="checkbox" name={name} id={name} hidden onClick={toggleCheckbox} />
      <div
        className={`flex min-h-4 min-w-4 items-center justify-center rounded border border-solid border-bright-gray ${
          isChecked && 'border-0 bg-jungle-green'
        }`}
      >
        {isChecked && <CheckIcon className="stroke-white" />}
      </div>
      <div className="font-urbanist text-sm font-medium text-onyx">{label}</div>
    </label>
  )
}

export default Checkbox