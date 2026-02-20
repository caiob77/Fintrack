import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Label, Pie, PieChart, Sector } from 'recharts'

import { useGetUserBalance } from '@/api/hooks/user'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { getDefaultDateRangeString } from '@/helpers/date'

import TransactionTypeChartLabel from './transaction-type-chart-label'
import TransactionTypeIcon from './transaction-type-icon'

const chartConfig = {
  earnings: {
    label: 'Ganhos',
    color: 'hsl(var(--primary-green))',
  },
  expenses: {
    label: 'Gastos',
    color: 'hsl(var(--primary-red))',
  },
  investments: {
    label: 'Investimentos',
    color: 'hsl(var(--primary-blue))',
  },
}

const toNum = (value) => {
  const n = parseFloat(value)
  return Number.isFinite(n) && n > 0 ? n : 0
}

const formatPercentage = (value) => `${value.toFixed(1)}%`

const renderActiveShape = ({ outerRadius = 0, ...props }) => (
  <Sector {...props} outerRadius={outerRadius + 10} />
)

const ITEMS = [
  {
    key: 'earnings',
    porcentageKey: 'earningsPorcentage',
    label: 'Ganhos',
    icon: (props) => <TrendingUpIcon className="text-primary-green" {...props} />,
  },
  {
    key: 'expenses',
    porcentageKey: 'expensesPorcentage',
    label: 'Gastos',
    icon: (props) => <TrendingDownIcon className="text-primary-red" {...props} />,
  },
  {
    key: 'investments',
    porcentageKey: 'investmentsPorcentage',
    label: 'Investimentos',
    icon: (props) => <PiggyBankIcon className="text-primary-blue" {...props} />,
  },
]

const TransactionTypeChart = () => {
  const defaultRange = useMemo(() => getDefaultDateRangeString(), [])
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from') ?? defaultRange.from
  const to = searchParams.get('to') ?? defaultRange.to
  const { data } = useGetUserBalance({ from, to })
  const [activeIndex, setActiveIndex] = useState(0)

  const chartData = useMemo(() => [
    { type: 'earnings', value: toNum(data?.earnings), fill: 'var(--color-earnings)' },
    { type: 'expenses', value: toNum(data?.expenses), fill: 'var(--color-expenses)' },
    { type: 'investments', value: toNum(data?.investments), fill: 'var(--color-investments)' },
  ], [data])

  const activeItem = ITEMS[activeIndex]
  const activePercentage = toNum(data?.[activeItem.porcentageKey])

  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-1 items-center gap-6 pb-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[250px] min-w-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  valueFormatter={formatPercentage}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              isAnimationActive={false}
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !('cx' in viewBox)) return null
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {formatPercentage(activePercentage)}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 20}
                        className="fill-muted-foreground text-xs"
                      >
                        {activeItem.label}
                      </tspan>
                    </text>
                  )
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="space-y-3">
          {ITEMS.map((item, index) => {
            const Icon = item.icon
            return (
              <TransactionTypeChartLabel
                key={item.key}
                icon={
                  <TransactionTypeIcon
                    icon={<Icon size={16} />}
                    label={item.label}
                  />
                }
                value={formatPercentage(toNum(data?.[item.porcentageKey]))}
                active={activeIndex === index}
                onMouseEnter={() => setActiveIndex(index)}
              />
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default TransactionTypeChart