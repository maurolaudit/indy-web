export const Pill = ({ value, pillColor }: { value: string; pillColor?: string }) => (
  <div className="flex h-6 w-fit items-center space-x-1.5 rounded-lg border border-bright-gray px-2.5">
    {pillColor && <div className={`h-1.5 w-1.5 rounded-full ${pillColor}`} />}
    <div className="font-urbanist text-sm font-medium capitalize text-onyx">{value}</div>
  </div>
)
