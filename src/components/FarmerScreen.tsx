import { useState } from 'react'
import FarmerMap from './FarmerMap'
import FarmerAlerts from './FarmerAlerts'
import FarmerSidebar from './FarmerSidebar'
import './FarmerScreen.css'

interface Props {
  onBack: () => void
}

type SubView = 'dashboard' | 'map'

export default function FarmerScreen({ onBack }: Props) {
  const [subView, setSubView] = useState<SubView>('dashboard')

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
        <div className="farmer-topbar__avatar">JG</div>
      </header>

      {/* ─── Sidebar (desktop only) ─── */}
      <FarmerSidebar onGoMap={handleGoMap} />

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
        <div>
          <h1 className="fd-greeting__title">Hola, Juan 👋</h1>
          <p className="fd-greeting__sub">Gestiona tus cosechas y revisa las rutas</p>
        </div>
      </div>

      {/* ─── Alert Banner ─── */}
      <div className="fd-alert">
        <svg className="fd-alert__bg" fill="none" viewBox="0 0 342 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#alert_w)" d="M0 10C0 4.48 0 1.76 2.88 0.88C5.76 0 11.52 0 23 0H319C330.48 0 336.24 0 339.12 0.88C342 1.76 342 4.48 342 10V50C342 55.52 342 58.24 339.12 59.12C336.24 60 330.48 60 319 60H23C11.52 60 5.76 60 2.88 59.12C0 58.24 0 55.52 0 50V10Z"/>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2="30" x2="342" y1="30" x1="0">
              <stop stopColor="#f5a623"/>
              <stop offset="1" stopColor="#c97d0a"/>
            </linearGradient>
          </defs>
        </svg>
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
            <svg className="fd-weather__bg" fill="none" viewBox="0 0 300 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="url(#weather_g)" d="M0 14C0 6.27 0 3.13 3.13 1.57C6.27 0 12.53 0 25.07 0H274.93C287.47 0 293.73 0 296.87 1.57C300 3.13 300 6.27 300 14V106C300 113.73 300 116.87 296.87 118.43C293.73 120 287.47 120 274.93 120H25.07C12.53 120 6.27 120 3.13 118.43C0 116.87 0 113.73 0 106V14Z"/>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" y2="60" x2="300" y1="60" x1="0">
                  <stop stopColor="#1a5276"/>
                  <stop offset="1" stopColor="#154360"/>
                </linearGradient>
              </defs>
            </svg>
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
