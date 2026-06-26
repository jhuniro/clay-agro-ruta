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
