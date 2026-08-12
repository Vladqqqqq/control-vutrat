import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertCircle,
  info: Info,
}

const styles = {
  success: 'border-success/30 bg-success/10 text-success',
  error: 'border-danger/30 bg-danger/10 text-danger',
  warning: 'border-warning/30 bg-warning/10 text-warning',
  info: 'border-accent/30 bg-accent/10 text-accent-light',
}

export default function Toast({ toast }) {
  const Icon = toast ? icons[toast.type] || icons.success : null

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 px-4 w-full max-w-[340px]"
        >
          <div
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur-xl ${styles[toast.type] || styles.success}`}
          >
            {Icon && <Icon className="h-5 w-5 shrink-0" />}
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
