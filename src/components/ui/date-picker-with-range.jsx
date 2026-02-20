'use client'

import { addMonths, format, isValid, startOfDay, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useMemo, useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// Breakpoints alinhados ao Tailwind: sm 640px, md 768px
const QUERY_SM = '(min-width: 640px)'
const QUERY_MD = '(min-width: 768px)'

const useDateFormat = () => {
  const [formatKey, setFormatKey] = useState(() => {
    if (typeof window === 'undefined') return 'short'
    return window.matchMedia(QUERY_MD).matches ? 'long' : window.matchMedia(QUERY_SM).matches ? 'medium' : 'short'
  })

  useEffect(() => {
    const mediaSm = window.matchMedia(QUERY_SM)
    const mediaMd = window.matchMedia(QUERY_MD)
    const update = () => {
      setFormatKey(mediaMd.matches ? 'long' : mediaSm.matches ? 'medium' : 'short')
    }
    mediaSm.addEventListener('change', update)
    mediaMd.addEventListener('change', update)
    update()
    return () => {
      mediaSm.removeEventListener('change', update)
      mediaMd.removeEventListener('change', update)
    }
  }, [])

  return formatKey
}

const formatOptions = {
  short: 'dd/MM',           // 15/01 - 20/02
  medium: "d 'de' MMM",    // 15 de jan - 20 de fev
  long: 'PPP',             // 15 de janeiro de 2025 (locale)
}

export const DatePickerWithRange = ({
  value,
  onChange,
  className,
  placeholder = 'Selecione um período',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dateFormat = useDateFormat()
  const today = useMemo(() => startOfDay(new Date()), [])
  const minDate = useMemo(() => startOfDay(subMonths(today, 2)), [today])
  const maxDate = useMemo(() => startOfDay(addMonths(today, 1)), [today])
  const selectedRange = {
    from: isValid(value?.from) ? value.from : undefined,
    to: isValid(value?.to) ? value.to : undefined,
  }

  const formatDate = (date) =>
    format(date, formatOptions[dateFormat], { locale: ptBR })

  return (
    <div className={cn('inline-block', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="sm"
            className={cn(
              'min-w-0 max-w-[220px] justify-start truncate text-left font-normal sm:max-w-[280px]',
              !selectedRange.from && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-1.5 h-3.5 w-3.5 shrink-0 sm:mr-2 sm:h-4 sm:w-4" />
            {selectedRange.from ? (
              selectedRange.to ? (
                <>
                  {formatDate(selectedRange.from)} - {formatDate(selectedRange.to)}
                </>
              ) : (
                formatDate(selectedRange.from)
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selectedRange.from ?? today}
            selected={selectedRange}
            onSelect={(range) => {
              onChange?.(range)
              if (range?.from && range?.to) setIsOpen(false)
            }}
            numberOfMonths={2}
            disabled={{ before: minDate, after: maxDate }}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}