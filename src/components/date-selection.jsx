import { useQueryClient } from '@tanstack/react-query'
import { addMonths, isValid, startOfDay, subMonths } from 'date-fns'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { useAuthContext } from '@/contexts/auth'

import { DatePickerWithRange } from './ui/date-picker-with-range'

const formatDateToQueryParam = (date) => format(date, 'yyyy-MM-dd')

const getInitialDateState = (searchParams) => {
  const today = startOfDay(new Date())
  const minFrom = startOfDay(subMonths(today, 2))
  const maxTo = startOfDay(addMonths(today, 1))
  const defaultDate = { from: today, to: maxTo }

  const from = searchParams.get('from')
  const to = searchParams.get('to')
  if (!from || !to) return defaultDate

  const parsedFrom = new Date(from + 'T00:00:00')
  const parsedTo = new Date(to + 'T00:00:00')

  if (!isValid(parsedFrom) || !isValid(parsedTo)) return defaultDate
  if (parsedFrom > parsedTo) return defaultDate
  if (parsedFrom < minFrom || parsedTo > maxTo) return defaultDate

  return { from: parsedFrom, to: parsedTo }
}

const DateSelection = () => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [date, setDate] = useState(getInitialDateState(searchParams))
  // 1. sempre que o state "date" mudar, eu preciso persisti-lo na URL (?from&to=)
  useEffect(() => {
    // early return
    if (!date?.from || !date?.to) return
    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDateToQueryParam(date.from))
    queryParams.set('to', formatDateToQueryParam(date.to))
    navigate(`/home?${queryParams.toString()}`, { replace: true })
    queryClient.invalidateQueries({
      queryKey: [
        'balance',
        user.id,
        formatDateToQueryParam(date.from),
        formatDateToQueryParam(date.to),
      ],
    })
  }, [navigate, date, queryClient, user.id])

  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelection