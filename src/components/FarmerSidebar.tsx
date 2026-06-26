import { useState } from 'react'
import { MOOD_SVG, MOOD_ALT, TUTORIAL_STEPS, TIPS, FAQ, type RutiMood } from '@/ruti/content'

interface FarmerSidebarProps {
  onGoMap: () => void
}

export default function FarmerSidebar({ onGoMap }: FarmerSidebarProps) {
  const [rutiOpen, setRutiOpen] = useState(false)
  const [rutiMood, setRutiMood] = useState<RutiMood>('happy')
  const [rutiMsg, setRutiMsg] = useState('¡Hola! Soy Ruti. Presiona "Tutorial" para que te guíe por esta pantalla.')
  const [tutorialStep, setTutorialStep] = useState(0)
  const [showTips, setShowTips] = useState(false)
  const [showFaq, setShowFaq] = useState(false)

  const steps = TUTORIAL_STEPS.farmer
  const tips = TIPS.farmer
  const faqs = FAQ.farmer

  const startTutorial = () => {
    setRutiOpen(true)
    setRutiMood('explaining')
    setRutiMsg('Voy a guiarte por esta pantalla. Paso 1:')
    setTutorialStep(0)
    setShowTips(false)
    setShowFaq(false)
  }

  const nextStep = () => {
    const next = tutorialStep + 1
    if (next < steps.length) {
      setTutorialStep(next)
      setRutiMsg(`Paso ${next + 1}: ${steps[next]}`)
    } else {
      setRutiMood('excited')
      setRutiMsg('¡Tutorial completado! Ya puedes usar la app.')
    }
  }

  const showTip = () => {
    setRutiOpen(true)
    setShowTips(true)
    setShowFaq(false)
    setRutiMood('explaining')
    const idx = Math.floor(Math.random() * tips.length)
    setRutiMsg(tips[idx])
  }

  const showFaqItem = () => {
    setRutiOpen(true)
    setShowFaq(true)
    setShowTips(false)
    setRutiMood('waiting')
    setRutiMsg('Elige una pregunta:')
  }

  return (
    <aside className="fsb">
      {/* ─── Ruti Tutorial Card ─── */}
      <div className="fsb-ruti">
        <div className="fsb-ruti__header" onClick={() => setRutiOpen(!rutiOpen)}>
          <img
            src={MOOD_SVG[rutiMood]}
            alt={MOOD_ALT[rutiMood]}
            className="fsb-ruti__avatar"
          />
          <div className="fsb-ruti__info">
            <span className="fsb-ruti__name">Ruti</span>
            <span className="fsb-ruti__role">Tu asistente</span>
          </div>
          <span className={`fsb-ruti__chevron ${rutiOpen ? 'fsb-ruti__chevron--open' : ''}`}>▼</span>
        </div>

        {rutiOpen && (
          <div className="fsb-ruti__body">
            <p className="fsb-ruti__msg">{rutiMsg}</p>

            {/* Tutorial controls */}
            {!showTips && !showFaq && (
              <div className="fsb-ruti__actions">
                <button className="fsb-ruti__btn fsb-ruti__btn--primary" onClick={startTutorial} type="button">
                  📖 Tutorial
                </button>
                {tutorialStep > 0 && tutorialStep < steps.length && (
                  <button className="fsb-ruti__btn fsb-ruti__btn--secondary" onClick={nextStep} type="button">
                    Siguiente →
                  </button>
                )}
              </div>
            )}

            {/* Tips */}
            {showTips && (
              <div className="fsb-ruti__actions">
                <button className="fsb-ruti__btn fsb-ruti__btn--secondary" onClick={showTip} type="button">
                  💡 Otro tip
                </button>
              </div>
            )}

            {/* FAQ */}
            {showFaq && (
              <div className="fsb-ruti__faq-list">
                {faqs.map((f, i) => (
                  <button
                    key={i}
                    className="fsb-ruti__faq-q"
                    onClick={() => {
                      setRutiMood('explaining')
                      setRutiMsg(f.a)
                    }}
                    type="button"
                  >
                    {f.q}
                  </button>
                ))}
              </div>
            )}

            {/* Quick links */}
            <div className="fsb-ruti__links">
              <button className="fsb-ruti__link" onClick={showTip} type="button">💡 Tips</button>
              <button className="fsb-ruti__link" onClick={showFaqItem} type="button">❓ FAQ</button>
            </div>
          </div>
        )}
      </div>

      {/* ─── Resumen de Envíos ─── */}
      <div className="fsb-section">
        <h3 className="fsb-section__title">📦 Envíos</h3>
        <div className="fsb-section__items">
          <div className="fsb-item fsb-item--green">
            <span className="fsb-item__dot" />
            <span className="fsb-item__txt">Papa — En tránsito</span>
            <span className="fsb-item__badge">62%</span>
          </div>
          <div className="fsb-item fsb-item--yellow">
            <span className="fsb-item__dot" />
            <span className="fsb-item__txt">Maíz — Pendiente</span>
            <span className="fsb-item__badge">10%</span>
          </div>
          <div className="fsb-item fsb-item--red">
            <span className="fsb-item__dot" />
            <span className="fsb-item__txt">Café — Retrasado</span>
            <span className="fsb-item__badge">35%</span>
          </div>
        </div>
      </div>

      {/* ─── Estado de Rutas ─── */}
      <div className="fsb-section">
        <h3 className="fsb-section__title">🛣️ Rutas</h3>
        <div className="fsb-section__items">
          <div className="fsb-route">
            <span className="fsb-route__name">Huamalíes → Tingo María</span>
            <span className="fsb-route__status fsb-route__status--libre">● Libre</span>
          </div>
          <div className="fsb-route">
            <span className="fsb-route__name">Lauricocha → Hco. centro</span>
            <span className="fsb-route__status fsb-route__status--riesgo">● Riesgo</span>
          </div>
          <div className="fsb-route">
            <span className="fsb-route__name">Leoncio Prado → Aucayacu</span>
            <span className="fsb-route__status fsb-route__status--bloqueada">● Bloqueada</span>
          </div>
        </div>
      </div>

      {/* ─── GPS Status ─── */}
      <div className="fsb-section">
        <h3 className="fsb-section__title">📡 GPS</h3>
        <div className="fsb-gps">
          <div className="fsb-gps__indicator fsb-gps__indicator--on" />
          <span className="fsb-gps__txt">GPS activo</span>
          <button className="fsb-gps__btn" onClick={onGoMap} type="button">Ver mapa →</button>
        </div>
      </div>

      {/* ─── Quick Actions ─── */}
      <div className="fsb-section">
        <h3 className="fsb-section__title">⚡ Acciones</h3>
        <div className="fsb-actions">
          <button className="fsb-action" type="button">
            <span>📦</span> Vender
          </button>
          <button className="fsb-action" type="button">
            <span>🚛</span> Transporte
          </button>
          <button className="fsb-action" type="button">
            <span>⚠️</span> Alerta
          </button>
        </div>
      </div>
    </aside>
  )
}
