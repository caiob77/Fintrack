import { ArrowUpDownIcon } from 'lucide-react'

import { Button } from './button'

const SortableColumnHeader = ({ column, children }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto min-h-0 gap-1.5 px-0 py-0 text-left text-inherit text-sm font-medium hover:bg-transparent"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {children}
      <ArrowUpDownIcon className="h-3.5 w-3.5 shrink-0" />
    </Button>
  )
}

export default SortableColumnHeader