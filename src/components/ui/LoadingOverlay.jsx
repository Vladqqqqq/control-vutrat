import { motion } from 'framer-motion'

export default function LoadingOverlay({ visible }) {
  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex items-center justify-center bg-surface/80 backdrop-blur-sm rounded-[inherit]"
    >
      <div className="flex flex-col items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-10 w-10 rounded-full border-2 border-accent/30 border-t-accent"
        />
        <p className="text-sm text-gray-400">Завантаження...</p>
      </div>
    </motion.div>
  )
}
