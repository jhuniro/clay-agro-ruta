import FarmerMap from './FarmerMap'
import FarmerAlerts from './FarmerAlerts'
import AppSidebar from './AppSidebar'
import { useFarmerStore } from '@/stores/farmerStore'
import './FarmerScreen.css'

interface Props {
  onBack: () => void
}

export default function FarmerScreen({ onBack }: Props) {
  const { tab, setTab } = useFarmerStore()

  const handleGoMap = () => setTab('mapa')

  return (
    <div className="farmer-layout" aria-label="Pantalla del Agricultor">
      {/* ─── Top Bar ─── */}
      <header className="farmer-topbar">
        <button className="farmer-topbar__back" onClick={onBack} type="button">
          ← Volver
        </button>
        <div className="farmer-topbar__brand">
          <span className="farmer-topbar__icon">🌱</span>
          <span className="farmer-topbar__name">Agricultor</span>
        </div>
        <div className="farmer-topbar__avatar">JG</div>
      </header>

      {/* ─── Sidebar + Bottom Nav (unified) ─── */}
      <AppSidebar module="farmer" activeTab={tab} onTabChange={setTab} onGoMap={handleGoMap} />

      {/* ─── Content ─── */}
      <main className="farmer-main">
        {tab === 'inicio' && <FarmerDashboard onGoMap={handleGoMap} />}
        {tab === 'mapa' && <FarmerMap />}
      </main>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   DASHBOARD — Grid responsive
   ═══════════════════════════════════════════════════════════════════════════════ */
function FarmerDashboard({ onGoMap }: { onGoMap: () => void }) {
  return (
    <div className="fd">
      {/* ─── Greeting ─── */}
      <div className="fd-greeting">
        <svg className="fd-greeting__deco" width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 30 Q30 20 60 35 Q90 50 120 30" stroke="rgba(0,186,124,0.08)" strokeWidth="1.5" fill="none"/>
          <path d="M0 40 Q40 30 70 42 Q100 54 120 40" stroke="rgba(0,186,124,0.05)" strokeWidth="1" fill="none"/>
        </svg>
        <div>
          <h1 className="fd-greeting__title">Hola, Juan 👋</h1>
          <p className="fd-greeting__sub">Gestiona tus cosechas y revisa las rutas</p>
        </div>
      </div>

      {/* ─── Alert Banner ─── */}
      <div className="fd-alert">
        <span className="fd-alert__icon">⚠️</span>
        <span className="fd-alert__txt">Bloqueo en Tingo María – La Molina. Desvío por Llacuabamba.</span>
      </div>

      {/* ─── Stats Row ─── */}
      <div className="fd-stats">
        <div className="fd-stat fd-stat--green">
          <span className="fd-stat__num">3</span>
          <span className="fd-stat__label">Envíos activos</span>
        </div>
        <div className="fd-stat fd-stat--blue">
          <span className="fd-stat__num">1</span>
          <span className="fd-stat__label">Ruta libre</span>
        </div>
        <div className="fd-stat fd-stat--yellow">
          <span className="fd-stat__num">1</span>
          <span className="fd-stat__label">En riesgo</span>
        </div>
        <div className="fd-stat fd-stat--red">
          <span className="fd-stat__num">1</span>
          <span className="fd-stat__label">Bloqueada</span>
        </div>
      </div>

      {/* ─── Main Grid: Map + Sidebar ─── */}
      <div className="fd-grid">
        <div className="fd-map-preview">
          <div className="fd-map-preview__header">
            <h2 className="fd-section-title">📍 Ruta activa</h2>
            <button className="fd-link-btn" onClick={onGoMap} type="button">Ver mapa completo →</button>
          </div>
          <div className="fd-map-preview__box">
            <FarmerMap compact />
          </div>
        </div>
        <div className="fd-sidebar">
          <div className="fd-weather">
            <div className="fd-weather__content">
              <div className="fd-weather__left">
                <span className="fd-weather__temp">18°</span>
                <span className="fd-weather__cond">Parcial nublado</span>
                <span className="fd-weather__city">Huánuco, Perú</span>
              </div>
              <div className="fd-weather__right">
                <span className="fd-weather__hi">↑ 22°</span>
                <span className="fd-weather__lo">↓ 12°</span>
                <span className="fd-weather__icon-big">⛅</span>
              </div>
            </div>
          </div>
          <div className="fd-actions">
            <h2 className="fd-section-title">Acciones</h2>
            <div className="fd-actions__grid">
              <button className="fd-action-card" type="button">
                <span className="fd-action-card__icon">📦</span>
                <span className="fd-action-card__txt">Vender<br/>Cosecha</span>
              </button>
              <button className="fd-action-card" type="button">
                <span className="fd-action-card__icon">🚛</span>
                <span className="fd-action-card__txt">Buscar<br/>Transporte</span>
              </button>
              <button className="fd-action-card" type="button">
                <span className="fd-action-card__icon">⚠️</span>
                <span className="fd-action-card__txt">Reportar<br/>Bloqueo</span>
              </button>
              <button className="fd-action-card" type="button">
                <span className="fd-action-card__icon">📊</span>
                <span className="fd-action-card__txt">Mis<br/>Ventas</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Alert & Match Transportistas ─── */}
      <FarmerAlerts />

      {/* ─── Shipments ─── */}
      <div className="fd-shipments">
        <h2 className="fd-section-title">Mis Envíos</h2>
        <div className="fd-shipments__grid">
          <div className="fd-ship">
            <div className="fd-ship__inner">
              <div className="fd-ship__row fd-ship__row--top">
                <span className="fd-ship__emoji">🥔</span>
                <div>
                  <span className="fd-ship__product">Papa</span>
                  <span className="fd-ship__qty">500 kg</span>
                </div>
                <span className="fd-badge fd-badge--green">En tránsito</span>
              </div>
              <div className="fd-ship__row">
                <span className="fd-ship__route">📍 Huamalíes → Tingo María</span>
              </div>
              <div className="fd-ship__row fd-ship__row--bottom">
                <span className="fd-ship__driver">🚛 Carlos M.</span>
                <span className="fd-ship__eta">ETA: 2h</span>
              </div>
              <div className="fd-ship__progress">
                <div className="fd-ship__progress-bar" style={{ width: '62%' }} />
              </div>
            </div>
          </div>

          <div className="fd-ship">
            <div className="fd-ship__inner">
              <div className="fd-ship__row fd-ship__row--top">
                <span className="fd-ship__emoji">🌽</span>
                <div>
                  <span className="fd-ship__product">Maíz amarillo</span>
                  <span className="fd-ship__qty">300 kg</span>
                </div>
                <span className="fd-badge fd-badge--yellow">Pendiente</span>
              </div>
              <div className="fd-ship__row">
                <span className="fd-ship__route">📍 Lauricocha → Huánuco centro</span>
              </div>
              <div className="fd-ship__row fd-ship__row--bottom">
                <span className="fd-ship__driver">🔍 Buscando transportista</span>
              </div>
              <div className="fd-ship__progress">
                <div className="fd-ship__progress-bar fd-ship__progress-bar--pending" style={{ width: '10%' }} />
              </div>
            </div>
          </div>

          <div className="fd-ship">
            <div className="fd-ship__inner">
              <div className="fd-ship__row fd-ship__row--top">
                <span className="fd-ship__emoji">☕</span>
                <div>
                  <span className="fd-ship__product">Café</span>
                  <span className="fd-ship__qty">200 kg</span>
                </div>
                <span className="fd-badge fd-badge--red">Retrasado</span>
              </div>
              <div className="fd-ship__row">
                <span className="fd-ship__route">📍 Leoncio Prado → Aucayacu</span>
              </div>
              <div className="fd-ship__row fd-ship__row--bottom">
                <span className="fd-ship__driver">⚠️ Huaico km 42</span>
                <span className="fd-ship__eta fd-ship__eta--red">+4h retraso</span>
              </div>
              <div className="fd-ship__progress">
                <div className="fd-ship__progress-bar fd-ship__progress-bar--blocked" style={{ width: '35%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
