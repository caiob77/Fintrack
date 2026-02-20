import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/api/hooks/transaction'
import { formatCurrency } from '@/helpers/currency'
import { getDefaultDateRangeString, getTransactionDate } from '@/helpers/date'

import DeleteTransactionButton from './delete-transaction-button'
import EditTransactionButton from './edit-transaction-button'
import TransactionTypeBadge from './transaction-type-badge'
import { DataTable } from './ui/data-table'
import SortableColumnHeader from './ui/sortable-column-header'

const TransactionDateCell = ({ transaction }) => {
  const [shortFormat, setShortFormat] = useState(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches
  )
  useEffect(() => {
    const m = window.matchMedia('(max-width: 639px)')
    const update = () => setShortFormat(m.matches)
    m.addEventListener('change', update)
    return () => m.removeEventListener('change', update)
  }, [])
  const date = getTransactionDate(transaction)
  return shortFormat
    ? format(date, 'dd/MM/yy')
    : format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
}

const TransactionCard = ({ transaction }) => {
  const date = getTransactionDate(transaction)
  return (
    <div className="flex items-center justify-between gap-3 border-b px-3 py-2.5 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium" title={transaction.name}>
          {transaction.name}
        </p>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
          <TransactionTypeBadge variant={transaction.type} />
          <span>{format(date, 'dd/MM/yy')}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-sm font-medium tabular-nums">
          {formatCurrency(transaction.amount)}
        </span>
        <div className="flex items-center gap-0.5">
          <EditTransactionButton transaction={transaction} />
          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      </div>
    </div>
  )
}

const columns = [
  {
    accessorKey: 'name',
    meta: {
      headerClassName: 'w-[28%] sm:w-[30%]',
      cellClassName: 'min-w-0 overflow-hidden',
    },
    header: ({ column }) => {
      return <SortableColumnHeader column={column}>Título</SortableColumnHeader>
    },
    cell: ({ row: { original: transaction } }) => {
      return (
        <span className="block truncate" title={transaction.name}>
          {transaction.name}
        </span>
      )
    },
  },
  {
    accessorKey: 'type',
    meta: {
      headerClassName: 'w-[14%] sm:w-[12%]',
      cellClassName: 'whitespace-nowrap',
    },
    header: ({ column }) => {
      return <SortableColumnHeader column={column}>Tipo</SortableColumnHeader>
    },
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type} />
    },
  },
  {
    accessorKey: 'date',
    meta: {
      headerClassName: 'w-[20%] sm:w-[22%]',
      cellClassName: 'whitespace-nowrap',
    },
    header: ({ column }) => {
      return <SortableColumnHeader column={column}>Data</SortableColumnHeader>
    },
    cell: ({ row: { original: transaction } }) => {
      return <TransactionDateCell transaction={transaction} />
    },
  },
  {
    accessorKey: 'amount',
    meta: {
      headerClassName: 'w-[18%]',
      cellClassName: 'whitespace-nowrap',
    },
    header: ({ column }) => {
      return <SortableColumnHeader column={column}>Valor</SortableColumnHeader>
    },
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount)
    },
  },
  {
    accessorKey: 'actions',
    meta: {
      headerClassName: 'w-[20%] min-w-[72px] sm:w-[18%]',
      cellClassName: 'whitespace-nowrap',
    },
    header: 'Ações',
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="flex items-center gap-1 sm:gap-2">
          <EditTransactionButton transaction={transaction} />
          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      )
    },
  },
]

const TransactionsTable = () => {
  const defaultRange = useMemo(() => getDefaultDateRangeString(), [])
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from') ?? defaultRange.from
  const to = searchParams.get('to') ?? defaultRange.to
  const { data: transactions } = useGetTransactions({ from, to })
  if (!transactions) return null
  return (
    <div className="space-y-3 sm:space-y-4">
      <h2 className="text-xl font-bold sm:text-2xl">Transações</h2>

      {/* Mobile: cards */}
      <div className="overflow-auto rounded-md border sm:hidden">
        <div className="max-h-[320px] overflow-y-auto">
          {transactions.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              Nenhuma transação encontrada.
            </div>
          ) : (
            transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))
          )}
        </div>
      </div>

      {/* Desktop: tabela */}
      <div className="hidden h-[280px] overflow-auto rounded-md border sm:block sm:h-[360px] md:h-[450px]">
        <DataTable
          columns={columns}
          data={transactions}
          tableClassName="table-fixed w-full"
        />
      </div>
    </div>
  )
}

export default TransactionsTable