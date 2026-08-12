import { motion } from 'framer-motion'
import { Plus, TrendingDown, AlertTriangle } from 'lucide-react'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import Button from '../components/ui/Button'
import CategoryIcon, { getCategory } from '../components/ui/CategoryIcon'
import { WeeklyBarChart } from '../components/charts/ExpenseChart'
import { useApp } from '../context/AppContext'
import { useMemo } from 'react'
import { SAVINGS_TIPS } from '../data/mockData'

export default function DashboardScreen() {
  const {
    userName,
    balance,
    totalSpent,
    monthlyBudget,
    budgetPercent,
    isOverBudget,
    expenses,
    navigate,
  } = useApp()

  const chartData = useMemo(() => {
    const days = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    const totals = days.map((d) => ({ day: d, amount: 0 }))
    expenses.forEach((e) => {
      const d = new Date(e.date).getDay()
      totals[d].amount += e.amount
    })
    const order = [1, 2, 3, 4, 5, 6, 0]
    return order.map((i) => totals[i])
  }, [expenses])

  const recent = expenses.slice(0, 4)

  return (
    <div className="px-5 pt-12 pb-4">
      <header className="mb-6">
        <p className="text-gray-400 text-sm">Вітаємо,</p>
        <h1 className="text-2xl font-bold">{userName}</h1>
      </header>

      {isOverBudget && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-3 rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3"
        >
          <AlertTriangle className="h-5 w-5 text-danger shrink-0" />
          <p className="text-sm text-danger">Бюджет перевищено! Перегляньте витрати.</p>
        </motion.div>
      )}

      <Card className="mb-4 bg-gradient-to-br from-accent/20 to-surface-card border-accent/20">
        <p className="text-sm text-gray-400 mb-1">Залишок бюджету</p>
        <p className="text-3xl font-bold mb-1">
          ₴{balance.toLocaleString('uk-UA')}
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Витрачено ₴{totalSpent.toLocaleString('uk-UA')} з ₴{monthlyBudget.toLocaleString('uk-UA')}
        </p>
        <ProgressBar
          percent={budgetPercent}
          warning={budgetPercent >= 60 && budgetPercent < 90}
          danger={budgetPercent >= 90}
        />
        <p className="text-xs text-gray-500 mt-2 text-right">{Math.round(budgetPercent)}%</p>
      </Card>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card delay={0.05}>
          <TrendingDown className="h-5 w-5 text-accent mb-2" />
          <p className="text-xs text-gray-500">Цього місяця</p>
          <p className="text-lg font-bold">₴{totalSpent.toLocaleString('uk-UA')}</p>
        </Card>
        <Card delay={0.1} onClick={() => navigate('statistics')}>
          <p className="text-xs text-gray-500">Категорій</p>
          <p className="text-lg font-bold">5</p>
          <p className="text-xs text-accent mt-1">Детальніше →</p>
        </Card>
      </div>

      <Card className="mb-4" delay={0.15}>
        <h3 className="font-semibold mb-3">Витрати за тиждень</h3>
        <WeeklyBarChart data={chartData} />
      </Card>

      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Останні витрати</h3>
        <button
          onClick={() => navigate('history')}
          className="text-sm text-accent"
        >
          Всі
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {recent.map((exp, i) => {
          const cat = getCategory(exp.category)
          return (
            <Card key={exp.id} delay={0.2 + i * 0.05} className="!p-3 flex items-center gap-3">
              <CategoryIcon categoryId={exp.category} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{exp.description}</p>
                <p className="text-xs text-gray-500">{cat.label} · {exp.date}</p>
              </div>
              <p className="font-semibold text-danger">-₴{exp.amount}</p>
            </Card>
          )
        })}
      </div>

      <Card delay={0.35} className="mb-20 !bg-accent/5 border-accent/20">
        <p className="text-xs text-accent font-medium mb-1">💡 Порада</p>
        <p className="text-sm text-gray-300">{SAVINGS_TIPS[0]}</p>
      </Card>

      <div className="sticky bottom-0 pt-2 pb-2 bg-gradient-to-t from-surface via-surface to-transparent">
        <Button onClick={() => navigate('add-expense')} className="w-full" icon={Plus}>
          Додати витрату
        </Button>
      </div>
    </div>
  )
}
