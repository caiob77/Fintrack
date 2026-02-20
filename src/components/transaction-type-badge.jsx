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
  'flex w-fit items-center gap-1.5 rounded-full bg-muted px-2 py-[2px] text-xs font-bold',
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
      <CircleIcon size={10} className="fill-inherit" />
      {LABELS[normalized] ?? ''}
    </div>
  )
}

export default TransactionTypeBadge