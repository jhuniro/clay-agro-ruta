import { useState } from 'react'
import FarmerMap from './FarmerMap'
import FarmerAlerts from './FarmerAlerts'
import AppSidebar from './AppSidebar'
import './FarmerScreen.css'

interface Props {
  onBack: () => void
}

type SubView = 'dashboard' | 'map'

export default function FarmerScreen({ onBack }: Props) {
  const [subView, setSubView] = useState<SubView>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleGoMap = () => setSubView('map')

  return (
    <div className="farmer" aria-label="Pantalla del Agricultor">
      {/* ─── Top Bar ─── */}
      <header className="farmer-topbar">
        <button className="farmer-topbar__back" onClick={onBack} type="button">
          ← Volver
        </button>
        <div className="farmer-topbar__brand">
          <span className="farmer-topbar__icon">🌱</span>
          <span className="farmer-topbar__name">Agricultor</span>
        </div>
        <button className="farmer-topbar__menu" onClick={() => setSidebarOpen(!sidebarOpen)} type="button">
          ☰
        </button>
        <div className="farmer-topbar__avatar">JG</div>
      </header>

      {/* ─── Sidebar ─── */}
      {sidebarOpen && <div className="fsb-overlay" onClick={() => setSidebarOpen(false)} />}
      <div className={`fsb-wrapper ${sidebarOpen ? 'fsb-wrapper--open' : ''}`}>
        <AppSidebar module="farmer" onGoMap={handleGoMap} />
      </div>

      {/* ─── Content ─── */}
      <div className="farmer-scroll">
        {subView === 'dashboard' && <FarmerDashboard onGoMap={handleGoMap} />}
        {subView === 'map' && <FarmerMap />}
      </div>

      {/* ─── Bottom Nav ─── */}
      <nav className="farmer-nav">
        <button
          className={`farmer-nav__btn ${subView === 'dashboard' ? 'farmer-nav__btn--active' : ''}`}
          onClick={() => setSubView('dashboard')}
          type="button"
        >
          <span className="farmer-nav__icon">🏠</span>
          <span className="farmer-nav__label">Inicio</span>
        </button>
        <button
          className={`farmer-nav__btn ${subView === 'map' ? 'farmer-nav__btn--active' : ''}`}
          onClick={() => setSubView('map')}
          type="button"
        >
          <span className="farmer-nav__icon">🗺️</span>
          <span className="farmer-nav__label">Mapa GPS</span>
        </button>
      </nav>
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
        {/* Left: Map preview */}
        <div className="fd-map-preview">
          <div className="fd-map-preview__header">
            <h2 className="fd-section-title">📍 Ruta activa</h2>
            <button className="fd-link-btn" onClick={onGoMap} type="button">Ver mapa completo →</button>
          </div>
          <div className="fd-map-preview__box">
            <FarmerMap compact />
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="fd-sidebar">
          {/* Weather Widget */}
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

          {/* Quick Actions */}
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

          {/* Card 1 — En tránsito */}
          <div className="fd-ship">
            <svg className="fd-ship__bg" fill="none" viewBox="0 0 342 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="url(#ship_g)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V124C342 132.84 342 136.42 338.42 138.21C334.84 140 327.68 140 313.36 140H28.64C14.32 140 7.16 140 3.58 138.21C0 136.42 0 132.84 0 124V16Z"/>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" y2="70" x2="342" y1="70" x1="0">
                  <stop stopColor="#2d7a3a"/><stop offset="1" stopColor="#1e5528"/>
                </linearGradient>
              </defs>
            </svg>
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
              {/* Progress bar */}
              <div className="fd-ship__progress">
                <div className="fd-ship__progress-bar" style={{ width: '62%' }} />
              </div>
            </div>
          </div>

          {/* Card 2 — Pendiente */}
          <div className="fd-ship">
            <svg className="fd-ship__bg" fill="none" viewBox="0 0 342 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="url(#ship_y)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V124C342 132.84 342 136.42 338.42 138.21C334.84 140 327.68 140 313.36 140H28.64C14.32 140 7.16 140 3.58 138.21C0 136.42 0 132.84 0 124V16Z"/>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" y2="70" x2="342" y1="70" x1="0">
                  <stop stopColor="#f5a623"/><stop offset="1" stopColor="#c97d0a"/>
                </linearGradient>
              </defs>
            </svg>
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

          {/* Card 3 — Retrasado */}
          <div className="fd-ship">
            <svg className="fd-ship__bg" fill="none" viewBox="0 0 342 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="url(#ship_r)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V124C342 132.84 342 136.42 338.42 138.21C334.84 140 327.68 140 313.36 140H28.64C14.32 140 7.16 140 3.58 138.21C0 136.42 0 132.84 0 124V16Z"/>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" y2="70" x2="342" y1="70" x1="0">
                  <stop stopColor="#dc3545"/><stop offset="1" stopColor="#a71d2a"/>
                </linearGradient>
              </defs>
            </svg>
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
