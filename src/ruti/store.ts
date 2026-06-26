import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { RutiMood } from './content'
import { GREETING, MINIMIZE_MSG } from './content'

export type RutiMode = 'idle' | 'tutorial' | 'faq' | 'tips'

interface RutiState {
  isOpen: boolean
  mood: RutiMood
  message: string
  mode: RutiMode
  tutorialStep: number
  tipIndex: number
  currentView: string

  open: () => void
  close: () => void
  minimize: () => void
  setView: (view: string) => void
  setMood: (mood: RutiMood) => void
  setMessage: (msg: string) => void
  startTutorial: () => void
  nextTutorialStep: (steps: string[]) => void
  startTips: () => void
  nextTip: (tips: string[]) => void
  startFaq: () => void
  answerFaq: (answer: string) => void
  reset: () => void
}

export const useRutiStore = create<RutiState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      mood: 'inactive',
      message: MINIMIZE_MSG.text,
      mode: 'idle',
      tutorialStep: 0,
      tipIndex: 0,
      currentView: 'home',

      open: () =>
        set({
          isOpen: true,
          mood: GREETING.mood,
          message: GREETING.text,
          mode: 'idle',
          tutorialStep: 0,
          tipIndex: 0,
        }),

      close: () =>
        set({
          isOpen: false,
          mood: 'inactive',
          message: '',
          mode: 'idle',
          tutorialStep: 0,
          tipIndex: 0,
        }),

      minimize: () =>
        set({
          isOpen: false,
          mood: MINIMIZE_MSG.mood,
          message: MINIMIZE_MSG.text,
          mode: 'idle',
          tutorialStep: 0,
          tipIndex: 0,
        }),

      setView: (view) => set({ currentView: view }),

      setMood: (mood) => set({ mood }),

      setMessage: (msg) => set({ message: msg }),

      startTutorial: () =>
        set({
          mode: 'tutorial',
          tutorialStep: 0,
          mood: 'explaining',
          message: 'Voy a guiarte por esta pantalla paso a paso. Presiona "Siguiente" cuando estés listo.',
        }),

      nextTutorialStep: (steps) => {
        const { tutorialStep } = get()
        const next = tutorialStep + 1
        if (next < steps.length) {
          set({ tutorialStep: next, message: steps[next], mood: 'explaining' })
        } else {
          set({
            mode: 'idle',
            mood: 'excited',
            message: '¡Tutorial completado! Ahora puedes usar la app con confianza.',
          })
        }
      },

      startTips: () =>
        set({
          mode: 'tips',
          tipIndex: 0,
          mood: 'explaining',
        }),

      nextTip: (tips) => {
        const { tipIndex } = get()
        const next = tipIndex + 1
        if (next < tips.length) {
          set({ tipIndex: next, message: tips[next], mood: 'explaining' })
        } else {
          set({
            mode: 'idle',
            mood: 'happy',
            message: '¿Necesitas algo más? Puedo ayudarte con tutoriales o preguntas frecuentes.',
          })
        }
      },

      startFaq: () =>
        set({
          mode: 'faq',
          mood: 'waiting',
          message: 'Elige una pregunta frecuente:',
        }),

      answerFaq: (answer) =>
        set({
          mode: 'idle',
          mood: 'explaining',
          message: answer,
        }),

      reset: () =>
        set({
          isOpen: false,
          mood: 'inactive',
          message: MINIMIZE_MSG.text,
          mode: 'idle',
          tutorialStep: 0,
          tipIndex: 0,
        }),
    }),
    {
      name: 'ruti-storage',
      partialize: (state) => ({
        isOpen: state.isOpen,
        mood: state.mood,
        message: state.message,
        mode: state.mode,
        tutorialStep: state.tutorialStep,
        tipIndex: state.tipIndex,
      }),
    }
  )
)
