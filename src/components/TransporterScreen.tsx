import AppSidebar from './AppSidebar'
import { useTransporterStore } from '@/stores/transporterStore'
import './RoleScreens.css'

interface Props {
  onBack: () => void
}

export default function TransporterScreen({ onBack }: Props) {
  const { tab, setTab } = useTransporterStore()

  return (
    <div className="transporter-layout" aria-label="Pantalla del Transportista">
      <div className="transporter-topbar">
        <button className="transporter-topbar__back" onClick={onBack} type="button">
          ← Volver
        </button>
        <span className="transporter-topbar__title">🚛 Transportista</span>
      </div>

      {/* Sidebar + Bottom Nav (unified) */}
      <AppSidebar module="transporter" activeTab={tab} onTabChange={setTab} />

      {/* Main content */}
      <main className="transporter-main">
        <h1 className="role-greeting role-greeting--transporter">
          Hola, transportista 👋
        </h1>
        <p className="role-subtitle">Revisa la bolsa de cargas y acepta fletes disponibles</p>

        {/* Alerta */}
        <div className="alert-banner alert-banner--danger">
          <span className="alert-banner__icon">🚨</span>
          <span>Incidencia reportada: Deslizamiento en la vía Huánuco – Tingo María km 42.</span>
        </div>

        {/* Viaje activo */}
        <h2 className="section-title">Viaje activo</h2>
        <div className="trip-card">
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
      </main>
    </div>
  )
}
