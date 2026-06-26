import { useEffect, useRef } from 'react'
import { useRutiStore } from './store'
import {
  FAQ,
  TIPS,
  TUTORIAL_STEPS,
  DONT_UNDERSTAND,
  WHATSAPP_NUMBER,
  WHATSAPP_MSGS,
} from './content'
import RutiAvatar from './RutiAvatar'
import RutiPanel from './RutiPanel'
import RutiInput from './RutiInput'

interface Props {
  currentView: string
}

export default function RutiCopilot({ currentView }: Props) {
  const {
    isOpen,
    mood,
    message,
    mode,
    tutorialStep,
    tipIndex,
    currentView: storedView,
    open,
    close,
    minimize,
    setView,
    setMessage,
    startTutorial,
    nextTutorialStep,
    startTips,
    nextTip,
    startFaq,
    answerFaq,
  } = useRutiStore()

  const prevViewRef = useRef(storedView)

  useEffect(() => {
    if (currentView !== prevViewRef.current) {
      setView(currentView)
      prevViewRef.current = currentView
    }
  }, [currentView, setView])

  const tutorialSteps = TUTORIAL_STEPS[currentView] || TUTORIAL_STEPS.home
  const tips = TIPS[currentView] || TIPS.home
  const faqItems = FAQ[currentView] || FAQ.home

  const handleTutorial = () => {
    startTutorial()
  }

  const handleTutorialNext = () => {
    nextTutorialStep(tutorialSteps)
  }

  const handleTips = () => {
    startTips()
    setMessage(tips[0])
  }

  const handleTipsNext = () => {
    nextTip(tips)
  }

  const handleFaq = () => {
    startFaq()
  }

  const handleFaqSelect = (answer: string) => {
    answerFaq(answer)
  }

  const handleQuestion = (text: string) => {
    const lower = text.toLowerCase()
    const matchedFaq = faqItems.find(
      (item) =>
        item.q.toLowerCase().includes(lower) ||
        lower.includes(item.q.toLowerCase().replace(/[¿?]/g, ''))
    )
    if (matchedFaq) {
      setMessage('Déjame pensarlo...')
      setTimeout(() => {
        answerFaq(matchedFaq.a)
      }, 800)
    } else {
      setMessage(DONT_UNDERSTAND.text)
    }
  }

  const handleWhatsApp = () => {
    const msg = WHATSAPP_MSGS[currentView] || WHATSAPP_MSGS.home
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank'
    )
  }

  return (
    <>
      <RutiAvatar mood={mood} onClick={open} />

      <RutiPanel
        isOpen={isOpen}
        mood={mood}
        message={message}
        onClose={close}
        onMinimize={minimize}
        onTutorial={handleTutorial}
        onFaq={handleFaq}
        onTips={handleTips}
      >
        {/* Tutorial controls */}
        {mode === 'tutorial' && (
          <div className="mt-3 flex gap-2">
            <button
              className="flex-1 px-3 py-2 text-sm font-medium rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] transition-colors cursor-pointer"
              onClick={handleTutorialNext}
              type="button"
            >
              {tutorialStep < tutorialSteps.length - 1
                ? 'Siguiente →'
                : 'Finalizar ✓'}
            </button>
          </div>
        )}

        {/* Tips controls */}
        {mode === 'tips' && (
          <div className="mt-3 flex gap-2">
            <button
              className="flex-1 px-3 py-2 text-sm font-medium rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] transition-colors cursor-pointer"
              onClick={handleTipsNext}
              type="button"
            >
              {tipIndex < tips.length - 1
                ? 'Siguiente tip →'
                : 'Finalizar ✓'}
            </button>
          </div>
        )}

        {/* FAQ list */}
        {mode === 'faq' && (
          <div className="mt-3 flex flex-col gap-2">
            {faqItems.map((item) => (
              <button
                key={item.q}
                className="text-left px-3 py-2 text-sm rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors cursor-pointer"
                onClick={() => handleFaqSelect(item.a)}
                type="button"
              >
                {item.q}
              </button>
            ))}
          </div>
        )}

        {/* Default controls */}
        {mode === 'idle' && (
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                className="flex-1 px-3 py-2 text-sm font-medium rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors cursor-pointer"
                onClick={handleTutorial}
                type="button"
              >
                📖 Tutorial
              </button>
              <button
                className="flex-1 px-3 py-2 text-sm font-medium rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors cursor-pointer"
                onClick={handleTips}
                type="button"
              >
                💡 Tips
              </button>
              <button
                className="flex-1 px-3 py-2 text-sm font-medium rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors cursor-pointer"
                onClick={handleFaq}
                type="button"
              >
                💬 Preguntas
              </button>
            </div>
            <RutiInput onSubmit={handleQuestion} />
            <button
              className="w-full px-3 py-2 text-sm font-medium rounded-lg bg-[#25d366] text-white hover:bg-[#1da851] transition-colors cursor-pointer"
              onClick={handleWhatsApp}
              type="button"
            >
              📱 Contactar por WhatsApp
            </button>
          </div>
        )}
      </RutiPanel>
    </>
  )
}
