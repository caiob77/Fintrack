import { cn } from '@/lib/utils'

const TransactionTypeChartLabel = ({ icon, value, active, onMouseEnter }) => {
  return (
    <div
      className={cn(
        'flex cursor-pointer items-center gap-8 rounded-md px-2 py-1 transition-colors',
        active && 'bg-muted'
      )}
      onMouseEnter={onMouseEnter}
    >
      {icon}
      <p className="w-full text-right text-sm font-bold">{value}</p>
    </div>
  )
}

export default TransactionTypeChartLabel