'use client'

import { format, isValid } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export const DatePicker = ({
  value,
  onChange,
  placeholder = 'Selecione uma data',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedDate = isValid(value) ? value : undefined

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !selectedDate && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, 'PPP', { locale: ptBR })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            onChange?.(date)
            if (date) setIsOpen(false)
          }}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  )
}