'use client'

import { addMonths, format, isValid, startOfDay, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export const DatePickerWithRange = ({
  value,
  onChange,
  className,
  placeholder = 'Selecione um período',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const today = useMemo(() => startOfDay(new Date()), [])
  const minDate = useMemo(() => startOfDay(subMonths(today, 2)), [today])
  const maxDate = useMemo(() => startOfDay(addMonths(today, 1)), [today])
  const selectedRange = {
    from: isValid(value?.from) ? value.from : undefined,
    to: isValid(value?.to) ? value.to : undefined,
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !selectedRange.from && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedRange.from ? (
              selectedRange.to ? (
                <>
                  {format(selectedRange.from, 'PPP', {
                    locale: ptBR,
                  })}{' '}
                  -{' '}
                  {format(selectedRange.to, 'PPP', {
                    locale: ptBR,
                  })}
                </>
              ) : (
                format(selectedRange.from, 'PPP', {
                  locale: ptBR,
                })
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