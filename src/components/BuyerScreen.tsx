import './RoleScreens.css'

interface Props {
  onBack: () => void
}

export default function BuyerScreen({ onBack }: Props) {
  return (
    <div className="role-screen" aria-label="Pantalla del Comprador">
      <div className="role-topbar">
        <button className="role-topbar__back" onClick={onBack} type="button">
          ← Volver
        </button>
        <span className="role-topbar__title" style={{ color: '#90caf9' }}>🛒 Comprador</span>
      </div>

      <h1 className="role-greeting role-greeting--buyer">
        Hola, comprador 👋
      </h1>
      <p className="role-subtitle">Busca productos y verifica rutas antes de comprar</p>

      {/* Botones de acción */}
      <button className="action-btn action-btn--primary" type="button">
        🔍 Buscar productos
      </button>
      <button className="action-btn action-btn--secondary" type="button">
        📋 Publicar pedido
      </button>

      {/* Productos disponibles */}
      <h2 className="section-title">Productos disponibles</h2>

      <div className="item-card">
        <svg className="item-card__bg" fill="none" viewBox="0 0 342 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#card_blue)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V124C342 132.84 342 136.42 338.42 138.21C334.84 140 327.68 140 313.36 140H28.64C14.32 140 7.16 140 3.58 138.21C0 136.42 0 132.84 0 124V16Z"/>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2="70" x2="342" y1="70" x1="0">
              <stop stop-color="#1a6b9a"/>
              <stop stop-color="#0d4f6e" offset="1"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="item-card__header">
          <span className="item-card__product">🥔 Papa huayro X 500 kg</span>
          <span className="item-card__status item-card__status--libre">Disponible</span>
        </div>
        <div className="item-card__details">
          <span className="item-card__detail">📍 Huamalíes</span>
          <span className="item-card__detail">💰 S/ 1,200</span>
          <span className="item-card__detail">
            <span className="route-badge route-badge--libre">● Ruta libre</span>
          </span>
        </div>
        <div className="item-card__actions">
          <button className="action-btn action-btn--primary" type="button">
            Comprar lote
          </button>
        </div>
      </div>

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
          <span className="item-card__status item-card__status--riesgo">Último lote</span>
        </div>
        <div className="item-card__details">
          <span className="item-card__detail">📍 Lauricocha</span>
          <span className="item-card__detail">💰 S/ 800</span>
          <span className="item-card__detail">
            <span className="route-badge route-badge--riesgo">● Ruta en riesgo</span>
          </span>
        </div>
        <div className="item-card__actions">
          <button className="action-btn action-btn--primary" type="button">
            Comprar lote
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
          <span className="item-card__product">🥑 Aguacate X 150 kg</span>
          <span className="item-card__status item-card__status--bloqueada">No disponible</span>
        </div>
        <div className="item-card__details">
          <span className="item-card__detail">📍 Marañón</span>
          <span className="item-card__detail">💰 S/ 950</span>
          <span className="item-card__detail">
            <span className="route-badge route-badge--bloqueada">● Ruta bloqueada</span>
          </span>
        </div>
        <div className="item-card__actions">
          <button className="action-btn action-btn--secondary" type="button" disabled>
            No disponible
          </button>
        </div>
      </div>

      <div className="item-card">
        <svg className="item-card__bg" fill="none" viewBox="0 0 342 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#card_blue)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V124C342 132.84 342 136.42 338.42 138.21C334.84 140 327.68 140 313.36 140H28.64C14.32 140 7.16 140 3.58 138.21C0 136.42 0 132.84 0 124V16Z"/>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2="70" x2="342" y1="70" x1="0">
              <stop stop-color="#1a6b9a"/>
              <stop stop-color="#0d4f6e" offset="1"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="item-card__header">
          <span className="item-card__product">☕ Café arábica X 100 kg</span>
          <span className="item-card__status item-card__status--libre">Disponible</span>
        </div>
        <div className="item-card__details">
          <span className="item-card__detail">📍 Leoncio Prado</span>
          <span className="item-card__detail">💰 S/ 2,400</span>
          <span className="item-card__detail">
            <span className="route-badge route-badge--libre">● Ruta libre</span>
          </span>
        </div>
        <div className="item-card__actions">
          <button className="action-btn action-btn--primary" type="button">
            Comprar lote
          </button>
        </div>
      </div>
    </div>
  )
}
