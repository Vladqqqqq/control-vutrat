import { motion } from 'framer-motion'
import { Home, BarChart3, History, Bell } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const tabs = [
  { id: 'dashboard', icon: Home, label: 'Головна' },
  { id: 'statistics', icon: BarChart3, label: 'Статистика' },
  { id: 'history', icon: History, label: 'Історія' },
  { id: 'notifications', icon: Bell, label: 'Сповіщення' },
]

export default function BottomNav() {
  const { screen, navigate, unreadCount } = useApp()

  return (
    <nav className="shrink-0 z-30 bg-surface/95 backdrop-blur-xl border-t border-surface-border px-2 pb-6 pt-2">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const active = screen === tab.id
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(tab.id)}
              className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                active ? 'text-accent' : 'text-gray-500'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-accent/10 rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative">
                <Icon className="h-5 w-5" />
                {tab.id === 'notifications' && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-danger text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </span>
              <span className="relative text-[10px] font-medium">{tab.label}</span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
