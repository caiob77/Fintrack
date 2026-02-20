import { addMonths, format } from 'date-fns'

export const getTransactionDate = (transaction) => {
  return new Date(transaction.date.split('T')[0] + 'T00:00:00')
}

export const getDefaultDateRangeString = () => {
  const now = new Date()
  return {
    from: format(now, 'yyyy-MM-dd'),
    to: format(addMonths(now, 1), 'yyyy-MM-dd'),
  }
}