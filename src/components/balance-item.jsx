import { formatCurrency } from '@/helpers/currency'

import TransactionTypeIcon from './transaction-type-icon'
import { Card, CardContent } from './ui/card'

const BalanceItem = ({ label, icon, amount }) => {
  return (
    <Card>
      <CardContent className="space-y-1 p-3 sm:space-y-2 sm:p-4 md:p-6">
        {/* ÍCONE E LABEL */}
        <TransactionTypeIcon icon={icon} label={label} />
        <h3 className="text-lg font-semibold sm:text-xl md:text-2xl">{formatCurrency(amount)}</h3>
      </CardContent>
    </Card>
  )
}

export default BalanceItem