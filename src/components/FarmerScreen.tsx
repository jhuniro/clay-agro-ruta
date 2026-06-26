import './RoleScreens.css'

interface Props {
  onBack: () => void
}

export default function FarmerScreen({ onBack }: Props) {
  return (
    <div className="role-screen" aria-label="Pantalla del Agricultor">
      <div className="role-topbar">
        <button className="role-topbar__back" onClick={onBack} type="button">
          ← Volver
        </button>
        <span className="role-topbar__title" style={{ color: '#a8e6b0' }}>🌱 Agricultor</span>
      </div>

      <h1 className="role-greeting role-greeting--farmer">
        Hola, agricultor 👋
      </h1>
      <p className="role-subtitle">Gestiona tus cosechas y revisa el estado de las rutas</p>

      {/* Alerta vial */}
      <div className="alert-banner alert-banner--warning">
        <svg className="alert-banner__bg" fill="none" viewBox="0 0 342 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#alert_warning)" d="M0 10C0 4.48 0 1.76 2.88 0.88C5.76 0 11.52 0 23 0H319C330.48 0 336.24 0 339.12 0.88C342 1.76 342 4.48 342 10V50C342 55.52 342 58.24 339.12 59.12C336.24 60 330.48 60 319 60H23C11.52 60 5.76 60 2.88 59.12C0 58.24 0 55.52 0 50V10Z"/>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2="30" x2="342" y1="30" x1="0">
              <stop stop-color="#f5a623"/>
              <stop stop-color="#c97d0a" offset="1"/>
            </linearGradient>
          </defs>
        </svg>
        <span className="alert-banner__icon">⚠️</span>
        <span>Alerta: Bloqueo en ruta Tingo María – La Molina. Desvío disponible por Llacuabamba.</span>
      </div>

      {/* Botón principal */}
      <button className="action-btn action-btn--primary" type="button">
        + Vender Cosecha
      </button>

      {/* Mis Envíos */}
      <h2 className="section-title">Mis Envíos</h2>

      <div className="item-card">
        <svg className="item-card__bg" fill="none" viewBox="0 0 342 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#card_green)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V104C342 112.84 342 116.42 338.42 118.21C334.84 120 327.68 120 313.36 120H28.64C14.32 120 7.16 120 3.58 118.21C0 116.42 0 112.84 0 104V16Z"/>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2="60" x2="342" y1="60" x1="0">
              <stop stop-color="#2d7a3a"/>
              <stop stop-color="#1e5528" offset="1"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="item-card__header">
          <span className="item-card__product">🥔 Papa X 500 kg</span>
          <span className="item-card__status item-card__status--libre">En tránsito</span>
        </div>
        <div className="item-card__details">
          <span className="item-card__detail">📍 Huamalíes → Tingo María</span>
          <span className="item-card__detail">🚛 Transportista: Carlos M.</span>
          <span className="item-card__detail">
            <span className="route-badge route-badge--libre">● Ruta libre</span>
          </span>
        </div>
      </div>

      <div className="item-card">
        <svg className="item-card__bg" fill="none" viewBox="0 0 342 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#card_orange)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V104C342 112.84 342 116.42 338.42 118.21C334.84 120 327.68 120 313.36 120H28.64C14.32 120 7.16 120 3.58 118.21C0 116.42 0 112.84 0 104V16Z"/>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2="60" x2="342" y1="60" x1="0">
              <stop stop-color="#f5a623"/>
              <stop stop-color="#c97d0a" offset="1"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="item-card__header">
          <span className="item-card__product">🌽 Maíz amarillo X 300 kg</span>
          <span className="item-card__status item-card__status--riesgo">Pendiente</span>
        </div>
        <div className="item-card__details">
          <span className="item-card__detail">📍 Lauricocha → Huánuco centro</span>
          <span className="item-card__detail">🔍 Buscando transportista</span>
          <span className="item-card__detail">
            <span className="route-badge route-badge--riesgo">● Ruta en riesgo</span>
          </span>
        </div>
      </div>

      <div className="item-card">
        <svg className="item-card__bg" fill="none" viewBox="0 0 342 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#card_red)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V104C342 112.84 342 116.42 338.42 118.21C334.84 120 327.68 120 313.36 120H28.64C14.32 120 7.16 120 3.58 118.21C0 116.42 0 112.84 0 104V16Z"/>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2="60" x2="342" y1="60" x1="0">
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
          <span className="item-card__detail">⚠️ Huaico reportado en km 42</span>
          <span className="item-card__detail">
            <span className="route-badge route-badge--bloqueada">● Ruta bloqueada</span>
          </span>
        </div>
      </div>
    </div>
  )
}
