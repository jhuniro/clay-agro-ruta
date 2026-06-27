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
  const inTransit = MY_ORDERS.filter(o => o.status === 'EN_RUTA')
  const delivered = MY_ORDERS.filter(o => o.status === 'ENTREGADO')

  return (
    <div className="bd">
      {/* ─── Greeting ─── */}
      <div className="bd-greeting">
        <svg className="bd-greeting__deco" width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 30 Q30 20 60 35 Q90 50 120 30" stroke="rgba(29,155,240,0.08)" strokeWidth="1.5" fill="none"/>
          <path d="M0 40 Q40 30 70 42 Q100 54 120 40" stroke="rgba(29,155,240,0.05)" strokeWidth="1" fill="none"/>
        </svg>
        <div>
          <h1 className="bd-greeting__title">Hola, Carlos 👋</h1>
          <p className="bd-greeting__sub">Busca productos y verifica rutas antes de comprar</p>
        </div>
      </div>

      {/* ─── Alert Banner ─── */}
      {ROAD_ALERTS.length > 0 && (
        <div className="bd-alert">
          <span className="bd-alert__icon">🚨</span>
          <span className="bd-alert__txt">{ROAD_ALERTS[0].message}</span>
        </div>
      )}

      {/* ─── Stats Row ─── */}
      <div className="bd-stats">
        <div className="bd-stat bd-stat--blue">
          <span className="bd-stat__num">{activeOrders.length}</span>
          <span className="bd-stat__label">Pedidos activos</span>
        </div>
        <div className="bd-stat bd-stat--green">
          <span className="bd-stat__num">{inTransit.length}</span>
          <span className="bd-stat__label">En tránsito</span>
        </div>
        <div className="bd-stat bd-stat--yellow">
          <span className="bd-stat__num">{MY_ORDERS.filter(o => o.status === 'VENDIDO_ESPERANDO_TRANSPORTE').length}</span>
          <span className="bd-stat__label">Esperando</span>
        </div>
        <div className="bd-stat bd-stat--purple">
          <span className="bd-stat__num">{delivered.length}</span>
          <span className="bd-stat__label">Recibidos</span>
        </div>
      </div>

      {/* ─── Main Grid: Map + Sidebar ─── */}
      <div className="bd-grid">
        <div className="bd-map-preview">
          <div className="bd-map-preview__header">
            <h2 className="bd-section-title">🗺️ Ruta de entrega</h2>
          </div>
          <div className="bd-map-preview__box">
            <div className="bd-map-placeholder">
              <span className="bd-map-placeholder__icon">🗺️</span>
              <span className="bd-map-placeholder__txt">Selecciona un pedido activo para ver la ruta en el mapa</span>
            </div>
          </div>
        </div>
        <div className="bd-sidebar">
          <div className="bd-weather">
            <div className="bd-weather__content">
              <div className="bd-weather__left">
                <span className="bd-weather__temp">{WEATHER.temp}°</span>
                <span className="bd-weather__cond">{WEATHER.condition}</span>
                <span className="bd-weather__city">{WEATHER.city}</span>
              </div>
              <div className="bd-weather__right">
                <span className="bd-weather__hi">↑ {WEATHER.high}°</span>
                <span className="bd-weather__lo">↓ {WEATHER.low}°</span>
                <span className="bd-weather__icon-big">{WEATHER.icon}</span>
              </div>
            </div>
          </div>
          <div className="bd-actions">
            <h2 className="bd-section-title">Acciones</h2>
            <div className="bd-actions__grid">
              <button className="bd-action-card" type="button">
                <span className="bd-action-card__icon">🛒</span>
                <span className="bd-action-card__txt">Buscar<br/>Productos</span>
              </button>
              <button className="bd-action-card" type="button">
                <span className="bd-action-card__icon">📋</span>
                <span className="bd-action-card__txt">Mis<br/>Pedidos</span>
              </button>
              <button className="bd-action-card" type="button">
                <span className="bd-action-card__icon">🗺️</span>
                <span className="bd-action-card__txt">Rastrear<br/>Envío</span>
              </button>
              <button className="bd-action-card" type="button">
                <span className="bd-action-card__icon">📊</span>
                <span className="bd-action-card__txt">Historial<br/>Compras</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Active Orders ─── */}
      <div className="bd-orders">
        <h2 className="bd-section-title">Mis Pedidos Activos</h2>
        <div className="bd-orders__grid">
          {activeOrders.map(order => (
            <div key={order.id} className="bd-order">
              <div className="bd-order__row bd-order__row--top">
                <span className="bd-order__emoji">{order.emoji}</span>
                <div>
                  <span className="bd-order__product">{order.product}</span>
                  <span className="bd-order__qty">{order.quantity}{order.unit}</span>
                </div>
                <span className={`bd-badge bd-badge--${order.routeStatus === 'libre' ? 'green' : order.routeStatus === 'riesgo' ? 'yellow' : 'red'}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
              <div className="bd-order__row">
                <span className="bd-order__route">📍 {order.origin} → {order.destination}</span>
              </div>
              <div className="bd-order__row bd-order__row--bottom">
                {order.status === 'VENDIDO_ESPERANDO_TRANSPORTE' && (
                  <span className="bd-order__driver">🔍 Buscando camión...</span>
                )}
                {order.status === 'EN_RUTA' && order.truckPlate && (
                  <span className="bd-order__driver">🚚 Placa: {order.truckPlate}</span>
                )}
                {order.status === 'EN_RUTA' && (
                  <button className="bd-order__map-btn" onClick={() => onShowMap(order)} type="button">
                    🗺️ Ver mapa
                  </button>
                )}
              </div>
              <div className="bd-order__progress">
                <div
                  className={`bd-order__progress-bar ${order.status === 'VENDIDO_ESPERANDO_TRANSPORTE' ? 'bd-order__progress-bar--pending' : order.routeStatus === 'bloqueada' ? 'bd-order__progress-bar--blocked' : ''}`}
                  style={{ width: order.status === 'ENTREGADO' ? '100%' : order.status === 'EN_RUTA' ? '60%' : '10%' }}
                />
              </div>
            </div>
          ))}

          {activeOrders.length === 0 && (
            <div className="bd-empty">
              <span className="bd-empty__icon">📦</span>
              <p className="bd-empty__txt">No tienes pedidos activos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
