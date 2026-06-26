import './RoleScreens.css'

interface Props {
  onBack: () => void
}

export default function TransporterScreen({ onBack }: Props) {
  return (
    <div className="role-screen" aria-label="Pantalla del Transportista">
      <div className="role-topbar">
        <button className="role-topbar__back" onClick={onBack} type="button">
          ← Volver
        </button>
        <span className="role-topbar__title" style={{ color: '#ce93d8' }}>🚛 Transportista</span>
      </div>

      <h1 className="role-greeting role-greeting--transporter">
        Hola, transportista 👋
      </h1>
      <p className="role-subtitle">Revisa la bolsa de cargas y acepta fletes disponibles</p>

      {/* Alerta */}
      <div className="alert-banner alert-banner--danger">
        <svg className="alert-banner__bg" fill="none" viewBox="0 0 342 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#alert_danger)" d="M0 10C0 4.48 0 1.76 2.88 0.88C5.76 0 11.52 0 23 0H319C330.48 0 336.24 0 339.12 0.88C342 1.76 342 4.48 342 10V50C342 55.52 342 58.24 339.12 59.12C336.24 60 330.48 60 319 60H23C11.52 60 5.76 60 2.88 59.12C0 58.24 0 55.52 0 50V10Z"/>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2="30" x2="342" y1="30" x1="0">
              <stop stop-color="#dc3545"/>
              <stop stop-color="#a71d2a" offset="1"/>
            </linearGradient>
          </defs>
        </svg>
        <span className="alert-banner__icon">🚨</span>
        <span>Incidencia reportada: Deslizamiento en la vía Huánuco – Tingo María km 42.</span>
      </div>

      {/* Viaje activo */}
      <h2 className="section-title">Viaje activo</h2>
      <div className="trip-card">
        <svg className="trip-card__bg" fill="none" viewBox="0 0 342 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#card_purple)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V84C342 92.84 342 96.42 338.42 98.21C334.84 100 327.68 100 313.36 100H28.64C14.32 100 7.16 100 3.58 98.21C0 96.42 0 92.84 0 84V16Z"/>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2="50" x2="342" y1="50" x1="0">
              <stop stop-color="#7b3fa0"/>
              <stop stop-color="#5a2d7a" offset="1"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="trip-card__header">
          <span>🚛</span>
          <span>En ruta: Huamalíes → Tingo María</span>
        </div>
        <div className="trip-card__route">
          📍 Origen: Huamalíes &nbsp;|&nbsp; 🏁 Destino: Tingo María
        </div>
        <div className="trip-card__product">
          🥔 Papa huayro – 500 kg – Agricultor: Juan P.
        </div>
      </div>

      {/* Bolsa de cargas */}
      <h2 className="section-title">Bolsa de cargas disponibles</h2>

      <div className="item-card">
        <svg className="item-card__bg" fill="none" viewBox="0 0 342 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#card_orange)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V124C342 132.84 342 136.42 338.42 138.21C334.84 140 327.68 140 313.36 140H28.64C14.32 140 7.16 140 3.58 138.21C0 136.42 0 132.84 0 124V16Z"/>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2="70" x2="342" y1="70" x1="0">
              <stop stop-color="#f5a623"/>
              <stop stop-color="#c97d0a" offset="1"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="item-card__header">
          <span className="item-card__product">🌽 Maíz amarillo X 300 kg</span>
          <span className="item-card__status item-card__status--riesgo">Urgente</span>
        </div>
        <div className="item-card__details">
          <span className="item-card__detail">📍 Lauricocha → Huánuco centro</span>
          <span className="item-card__detail">💰 S/ 600</span>
          <span className="item-card__detail">
            <span className="route-badge route-badge--riesgo">● Ruta en riesgo</span>
          </span>
        </div>
        <div className="item-card__actions">
          <button className="action-btn action-btn--primary" type="button">
            Aceptar flete
          </button>
        </div>
      </div>

      <div className="item-card">
        <svg className="item-card__bg" fill="none" viewBox="0 0 342 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#card_red)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V124C342 132.84 342 136.42 338.42 138.21C334.84 140 327.68 140 313.36 140H28.64C14.32 140 7.16 140 3.58 138.21C0 136.42 0 132.84 0 124V16Z"/>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2="70" x2="342" y1="70" x1="0">
              <stop stop-color="#dc3545"/>
              <stop stop-color="#a71d2a" offset="1"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="item-card__header">
          <span className="item-card__product">☕ Café X 200 kg</span>
          <span className="item-card__status item-card__status--bloqueada">Retrasado</span>
        </div>
        <div className="item-card__details">
          <span className="item-card__detail">📍 Leoncio Prado → Aucayacu</span>
          <span className="item-card__detail">💰 S/ 450</span>
          <span className="item-card__detail">
            <span className="route-badge route-badge--bloqueada">● Ruta bloqueada</span>
          </span>
        </div>
        <div className="item-card__actions">
          <button className="action-btn action-btn--secondary" type="button" disabled>
            Ruta bloqueada
          </button>
        </div>
      </div>

      <div className="item-card">
        <svg className="item-card__bg" fill="none" viewBox="0 0 342 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#card_green)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V124C342 132.84 342 136.42 338.42 138.21C334.84 140 327.68 140 313.36 140H28.64C14.32 140 7.16 140 3.58 138.21C0 136.42 0 132.84 0 124V16Z"/>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2="70" x2="342" y1="70" x1="0">
              <stop stop-color="#2d7a3a"/>
              <stop stop-color="#1e5528" offset="1"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="item-card__header">
          <span className="item-card__product">🥑 Aguacate X 150 kg</span>
          <span className="item-card__status item-card__status--libre">Disponible</span>
        </div>
        <div className="item-card__details">
          <span className="item-card__detail">📍 Marañón → Huánuco centro</span>
          <span className="item-card__detail">💰 S/ 380</span>
          <span className="item-card__detail">
            <span className="route-badge route-badge--libre">● Ruta libre</span>
          </span>
        </div>
        <div className="item-card__actions">
          <button className="action-btn action-btn--primary" type="button">
            Aceptar flete
          </button>
        </div>
      </div>

      {/* Reportar incidencia */}
      <button className="action-btn action-btn--danger" type="button">
        🚨 Reportar incidencia vial
      </button>
    </div>
  )
}
