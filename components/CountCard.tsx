import { ReactNode } from 'react'

export const CountCard = ({
  Icon,
  value,
  description,
  className,
  twBackgroundColor,
  twIconBackgroundColor,
}: {
  Icon: ReactNode
  value: number
  description: string
  className?: string
  twBackgroundColor: string
  twIconBackgroundColor: string
}) => (
  <div
    className={`flex w-full items-center space-x-3 rounded-xl p-4 ${className} ${twBackgroundColor}`}
  >
    <div
      className={`grid h-11 w-11 flex-none place-items-center rounded-lg ${twIconBackgroundColor}`}
    >
      {Icon}
    </div>
    <div>
      <div className="font-urbanist text-sm font-semibold text-white">{value}</div>
      <div className="font-urbanist text-xxs font-medium text-white line-clamp-2">
        {description}
      </div>
    </div>
  </div>
)
