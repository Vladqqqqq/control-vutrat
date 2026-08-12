import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import CategoryIcon, { getCategory } from '../components/ui/CategoryIcon'
import { CATEGORIES } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function HistoryScreen() {
  const { filteredExpenses, filterCategory, setFilterCategory } = useApp()

  return (
    <div className="px-5 pt-12 pb-24">
      <h1 className="text-2xl font-bold mb-4">Історія витрат</h1>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 -mx-1 px-1">
        <FilterChip
          active={filterCategory === 'all'}
          onClick={() => setFilterCategory('all')}
          label="Всі"
        />
        {CATEGORIES.map((cat) => (
          <FilterChip
            key={cat.id}
            active={filterCategory === cat.id}
            onClick={() => setFilterCategory(cat.id)}
            label={cat.label}
            color={cat.color}
          />
        ))}
      </div>

      {filteredExpenses.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500">Витрат у цій категорії немає</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {filteredExpenses.map((exp, i) => {
            const cat = getCategory(exp.category)
            return (
              <Card key={exp.id} delay={i * 0.03} className="!p-3 flex items-center gap-3">
                <CategoryIcon categoryId={exp.category} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{exp.description}</p>
                  <p className="text-xs text-gray-500">
                    {cat.label} · {new Date(exp.date).toLocaleDateString('uk-UA')}
                  </p>
                </div>
                <p className="font-semibold text-danger shrink-0">-₴{exp.amount}</p>
              </Card>
            )
          })}
        </div>
      )}

      <p className="text-center text-xs text-gray-600 mt-6">
        {filteredExpenses.length} записів
      </p>
    </div>
  )
}

function FilterChip({ active, onClick, label, color }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
        active
          ? 'bg-accent border-accent text-white'
          : 'bg-surface-card border-surface-border text-gray-400'
      }`}
      style={active && color ? { backgroundColor: color, borderColor: color } : undefined}
    >
      {label}
    </motion.button>
  )
}
