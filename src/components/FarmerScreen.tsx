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
