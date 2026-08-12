import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wallet } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function SplashScreen() {
  const { setScreen } = useApp()

  useEffect(() => {
    const t = setTimeout(() => setScreen('onboarding'), 2200)
    return () => clearTimeout(t)
  }, [setScreen])

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 bg-gradient-to-b from-surface to-[#12121a]">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="mb-8 p-6 rounded-3xl bg-accent/20 shadow-glow"
      >
        <Wallet className="h-16 w-16 text-accent" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-center"
      >
        Spend<span className="text-accent">Wise</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-3 text-gray-400 text-center text-sm"
      >
        Контроль витрат для студентів
      </motion.p>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '120px' }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="mt-12 h-1 rounded-full bg-accent/30 overflow-hidden"
      >
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="h-full w-1/2 bg-accent rounded-full"
        />
      </motion.div>
    </div>
  )
}
