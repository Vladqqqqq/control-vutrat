import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import CategoryIcon, { getCategory } from '../components/ui/CategoryIcon'
import { CategoryPieChart } from '../components/charts/ExpenseChart'
import { CATEGORIES, SAVINGS_TIPS } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function StatisticsScreen() {
  const { totalSpent, monthlyBudget, budgetPercent, categoryTotals, balance } = useApp()

  const sorted = [...CATEGORIES].sort(
    (a, b) => (categoryTotals[b.id] || 0) - (categoryTotals[a.id] || 0)
  )

  return (
    <div className="px-5 pt-12 pb-24">
      <h1 className="text-2xl font-bold mb-6">Статистика</h1>

      <Card className="mb-4">
        <p className="text-sm text-gray-400 mb-1">Місячний огляд — травень 2026</p>
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-2xl font-bold">₴{totalSpent.toLocaleString('uk-UA')}</p>
            <p className="text-xs text-gray-500">з ₴{monthlyBudget.toLocaleString('uk-UA')}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-success">₴{balance.toLocaleString('uk-UA')}</p>
            <p className="text-xs text-gray-500">залишок</p>
          </div>
        </div>
        <ProgressBar
          percent={budgetPercent}
          warning={budgetPercent >= 60}
          danger={budgetPercent >= 90}
        />
      </Card>

      <Card className="mb-4">
        <h3 className="font-semibold mb-2">Розподіл за категоріями</h3>
        <CategoryPieChart />
        <div className="flex flex-wrap gap-3 mt-2 justify-center">
          {CATEGORIES.map((c) => (
            <div key={c.id} className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
              {c.label}
            </div>
          ))}
        </div>
      </Card>

      <h3 className="font-semibold mb-3">По категоріях</h3>
      <div className="space-y-2 mb-4">
        {sorted.map((cat, i) => {
          const amount = categoryTotals[cat.id] || 0
          const pct = totalSpent ? (amount / totalSpent) * 100 : 0
          return (
            <Card key={cat.id} delay={i * 0.05} className="!p-3">
              <div className="flex items-center gap-3 mb-2">
                <CategoryIcon categoryId={cat.id} size="sm" />
                <div className="flex-1">
                  <p className="font-medium">{cat.label}</p>
                  <p className="text-xs text-gray-500">{Math.round(pct)}% від загальних</p>
                </div>
                <p className="font-semibold">₴{amount.toLocaleString('uk-UA')}</p>
              </div>
              <div className="h-1.5 rounded-full bg-surface-border overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: cat.color }}
                />
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="!bg-warning/5 border-warning/20">
        <h3 className="font-semibold text-warning mb-2">Рекомендації</h3>
        <ul className="space-y-2">
          {SAVINGS_TIPS.map((tip, i) => (
            <li key={i} className="text-sm text-gray-300 flex gap-2">
              <span className="text-warning">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
