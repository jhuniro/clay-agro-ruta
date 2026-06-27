import { useState } from 'react'
import { MOOD_SVG, MOOD_ALT, TUTORIAL_STEPS, TIPS, FAQ, type RutiMood } from '@/ruti/content'

type Module = 'farmer' | 'buyer' | 'transporter'
type Tab = string

interface NavItem {
  icon: string
  label: string
  tab: Tab
}

interface Props {
  module: Module
  activeTab: string
  onTabChange: (tab: string) => void
  onGoMap?: () => void
}

const NAV_ITEMS: Record<Module, NavItem[]> = {
  farmer: [
    { icon: '🏠', label: 'Inicio', tab: 'inicio' },
    { icon: '🗺️', label: 'Mapa GPS', tab: 'mapa' },
  ],
  buyer: [
    { icon: '🏠', label: 'Inicio', tab: 'inicio' },
    { icon: '🛒', label: 'Mercado', tab: 'mercado' },
  ],
  transporter: [
    { icon: '🏠', label: 'Inicio', tab: 'inicio' },
    { icon: '📦', label: 'Cargas', tab: 'cargas' },
    { icon: '🛣️', label: 'Rutas', tab: 'rutas' },
  ],
}

const ACCENT: Record<Module, string> = {
  farmer: '#00ba7c',
  buyer: '#1d9bf0',
  transporter: '#f5a623',
}

export default function AppSidebar({ module, activeTab, onTabChange, onGoMap }: Props) {
  const [rutiOpen, setRutiOpen] = useState(false)
  const [rutiMood, setRutiMood] = useState<RutiMood>('happy')
  const [rutiMsg, setRutiMsg] = useState('¡Hola! Soy Ruti. Presiona "Tutorial" para que te guíe por esta pantalla.')
  const [tutorialStep, setTutorialStep] = useState(0)
  const [showTips, setShowTips] = useState(false)
  const [showFaq, setShowFaq] = useState(false)

  const steps = TUTORIAL_STEPS[module] || TUTORIAL_STEPS.home
  const tips = TIPS[module] || TIPS.home
  const faqs = FAQ[module] || FAQ.home
  const items = NAV_ITEMS[module]
  const accent = ACCENT[module]

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

  const handleTab = (tab: Tab) => {
    if (tab === 'mapa' && onGoMap) {
      onGoMap()
    }
    onTabChange(tab)
  }

  return (
    <>
      {/* ═══ DESKTOP SIDEBAR ═══ */}
      <aside className="fsb" style={{ '--fsb-accent': accent } as React.CSSProperties}>
        <RutiCard
          rutiOpen={rutiOpen}
          setRutiOpen={setRutiOpen}
          rutiMood={rutiMood}
          rutiMsg={rutiMsg}
          setRutiMsg={setRutiMsg}
          tutorialStep={tutorialStep}
          steps={steps}
          showTips={showTips}
          showFaq={showFaq}
          faqs={faqs}
          startTutorial={startTutorial}
          nextStep={nextStep}
          showTip={showTip}
          showFaqItem={showFaqItem}
        />
        {module === 'farmer' && <FarmerSections onGoMap={onGoMap} />}
        {module === 'buyer' && <BuyerSections />}
        {module === 'transporter' && <TransporterSections />}
      </aside>

      {/* ═══ MOBILE BOTTOM NAV ═══ */}
      <nav className="fsb-bottomnav" style={{ '--fsb-accent': accent } as React.CSSProperties}>
        {items.map((item) => (
          <button
            key={item.tab}
            className={`fsb-bottomnav__btn ${activeTab === item.tab ? 'fsb-bottomnav__btn--active' : ''}`}
            onClick={() => handleTab(item.tab)}
            type="button"
          >
            <span className="fsb-bottomnav__icon">{item.icon}</span>
            <span className="fsb-bottomnav__label">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   RUTI CARD (shared)
   ═══════════════════════════════════════════════════════════════════════════════ */
function RutiCard({
  rutiOpen, setRutiOpen, rutiMood, rutiMsg, setRutiMsg, tutorialStep, steps,
  showTips, showFaq, faqs, startTutorial, nextStep, showTip, showFaqItem,
}: {
  rutiOpen: boolean
  setRutiOpen: (v: boolean) => void
  rutiMood: RutiMood
  rutiMsg: string
  setRutiMsg: (msg: string) => void
  tutorialStep: number
  steps: string[]
  showTips: boolean
  showFaq: boolean
  faqs: { q: string; a: string }[]
  startTutorial: () => void
  nextStep: () => void
  showTip: () => void
  showFaqItem: () => void
}) {
  return (
    <div className="fsb-ruti">
      <div className="fsb-ruti__header" onClick={() => setRutiOpen(!rutiOpen)}>
        <img src={MOOD_SVG[rutiMood]} alt={MOOD_ALT[rutiMood]} className="fsb-ruti__avatar" />
        <div className="fsb-ruti__info">
          <span className="fsb-ruti__name">Ruti</span>
          <span className="fsb-ruti__role">Tu asistente</span>
        </div>
        <span className={`fsb-ruti__chevron ${rutiOpen ? 'fsb-ruti__chevron--open' : ''}`}>▼</span>
      </div>
      {rutiOpen && (
        <div className="fsb-ruti__body">
          <p className="fsb-ruti__msg">{rutiMsg}</p>
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
          {showTips && (
            <div className="fsb-ruti__actions">
              <button className="fsb-ruti__btn fsb-ruti__btn--secondary" onClick={showTip} type="button">
                💡 Otro tip
              </button>
            </div>
          )}
          {showFaq && (
            <div className="fsb-ruti__faq-list">
              {faqs.map((f, i) => (
                <button key={i} className="fsb-ruti__faq-q" onClick={() => { setRutiOpen(true); setRutiMsg(f.a) }} type="button">
                  {f.q}
                </button>
              ))}
            </div>
          )}
          <div className="fsb-ruti__links">
            <button className="fsb-ruti__link" onClick={showTip} type="button">💡 Tips</button>
            <button className="fsb-ruti__link" onClick={showFaqItem} type="button">❓ FAQ</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   FARMER SECTIONS
   ═══════════════════════════════════════════════════════════════════════════════ */
function FarmerSections({ onGoMap }: { onGoMap?: () => void }) {
  return (
    <>
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
      <div className="fsb-section">
        <h3 className="fsb-section__title">📡 GPS</h3>
        <div className="fsb-gps">
          <div className="fsb-gps__indicator fsb-gps__indicator--on" />
          <span className="fsb-gps__txt">GPS activo</span>
          <button className="fsb-gps__btn" onClick={onGoMap} type="button">Ver mapa →</button>
        </div>
      </div>
      <div className="fsb-section">
        <h3 className="fsb-section__title">⚡ Acciones</h3>
        <div className="fsb-actions">
          <button className="fsb-action" type="button"><span>📦</span> Vender</button>
          <button className="fsb-action" type="button"><span>🚛</span> Transporte</button>
          <button className="fsb-action" type="button"><span>⚠️</span> Alerta</button>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   BUYER SECTIONS
   ═══════════════════════════════════════════════════════════════════════════════ */
function BuyerSections() {
  return (
    <>
      <div className="fsb-section">
        <h3 className="fsb-section__title">📋 Mis Pedidos</h3>
        <div className="fsb-section__items">
          <div className="fsb-item fsb-item--blue">
            <span className="fsb-item__dot" />
            <span className="fsb-item__txt">Papa 500kg — En ruta</span>
            <span className="fsb-item__badge">🚚</span>
          </div>
          <div className="fsb-item fsb-item--yellow">
            <span className="fsb-item__dot" />
            <span className="fsb-item__txt">Maíz 300kg — Esperando</span>
            <span className="fsb-item__badge">⏳</span>
          </div>
        </div>
      </div>
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
      <div className="fsb-section">
        <h3 className="fsb-section__title">🛒 Mercado</h3>
        <div className="fsb-section__items">
          <div className="fsb-item fsb-item--green">
            <span className="fsb-item__dot" />
            <span className="fsb-item__txt">Productos disponibles</span>
            <span className="fsb-item__badge">12</span>
          </div>
          <div className="fsb-item fsb-item--blue">
            <span className="fsb-item__dot" />
            <span className="fsb-item__txt">Rutas activas</span>
            <span className="fsb-item__badge">8</span>
          </div>
        </div>
      </div>
      <div className="fsb-section">
        <h3 className="fsb-section__title">⚡ Acciones</h3>
        <div className="fsb-actions">
          <button className="fsb-action" type="button"><span>🛒</span> Comprar</button>
          <button className="fsb-action" type="button"><span>🗺️</span> Rastrear</button>
          <button className="fsb-action" type="button"><span>📊</span> Historial</button>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   TRANSPORTER SECTIONS
   ═══════════════════════════════════════════════════════════════════════════════ */
function TransporterSections() {
  return (
    <>
      <div className="fsb-section">
        <h3 className="fsb-section__title">🚛 Viaje Activo</h3>
        <div className="fsb-trip">
          <div className="fsb-trip__header">
            <span className="fsb-trip__status fsb-trip__status--active">En ruta</span>
          </div>
          <div className="fsb-trip__route">
            <span>📍 Huamalíes</span>
            <span>→</span>
            <span>🏁 Tingo María</span>
          </div>
          <div className="fsb-trip__product">🥔 Papa huayro — 500 kg</div>
          <div className="fsb-trip__eta">ETA: 2h 15min</div>
          <div className="fd-ship__progress">
            <div className="fd-ship__progress-bar" style={{ width: '62%' }} />
          </div>
        </div>
      </div>
      <div className="fsb-section">
        <h3 className="fsb-section__title">📦 Cargas Disponibles</h3>
        <div className="fsb-section__items">
          <div className="fsb-item fsb-item--yellow">
            <span className="fsb-item__dot" />
            <span className="fsb-item__txt">Maíz 300kg — S/ 600</span>
            <span className="fsb-item__badge">⚠️</span>
          </div>
          <div className="fsb-item fsb-item--red">
            <span className="fsb-item__dot" />
            <span className="fsb-item__txt">Café 200kg — S/ 450</span>
            <span className="fsb-item__badge">🚫</span>
          </div>
          <div className="fsb-item fsb-item--green">
            <span className="fsb-item__dot" />
            <span className="fsb-item__txt">Aguacate 150kg — S/ 380</span>
            <span className="fsb-item__badge">✅</span>
          </div>
        </div>
      </div>
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
      <div className="fsb-section">
        <h3 className="fsb-section__title">⚡ Acciones</h3>
        <div className="fsb-actions">
          <button className="fsb-action" type="button"><span>🚨</span> Reportar</button>
          <button className="fsb-action" type="button"><span>🗺️</span> Navegar</button>
          <button className="fsb-action" type="button"><span>📞</span> Contactar</button>
        </div>
      </div>
    </>
  )
}
