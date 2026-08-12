import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import SuccessOverlay from '../components/ui/SuccessOverlay'
import CategoryIcon from '../components/ui/CategoryIcon'
import { CATEGORIES } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function AddExpenseScreen() {
  const { navigate, addExpense, uiState } = useApp()
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('food')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const num = parseFloat(amount)
    if (!num || num <= 0) {
      setError('Введіть коректну суму')
      return
    }
    if (!description.trim()) {
      setError('Додайте опис витрати')
      return
    }

    addExpense({
      amount: num,
      category,
      description: description.trim(),
      date,
    })
  }

  return (
    <div className="relative h-full flex flex-col">
      <header className="flex items-center gap-4 px-5 pt-12 pb-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('dashboard')}
          className="p-2 rounded-xl bg-surface-card border border-surface-border"
        >
          <ArrowLeft className="h-5 w-5" />
        </motion.button>
        <h1 className="text-xl font-bold">Нова витрата</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 px-5 pb-8 overflow-y-auto scrollbar-hide">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
          >
            {error}
          </motion.div>
        )}

        <label className="text-sm text-gray-500 mb-2 block">Сума (₴)</label>
        <input
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full text-3xl font-bold px-4 py-4 mb-6 rounded-2xl bg-surface-card border border-surface-border focus:border-accent transition-colors"
        />

        <label className="text-sm text-gray-500 mb-3 block">Категорія</label>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(cat.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-colors ${
                category === cat.id
                  ? 'border-accent bg-accent/10'
                  : 'border-surface-border bg-surface-card'
              }`}
            >
              <CategoryIcon categoryId={cat.id} size="sm" />
              <span className="text-xs font-medium">{cat.label}</span>
            </motion.button>
          ))}
        </div>

        <label className="text-sm text-gray-500 mb-2 block">Опис</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Наприклад: обід у кафе"
          className="w-full px-4 py-4 mb-4 rounded-2xl bg-surface-card border border-surface-border focus:border-accent transition-colors"
        />

        <label className="text-sm text-gray-500 mb-2 block">Дата</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-4 mb-8 rounded-2xl bg-surface-card border border-surface-border focus:border-accent transition-colors text-white [color-scheme:dark]"
        />

        <Button
          type="submit"
          className="w-full"
          loading={uiState === 'loading'}
          disabled={uiState === 'loading' || uiState === 'success'}
        >
          Підтвердити
        </Button>
      </form>

      <LoadingOverlay visible={uiState === 'loading'} />
      <SuccessOverlay visible={uiState === 'success'} />
    </div>
  )
}
