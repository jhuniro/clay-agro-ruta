import { motion } from 'framer-motion'
import { MOOD_SVG, MOOD_ALT, type RutiMood } from './content'

interface Props {
  mood: RutiMood
  onClick: () => void
}

export default function RutiAvatar({ mood, onClick }: Props) {
  return (
    <motion.button
      className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg-card)] shadow-[var(--shadow-glow-green)] cursor-pointer border-2 border-[var(--color-primary)]"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      aria-label="Abrir asistente Ruti"
      type="button"
    >
      <span className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)] animate-[pulse_2s_ease-in-out_infinite]" />
      <img
        src={MOOD_SVG[mood]}
        alt={MOOD_ALT[mood]}
        className="h-12 w-12 object-contain"
      />
    </motion.button>
  )
}
