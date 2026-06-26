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
        <svg className="weather-card__bg" fill="none" viewBox="0 0 342 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#grad_weather)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V84C342 92.84 342 96.42 338.42 98.21C334.84 100 327.68 100 313.36 100H28.64C14.32 100 7.16 100 3.58 98.21C0 96.42 0 92.84 0 84V16Z"/>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2="50" x2="342" y1="50" x1="0">
              <stop stop-color="#1a6b9a"/>
              <stop stop-color="#0d4f6e" offset="1"/>
            </linearGradient>
          </defs>
        </svg>
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
          <svg className="alert-banner__bg" fill="none" viewBox="0 0 342 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill={`url(#grad_${alert.severity})`} d="M0 10C0 4.48 0 1.76 2.88 0.88C5.76 0 11.52 0 23 0H319C330.48 0 336.24 0 339.12 0.88C342 1.76 342 4.48 342 10V50C342 55.52 342 58.24 339.12 59.12C336.24 60 330.48 60 319 60H23C11.52 60 5.76 60 2.88 59.12C0 58.24 0 55.52 0 50V10Z"/>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" y2="30" x2="342" y1="30" x1="0">
                <stop stop-color={alert.severity === 'danger' ? '#dc3545' : '#f5a623'}/>
                <stop stop-color={alert.severity === 'danger' ? '#a71d2a' : '#c97d0a'} offset="1"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="alert-banner__icon">🚨</span>
          <span>{alert.message}</span>
        </div>
      ))}

      {/* Mis Pedidos Activos */}
      <h2 className="section-title">Mis Pedidos Activos</h2>

      {activeOrders.map(order => (
        <div key={order.id} className="item-card">
          <svg className="item-card__bg" fill="none" viewBox="0 0 342 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill={`url(#grad_${order.routeStatus})`} d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V104C342 112.84 342 116.42 338.42 118.21C334.84 120 327.68 120 313.36 120H28.64C14.32 120 7.16 120 3.58 118.21C0 116.42 0 112.84 0 104V16Z"/>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" y2="60" x2="342" y1="60" x1="0">
                <stop stop-color={order.routeStatus === 'libre' ? '#2d7a3a' : order.routeStatus === 'riesgo' ? '#f5a623' : '#dc3545'}/>
                <stop stop-color={order.routeStatus === 'libre' ? '#1e5528' : order.routeStatus === 'riesgo' ? '#c97d0a' : '#a71d2a'} offset="1"/>
              </linearGradient>
            </defs>
          </svg>
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
