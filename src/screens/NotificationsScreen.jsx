import { motion } from 'framer-motion'
import { AlertTriangle, Info, CheckCircle, Bell } from 'lucide-react'
import Card from '../components/ui/Card'
import { useApp } from '../context/AppContext'

const typeConfig = {
  warning: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10 border-warning/30' },
  info: { icon: Info, color: 'text-accent-light', bg: 'bg-accent/10 border-accent/30' },
  success: { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10 border-success/30' },
}

export default function NotificationsScreen() {
  const { notifications, markNotificationRead, budgetPercent, monthlyBudget, totalSpent } =
    useApp()

  return (
    <div className="px-5 pt-12 pb-24">
      <h1 className="text-2xl font-bold mb-2">Сповіщення</h1>
      <p className="text-sm text-gray-500 mb-6">Попередження та поради щодо бюджету</p>

      {budgetPercent >= 75 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 rounded-2xl border-2 border-warning/50 bg-warning/10 p-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-warning">Стан: попередження</p>
              <p className="text-sm text-gray-300 mt-1">
                Використано {Math.round(budgetPercent)}% бюджету (₴{totalSpent} / ₴
                {monthlyBudget}). Рекомендуємо зменшити витрати на розваги та підписки.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {notifications.length === 0 ? (
        <Card className="text-center py-12">
          <Bell className="h-10 w-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">Немає сповіщень</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((n, i) => {
            const cfg = typeConfig[n.type] || typeConfig.info
            const Icon = cfg.icon
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  onClick={() => markNotificationRead(n.id)}
                  className={`!p-4 ${cfg.bg} ${!n.read ? 'ring-1 ring-accent/30' : 'opacity-70'}`}
                >
                  <div className="flex gap-3">
                    <Icon className={`h-5 w-5 shrink-0 ${cfg.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm">{n.title}</p>
                        {!n.read && (
                          <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{n.message}</p>
                      <p className="text-xs text-gray-600 mt-2">{n.time}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
