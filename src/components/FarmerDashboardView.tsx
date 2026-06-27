import FarmerMap from './FarmerMap'
import { useFarmerStore } from '../store/farmerStore'

export default function FarmerDashboardView() {
  const setActiveTab = useFarmerStore(s => s.setActiveTab)

  return (
    <div className="fd-dashboard">
      {/* ─── Top: Clima e Incidentes ─── */}
      <div className="fd-top">
        {/* Weather Widget */}
        <div className="fd-weather">
          <svg className="fd-weather__bg" fill="none" viewBox="0 0 300 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="url(#weather_g_wide)" d="M0 14C0 6.27 0 3.13 3.13 1.57C6.27 0 12.53 0 25.07 0H274.93C287.47 0 293.73 0 296.87 1.57C300 3.13 300 6.27 300 14V106C300 113.73 300 116.87 296.87 118.43C293.73 120 287.47 120 274.93 120H25.07C12.53 120 6.27 120 3.13 118.43C0 116.87 0 113.73 0 106V14Z"/>
            <defs>
              <linearGradient id="weather_g_wide" gradientUnits="userSpaceOnUse" y2="60" x2="300" y1="60" x1="0">
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
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span className="fd-weather__hi">↑ 22°</span>
                <span className="fd-weather__lo">↓ 12°</span>
              </div>
              <span className="fd-weather__icon-big">⛅</span>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="fd-alert-box">
          <span style={{ fontSize: '1.2rem' }}>⚠️</span>
          <span>Bloqueo en Tingo María – La Molina. Desvío por Llacuabamba.</span>
        </div>

        {/* Stats Row */}
        <div className="fd-stats">
          <div className="fd-stat fd-stat--green" onClick={() => setActiveTab('harvests')} style={{ cursor: 'pointer' }}>
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
      </div>

      {/* ─── Bottom: Mapa GPS ─── */}
      <div className="fd-bottom-map">
        <FarmerMap />
      </div>
    </div>
  )
}
