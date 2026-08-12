import { motion } from 'framer-motion'

export default function ProgressBar({ percent, warning = false, danger = false }) {
  const color = danger
    ? 'bg-danger'
    : warning
      ? 'bg-warning'
      : 'bg-accent'

  return (
    <div className="h-2.5 w-full rounded-full bg-surface-border overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(percent, 100)}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  )
}
