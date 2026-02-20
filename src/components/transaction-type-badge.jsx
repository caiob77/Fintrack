import { cva } from 'class-variance-authority'
import { CircleIcon } from 'lucide-react'

const TYPE_MAP = {
  earning: 'earning',
  earnings: 'earning',
  expense: 'expense',
  expenses: 'expense',
  investment: 'investment',
  investments: 'investment',
}

const LABELS = {
  earning: 'Ganho',
  expense: 'Gasto',
  investment: 'Investimento',
}

const normalizeVariant = (raw) => {
  const lower = String(raw ?? '').toLowerCase()
  return TYPE_MAP[lower] ?? lower
}

const variants = cva(
  'flex w-fit items-center gap-0.5 rounded-full bg-muted px-1 py-px text-[9px] font-bold leading-tight sm:gap-1 sm:px-1.5 sm:py-px sm:text-[10px] md:text-xs',
  {
    variants: {
      variant: {
        earning: 'text-primary-green fill-primary-green',
        expense: 'text-primary-red fill-primary-red',
        investment: 'text-primary-blue fill-primary-blue',
      },
    },
  }
)

const TransactionTypeBadge = ({ variant }) => {
  const normalized = normalizeVariant(variant)
  return (
    <div className={variants({ variant: normalized })}>
      <CircleIcon className="h-1.5 w-1.5 fill-inherit sm:h-2 sm:w-2" />
      {LABELS[normalized] ?? ''}
    </div>
  )
}

export default TransactionTypeBadge