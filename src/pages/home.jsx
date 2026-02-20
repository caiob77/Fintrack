import { Navigate } from 'react-router-dom'

import AddTransactionButton from '@/components/add-transaction-button'
import Balance from '@/components/balance'
import DateSelection from '@/components/date-selection'
import Header from '@/components/header'
import TransactionTypeChart from '@/components/transaction-type-chart'
import TransactionsTable from '@/components/transactions-table'
import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user, isInitializing } = useAuthContext()
  if (isInitializing) {
    return <div className="p-4 sm:p-6 md:p-8">Carregando...</div>
  }
  if (!user) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <Header />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6 md:p-8 md:space-y-8">
        {/* PARTE DO TOPO */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold sm:text-2xl">Dashboard</h2>
          <div className="flex flex-nowrap items-center gap-2">
            <DateSelection />
            <AddTransactionButton />
          </div>
        </div>

        {/* GRAFICOS ETC */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr,1fr] lg:gap-6">
          <Balance />
          <TransactionTypeChart />
        </div>
        <TransactionsTable />
      </div>
    </>
  )
}

export default HomePage