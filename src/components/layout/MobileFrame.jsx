import { motion, AnimatePresence } from 'framer-motion'
import LoadingOverlay from '../ui/LoadingOverlay'

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export default function MobileFrame({
  screenKey,
  content,
  footer = null,
  loading = false,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#08080c]">
      <div className="relative w-full max-w-[390px] h-[844px] max-h-[90vh] rounded-[40px] border-4 border-[#1a1a24] bg-surface overflow-hidden shadow-2xl shadow-black/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-30 pointer-events-none" />

        <div className="relative h-full flex flex-col overflow-hidden">
          <div className="relative flex-1 min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={screenKey}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="absolute inset-0 overflow-y-auto scrollbar-hide"
                style={{ paddingBottom: footer ? '5.5rem' : 0 }}
              >
                {content}
              </motion.div>
            </AnimatePresence>
            <LoadingOverlay visible={loading} />
          </div>

          {footer}
        </div>
      </div>
    </div>
  )
}
