import { motion, AnimatePresence } from 'framer-motion'
import { useTypewriter } from './useTypewriter'
import { MOOD_SVG, MOOD_ALT, type RutiMood } from './content'

interface Props {
  isOpen: boolean
  mood: RutiMood
  message: string
  onClose: () => void
  onMinimize: () => void
  onTutorial: () => void
  onFaq: () => void
  onTips: () => void
  children?: React.ReactNode
}

export default function RutiPanel({
  isOpen,
  mood,
  message,
  onClose,
  onMinimize,
  onTutorial,
  onFaq,
  onTips,
  children,
}: Props) {
  const { displayed, isTyping, skip } = useTypewriter(message, 25)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-5 z-50 w-[min(360px,calc(100vw-2.5rem))] rounded-[2px] bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          role="dialog"
          aria-label="Asistente Ruti"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[var(--color-bg-surface)] border-b border-[var(--color-border)]">
            <img
              src={MOOD_SVG[mood]}
              alt={MOOD_ALT[mood]}
              className="h-10 w-10 object-contain"
            />
            <span className="flex-1 font-semibold text-[var(--color-text)] font-[var(--font-display)]">
              Ruti
            </span>
            <div className="flex gap-1">
              <button
                className="h-8 w-8 flex items-center justify-center rounded-[2px] text-sm hover:bg-[var(--color-bg-card)] text-[var(--color-text-muted)] cursor-pointer"
                onClick={onTutorial}
                title="Tutorial"
                type="button"
              >
                📖
              </button>
              <button
                className="h-8 w-8 flex items-center justify-center rounded-[2px] text-sm hover:bg-[var(--color-bg-card)] text-[var(--color-text-muted)] cursor-pointer"
                onClick={onFaq}
                title="Preguntar"
                type="button"
              >
                💬
              </button>
              <button
                className="h-8 w-8 flex items-center justify-center rounded-[2px] text-sm hover:bg-[var(--color-bg-card)] text-[var(--color-text-muted)] cursor-pointer"
                onClick={onTips}
                title="Tips"
                type="button"
              >
                💡
              </button>
              <button
                className="h-8 w-8 flex items-center justify-center rounded-[2px] text-sm hover:bg-[var(--color-bg-card)] text-[var(--color-text-muted)] cursor-pointer"
                onClick={onMinimize}
                title="Minimizar"
                type="button"
              >
                —
              </button>
              <button
                className="h-8 w-8 flex items-center justify-center rounded-[2px] text-sm hover:bg-red-900/30 text-[var(--color-text-muted)] cursor-pointer"
                onClick={onClose}
                title="Cerrar"
                type="button"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-4 py-3 max-h-64 overflow-y-auto">
            <p
              className="text-sm text-[var(--color-text)] leading-relaxed cursor-pointer"
              onClick={isTyping ? skip : undefined}
              title={isTyping ? 'Clic para saltar animación' : undefined}
            >
              {displayed}
              {isTyping && (
                <span className="inline-block w-0.5 h-4 ml-0.5 bg-[var(--color-primary)] animate-[blink_0.7s_step-end_infinite]" />
              )}
            </p>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
