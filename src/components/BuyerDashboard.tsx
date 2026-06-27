import type { Order } from '../types'
import { MY_ORDERS, WEATHER, ROAD_ALERTS } from '../data/mockData'

interface Props {
  onShowMap: (order: Order) => void
}

function getStatusText(status: Order['status']): string {
  switch (status) {
    case 'VENDIDO_ESPERANDO_TRANSPORTE': return 'Esperando transporte'
    case 'EN_RUTA': return 'En ruta'
    case 'ENTREGADO': return 'Entregado'
    default: return ''
  }
}

export default function BuyerDashboard({ onShowMap }: Props) {
  const activeOrders = MY_ORDERS.filter(o => o.status !== 'ENTREGADO')

  return (
    <div className="buyer-dashboard">
      {/* Clima */}
      <div className="weather-card">
        <div className="weather-card__icon">{WEATHER.icon}</div>
        <div className="weather-card__main">
          <span className="weather-card__temp">{WEATHER.temp}°</span>
          <div className="weather-card__info">
            <span className="weather-card__range">H:{WEATHER.high}° L:{WEATHER.low}°</span>
            <span className="weather-card__city">{WEATHER.city}</span>
          </div>
        </div>
        <span className="weather-card__condition">{WEATHER.condition}</span>
      </div>

      {/* Alertas viales */}
      {ROAD_ALERTS.map(alert => (
        <div key={alert.id} className={`alert-banner alert-banner--${alert.severity}`}>
          <span className="alert-banner__icon">🚨</span>
          <span>{alert.message}</span>
        </div>
      ))}

      {/* Mis Pedidos Activos */}
      <h2 className="section-title">Mis Pedidos Activos</h2>

      {activeOrders.map(order => (
        <div key={order.id} className="item-card">
          <div className="item-card__header">
            <span className="item-card__product">{order.emoji} {order.quantity}{order.unit} de {order.product}</span>
            <span className={`item-card__status item-card__status--${order.routeStatus}`}>
              {getStatusText(order.status)}
            </span>
          </div>
          <div className="item-card__details">
            <span className="item-card__detail">📍 {order.origin} → {order.destination}</span>
            {order.status === 'VENDIDO_ESPERANDO_TRANSPORTE' && (
              <span className="item-card__detail">🔍 Buscando camión...</span>
            )}
            {order.status === 'EN_RUTA' && order.truckPlate && (
              <span className="item-card__detail">🚚 Placa: {order.truckPlate}</span>
            )}
            <span className="item-card__detail">
              <span className={`route-badge route-badge--${order.routeStatus}`}>● Ruta {order.routeStatus}</span>
            </span>
          </div>
          {order.status === 'EN_RUTA' && (
            <div className="item-card__actions">
              <button className="action-btn action-btn--primary" onClick={() => onShowMap(order)} type="button">
                🗺️ Ver en mapa
              </button>
            </div>
          )}
        </div>
      ))}

      {activeOrders.length === 0 && (
        <div className="empty-state">
          <div className="empty-state__icon">📦</div>
          <p className="empty-state__text">No tienes pedidos activos</p>
        </div>
      )}
    </div>
  )
}
