import { motion } from 'framer-motion'

export default function Card({ children, className = '', onClick, delay = 0 }) {
  const Component = onClick ? motion.button : motion.div

  return (
    <Component
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`
        rounded-2xl bg-surface-card border border-surface-border p-4 shadow-card
        ${onClick ? 'cursor-pointer hover:border-accent/30 transition-colors text-left w-full' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  )
}
