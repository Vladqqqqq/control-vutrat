import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function SuccessOverlay({ visible }) {
  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-surface/90 backdrop-blur-md rounded-[inherit]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <CheckCircle className="h-16 w-16 text-success" />
        </motion.div>
        <p className="text-lg font-semibold text-white">Успішно!</p>
        <p className="text-sm text-gray-400">Витрату збережено</p>
      </motion.div>
    </motion.div>
  )
}
