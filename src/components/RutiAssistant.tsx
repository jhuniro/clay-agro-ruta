import { useState } from 'react'
import {
  MOOD_EMOJI,
  GREETING,
  TUTORIAL_INTRO,
  MINIMIZE_MSG,
  TIPS,
  FAQ,
  TUTORIAL_STEPS,
  type RutiMood,
} from '../data/rutiContent'
import './RutiAssistant.css'

interface Props {
  currentView: string
}

export default function RutiAssistant({ currentView }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [mood, setMood] = useState<RutiMood>('inactive')
  const [message, setMessage] = useState(MINIMIZE_MSG.text)
  const [showTutorial, setShowTutorial] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(0)
  const [showFaq, setShowFaq] = useState(false)
  const [showTips, setShowTips] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    setMood(GREETING.mood)
    setMessage(GREETING.text)
    setShowTutorial(false)
    setShowFaq(false)
    setShowTips(false)
  }

  const handleTutorial = () => {
    setShowTutorial(true)
    setShowFaq(false)
    setShowTips(false)
    setTutorialStep(0)
    setMood(TUTORIAL_INTRO.mood)
    setMessage(TUTORIAL_INTRO.text)
  }

  const handleTutorialNext = () => {
    const steps = TUTORIAL_STEPS[currentView] || TUTORIAL_STEPS.home
    const next = tutorialStep + 1
    if (next < steps.length) {
      setTutorialStep(next)
      setMessage(steps[next])
      setMood('explaining')
    } else {
      setMood('happy')
      setMessage('¡Tutorial completado! Ahora puedes usar la app con confianza.')
      setShowTutorial(false)
    }
  }

  const handleFaq = () => {
    setShowFaq(true)
    setShowTutorial(false)
    setShowTips(false)
    setMood('waiting')
    setMessage('Elige una pregunta frecuente:')
  }

  const handleTips = () => {
    setShowTips(true)
    setShowFaq(false)
    setShowTutorial(false)
    setMood('explaining')
    const tips = TIPS[currentView] || TIPS.home
    setMessage(tips[0])
  }

  const handleFaqSelect = (answer: string) => {
    setMood('explaining')
    setMessage(answer)
    setShowFaq(false)
  }

  const handleTipsNext = () => {
    const tips = TIPS[currentView] || TIPS.home
    const nextIdx = tips.indexOf(message) + 1
    if (nextIdx < tips.length) {
      setMessage(tips[nextIdx])
    } else {
      setMood('happy')
      setMessage('¿Necesitas algo más? Puedo ayudarte con tutoriales o preguntas frecuentes.')
      setShowTips(false)
    }
  }

  const handleMinimize = () => {
    setIsOpen(false)
    setMood(MINIMIZE_MSG.mood)
    setMessage(MINIMIZE_MSG.text)
    setShowTutorial(false)
    setShowFaq(false)
    setShowTips(false)
  }

  const handleClose = () => {
    setIsOpen(false)
    setMood('inactive')
    setMessage('')
    setShowTutorial(false)
    setShowFaq(false)
    setShowTips(false)
  }

  const faqItems = FAQ[currentView] || FAQ.home

  return (
    <>
      {/* Avatar */}
      <button
        className="ruti-avatar"
        onClick={handleOpen}
        aria-label="Abrir asistente Ruti"
        type="button"
      >
        <span className="ruti-avatar__ring" />
        <span className="ruti-avatar__emoji">{MOOD_EMOJI[mood]}</span>
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="ruti-panel" role="dialog" aria-label="Asistente Ruti">
          {/* Header */}
          <div className="ruti-panel__header">
            <span className="ruti-panel__emoji">{MOOD_EMOJI[mood]}</span>
            <span className="ruti-panel__name">Ruti</span>
            <div className="ruti-panel__actions">
              <button
                className="ruti-panel__btn"
                onClick={handleTutorial}
                title="Tutorial"
                type="button"
              >
                📖
              </button>
              <button
                className="ruti-panel__btn"
                onClick={handleFaq}
                title="Preguntar"
                type="button"
              >
                💬
              </button>
              <button
                className="ruti-panel__btn"
                onClick={handleMinimize}
                title="Minimizar"
                type="button"
              >
                —
              </button>
              <button
                className="ruti-panel__btn ruti-panel__btn--close"
                onClick={handleClose}
                title="Cerrar"
                type="button"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="ruti-panel__body">
            <p className="ruti-panel__message">{message}</p>

            {/* Tutorial controls */}
            {showTutorial && (
              <div className="ruti-panel__controls">
                <button
                  className="ruti-panel__action-btn"
                  onClick={handleTutorialNext}
                  type="button"
                >
                  Siguiente →
                </button>
              </div>
            )}

            {/* FAQ list */}
            {showFaq && (
              <div className="ruti-panel__faq-list">
                {faqItems.map((item) => (
                  <button
                    key={item.q}
                    className="ruti-panel__faq-item"
                    onClick={() => handleFaqSelect(item.a)}
                    type="button"
                  >
                    {item.q}
                  </button>
                ))}
              </div>
            )}

            {/* Tips */}
            {showTips && (
              <div className="ruti-panel__controls">
                <button
                  className="ruti-panel__action-btn"
                  onClick={handleTipsNext}
                  type="button"
                >
                  Siguiente tip →
                </button>
              </div>
            )}

            {/* Default action buttons */}
            {!showTutorial && !showFaq && !showTips && (
              <div className="ruti-panel__controls">
                <button
                  className="ruti-panel__action-btn"
                  onClick={handleTutorial}
                  type="button"
                >
                  📖 Tutorial
                </button>
                <button
                  className="ruti-panel__action-btn"
                  onClick={handleTips}
                  type="button"
                >
                  💡 Tips
                </button>
                <button
                  className="ruti-panel__action-btn"
                  onClick={handleFaq}
                  type="button"
                >
                  💬 Preguntas
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
