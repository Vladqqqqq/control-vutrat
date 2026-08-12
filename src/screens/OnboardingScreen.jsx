import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Target, PieChart, Bell } from 'lucide-react'
import Button from '../components/ui/Button'
import { useApp } from '../context/AppContext'

const slides = [
  {
    icon: Target,
    title: 'Контролюй бюджет',
    text: 'Встановлюй місячний ліміт і відстежуй залишок у реальному часі.',
  },
  {
    icon: PieChart,
    title: 'Аналізуй витрати',
    text: 'Категорії, графіки та статистика — все для розумних рішень.',
  },
  {
    icon: Bell,
    title: 'Отримуй поради',
    text: 'Сповіщення про перевищення бюджету та рекомендації щодо економії.',
  },
]

export default function OnboardingScreen() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const { setUserName, navigate } = useApp()
  const isLast = step === slides.length

  const handleNext = () => {
    if (step < slides.length) setStep((s) => s + 1)
    else {
      if (name.trim()) setUserName(name.trim())
      navigate('dashboard')
    }
  }

  return (
    <div className="h-full flex flex-col px-6 pt-14 pb-8">
      <AnimatePresence mode="wait">
        {!isLast ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="flex-1 flex flex-col"
          >
            <div className="p-5 rounded-3xl bg-accent/15 w-fit mb-8">
              {(() => {
                const Icon = slides[step].icon
                return <Icon className="h-12 w-12 text-accent" />
              })()}
            </div>
            <h2 className="text-2xl font-bold mb-3">{slides[step].title}</h2>
            <p className="text-gray-400 leading-relaxed">{slides[step].text}</p>

            <div className="flex gap-2 mt-auto pt-8">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? 'w-8 bg-accent' : 'w-4 bg-surface-border'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-2xl font-bold mb-2">Привіт! 👋</h2>
            <p className="text-gray-400 mb-8">Як до вас звертатися?</p>

            <label className="text-sm text-gray-500 mb-2">Ваше ім'я</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Олексій"
              className="w-full px-4 py-4 rounded-2xl bg-surface-card border border-surface-border text-white placeholder:text-gray-600 focus:border-accent transition-colors"
            />

            <p className="mt-6 text-xs text-gray-500">
              Місячний бюджет за замовчуванням: ₴8 000. Змінити можна в налаштуваннях.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Button onClick={handleNext} className="w-full mt-6" icon={ChevronRight}>
        {isLast ? 'Почати' : 'Далі'}
      </Button>

      {!isLast && step > 0 && (
        <button
          onClick={() => setStep((s) => s - 1)}
          className="mt-3 text-sm text-gray-500 hover:text-white transition-colors"
        >
          Назад
        </button>
      )}
    </div>
  )
}
