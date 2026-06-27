import { useState } from 'react'
import { MOOD_SVG, MOOD_ALT, TUTORIAL_STEPS, TIPS, FAQ, type RutiMood } from '@/ruti/content'

type Module = 'farmer' | 'buyer' | 'transporter'

interface Props {
  module: Module
  onGoMap?: () => void
}

export default function AppSidebar({ module, onGoMap }: Props) {
  const [rutiOpen, setRutiOpen] = useState(false)
  const [rutiMood, setRutiMood] = useState<RutiMood>('happy')
  const [rutiMsg, setRutiMsg] = useState('¡Hola! Soy Ruti. Presiona "Tutorial" para que te guíe por esta pantalla.')
  const [tutorialStep, setTutorialStep] = useState(0)
  const [showTips, setShowTips] = useState(false)
  const [showFaq, setShowFaq] = useState(false)

  const steps = TUTORIAL_STEPS[module] || TUTORIAL_STEPS.home
  const tips = TIPS[module] || TIPS.home
  const faqs = FAQ[module] || FAQ.home

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
      <div className="fsb-ruti" style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setRutiOpen(!rutiOpen)}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', background: '#1e293b', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={MOOD_SVG[rutiMood]}
              alt={MOOD_ALT[rutiMood]}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Ruti 
              <span style={{ fontSize: '10px', background: '#3b82f6', color: 'white', padding: '2px 6px', borderRadius: '10px' }}>AI</span>
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Tu asistente</div>
          </div>
          <span style={{ color: '#6b7280', fontSize: '12px' }}>{rutiOpen ? '▲' : '▼'}</span>
        </div>

        {rutiOpen && (
          <div className="fsb-ruti__body" style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
            <p className="fsb-ruti__msg" style={{ fontSize: '13px', color: '#e5e5e5', margin: '0 0 12px 0' }}>{rutiMsg}</p>

            {!showTips && !showFaq && (
              <div className="fsb-ruti__actions" style={{ display: 'flex', gap: '8px' }}>
                <button className="fsb-ruti__btn fsb-ruti__btn--primary" onClick={startTutorial} type="button" style={{ flex: 1, padding: '6px', fontSize: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  🎓 Tutorial
                </button>
                {tutorialStep > 0 && tutorialStep < steps.length && (
                  <button className="fsb-ruti__btn fsb-ruti__btn--secondary" onClick={nextStep} type="button" style={{ flex: 1, padding: '6px', fontSize: '12px', background: 'transparent', color: '#e5e5e5', border: '1px solid #4b5563', borderRadius: '4px', cursor: 'pointer' }}>
                    Siguiente ➔
                  </button>
                )}
              </div>
            )}

            {showTips && (
              <div className="fsb-ruti__actions">
                <button className="fsb-ruti__btn fsb-ruti__btn--secondary" onClick={showTip} type="button" style={{ width: '100%', padding: '6px', fontSize: '12px', background: 'transparent', color: '#e5e5e5', border: '1px solid #4b5563', borderRadius: '4px', cursor: 'pointer' }}>
                  💡 Otro tip
                </button>
              </div>
            )}

            {showFaq && (
              <div className="fsb-ruti__faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {faqs.map((f, i) => (
                  <button
                    key={i}
                    className="fsb-ruti__faq-q"
                    onClick={() => {
                      setRutiMood('explaining')
                      setRutiMsg(f.a)
                    }}
                    type="button"
                    style={{ textAlign: 'left', padding: '8px', fontSize: '12px', background: 'rgba(255,255,255,0.05)', color: '#e5e5e5', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    {f.q}
                  </button>
                ))}
              </div>
            )}

            <div className="fsb-ruti__links" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
              <button className="fsb-ruti__link" onClick={showTip} type="button" style={{ padding: '4px', fontSize: '11px', background: 'transparent', color: '#9ca3af', border: 'none', cursor: 'pointer' }}>💡 Tips</button>
              <button className="fsb-ruti__link" onClick={showFaqItem} type="button" style={{ padding: '4px', fontSize: '11px', background: 'transparent', color: '#9ca3af', border: 'none', cursor: 'pointer' }}>❓ FAQ</button>
            </div>
          </div>
        )}
      </div>

      {/* ─── Module-specific sections ─── */}
      {module === 'farmer' && <FarmerSections onGoMap={onGoMap} />}
      {module === 'buyer' && <BuyerSections />}
      {module === 'transporter' && <TransporterSections onGoMap={onGoMap} />}
    </aside>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   FARMER SECTIONS
   ═══════════════════════════════════════════════════════════════════════════════ */
function FarmerSections({ onGoMap }: { onGoMap?: () => void }) {
  return (
    <>
      {/* Envíos */}
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

      {/* Rutas */}
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

      {/* GPS */}
      <div className="fsb-section">
        <h3 className="fsb-section__title">📡 GPS</h3>
        <div className="fsb-gps">
          <div className="fsb-gps__indicator fsb-gps__indicator--on" />
          <span className="fsb-gps__txt">GPS activo</span>
          <button className="fsb-gps__btn" onClick={onGoMap} type="button">Ver mapa →</button>
        </div>
      </div>

      {/* Acciones */}
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
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   BUYER SECTIONS
   ═══════════════════════════════════════════════════════════════════════════════ */
function BuyerSections() {
  return (
    <>
      {/* Pedidos activos */}
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

      {/* Rutas */}
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

      {/* Mercado */}
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

      {/* Acciones */}
      <div className="fsb-section">
        <h3 className="fsb-section__title">⚡ Acciones</h3>
        <div className="fsb-actions">
          <button className="fsb-action" type="button">
            <span>🛒</span> Comprar
          </button>
          <button className="fsb-action" type="button">
            <span>🗺️</span> Rastrear
          </button>
          <button className="fsb-action" type="button">
            <span>📊</span> Historial
          </button>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   TRANSPORTER SECTIONS
   ═══════════════════════════════════════════════════════════════════════════════ */
import { useTransporterStore } from '../store/transporterStore'

function TransporterSections({ onGoMap }: { onGoMap?: () => void }) {
  const { viajeActivo, estadoViaje, progresoViaje, cargasDisponibles } = useTransporterStore()
  return (
    <>
      {/* Viaje activo */}
      <div style={{ marginTop: '16px' }}>
        <h3 style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>
          <span>🚛</span> VIAJE ACTIVO
        </h3>
        {!viajeActivo ? (
          <div style={{ color: '#9ca3af', fontSize: '12px', fontStyle: 'italic', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
            Acepta un flete disponible.
          </div>
        ) : (
          <div style={{ background: 'rgba(0, 0, 0, 0.4)', borderRadius: '8px', padding: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ display: 'inline-block', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>
              {estadoViaje === 'entregado' ? 'Entregado' : 'Carga Aceptada'}
            </span>
            <div style={{ color: '#e5e5e5', fontSize: '12px', marginBottom: '6px' }}>
              📍 {viajeActivo.origen.substring(0, 12)} → 🏁 {viajeActivo.destino.substring(0, 12)}
            </div>
            <div style={{ color: '#a3a3a3', fontSize: '11px', marginBottom: '10px' }}>
              {viajeActivo.producto} — {viajeActivo.kg} kg
            </div>
            <div style={{ color: '#c084fc', fontSize: '12px', fontWeight: 'bold' }}>
              ETA: {viajeActivo.duracionEstimadaMin} min
            </div>
            {['en_ruta', 'ruta_alterna'].includes(estadoViaje) && (
              <div className="fd-ship__progress" style={{ marginTop: '12px', background: 'rgba(255,255,255,0.1)', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                <div className="fd-ship__progress-bar" style={{ width: `${progresoViaje}%`, height: '100%', background: estadoViaje === 'ruta_alterna' ? '#3b82f6' : '#22c55e', transition: 'width 0.5s ease' }} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bolsa de cargas */}
      <div style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>
          <span>📦</span> CARGAS (RESUMEN)
        </h3>
        <div style={{ background: 'rgba(0, 0, 0, 0.4)', borderRadius: '8px', padding: '12px', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e5e5e5', fontSize: '12px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#eab308' }} />
            Total disponibles
          </div>
          <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '13px' }}>{cargasDisponibles.length}</span>
        </div>
      </div>

      {/* Rutas (basadas en disponibles) */}
      <div style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>
          <span>🗺️</span> RUTAS DE CARGAS
        </h3>
        <div style={{ background: 'rgba(0, 0, 0, 0.4)', borderRadius: '8px', padding: '8px', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {cargasDisponibles.map(carga => (
            <button 
              className="fsb-route" 
              key={carga.id} 
              onClick={() => {
                if(onGoMap) onGoMap();
                window.dispatchEvent(new CustomEvent('toast:show', { detail: `Mostrando ruta de ${carga.origen}` }));
              }} 
              type="button" 
              style={{ background: 'transparent', border: 'none', padding: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', cursor: 'pointer', borderRadius: '4px' }}
            >
              <span className="fsb-route__name" style={{ color: '#e5e5e5', fontSize: '12px' }}>{carga.origen.substring(0,10)} → {carga.destino.substring(0,10)}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: carga.estadoRuta === 'libre' ? '#22c55e' : (carga.estadoRuta === 'riesgo' ? '#f5a623' : '#ef4444') }} />
                <span style={{ color: carga.estadoRuta === 'libre' ? '#22c55e' : (carga.estadoRuta === 'riesgo' ? '#f5a623' : '#ef4444'), fontSize: '10px', fontWeight: 'bold' }}>{carga.estadoRuta}</span>
              </div>
            </button>
          ))}
          {cargasDisponibles.length === 0 && (
             <div style={{ color: '#a3a3a3', fontSize: '11px', textAlign: 'center', padding: '12px' }}>No hay rutas disponibles.</div>
          )}
        </div>
      </div>
    </>
  )
}
