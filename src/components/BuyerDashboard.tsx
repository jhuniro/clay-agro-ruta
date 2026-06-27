import { useBuyerStore } from '../store/buyerStore'
import { WEATHER, ROAD_ALERTS } from '../data/mockData'
import BuyerMap from './BuyerMap'
import type { Order } from '../types'

export default function BuyerDashboard() {
  const buyHistory = useBuyerStore(s => s.buyHistory)
  const setActiveTab = useBuyerStore(s => s.setActiveTab)

  const activeOrders = buyHistory.filter(o => o.status !== 'ENTREGADO')
  const inTransitCount = buyHistory.filter(o => o.status === 'EN_RUTA').length
  const waitingCount = buyHistory.filter(o => o.status === 'VENDIDO_ESPERANDO_TRANSPORTE').length
  const receivedCount = buyHistory.filter(o => o.status === 'ENTREGADO').length

  const getStatusText = (status: Order['status']): string => {
    switch (status) {
      case 'VENDIDO_ESPERANDO_TRANSPORTE': return 'Pendiente'
      case 'EN_RUTA': return 'En tránsito'
      case 'ENTREGADO': return 'Recibido'
      default: return ''
    }
  }

  return (
    <div className="bd-dashboard" style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      {/* Alertas */}
      {ROAD_ALERTS.map(alert => (
        <div key={alert.id} style={{
          background: alert.severity === 'danger' ? 'rgba(220, 53, 69, 0.1)' : 'rgba(245, 166, 35, 0.1)',
          border: `1px solid ${alert.severity === 'danger' ? '#dc3545' : '#f5a623'}`,
          color: alert.severity === 'danger' ? '#dc3545' : '#f5a623',
          padding: '12px 16px',
          borderRadius: 8,
          marginBottom: 16,
          fontWeight: 'bold',
          display: 'flex',
          gap: 8
        }}>
          <span>🚨</span> {alert.message}
        </div>
      ))}

      {/* 4 Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'var(--color-bg-elevated)', padding: 16, borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Activos</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1d9bf0' }}>{activeOrders.length}</div>
        </div>
        <div style={{ background: 'var(--color-bg-elevated)', padding: 16, borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>En tránsito</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#22c55e' }}>{inTransitCount}</div>
        </div>
        <div style={{ background: 'var(--color-bg-elevated)', padding: 16, borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Esperando</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#eab308' }}>{waitingCount}</div>
        </div>
        <div style={{ background: 'var(--color-bg-elevated)', padding: 16, borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Recibidos</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#a855f7' }}>{receivedCount}</div>
        </div>
      </div>

      {/* Layout Principal: Mapa + Acciones Rápidas */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 32 }}>
        
        {/* Mapa Preview */}
        <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 16, borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>📍 Mapa General</h3>
            <button className="buyer-btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }} onClick={() => setActiveTab('purchases')}>
              Abrir mapa completo
            </button>
          </div>
          <div style={{ flex: 1, minHeight: 300, position: 'relative' }}>
            {/* The BuyerMap is currently full-screen oriented, we can render it here in a small box */}
            <BuyerMap />
          </div>
        </div>

        {/* Sidebar Derecho: Clima y Acciones */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Tarjeta de Clima */}
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1e40af)', borderRadius: 12, padding: 16, color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{WEATHER.temp}°</div>
                <div style={{ fontSize: '1.1rem' }}>{WEATHER.condition}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: 4 }}>
                  H:{WEATHER.high}° L:{WEATHER.low}° • {WEATHER.city}
                </div>
              </div>
              <div style={{ fontSize: '4rem' }}>{WEATHER.icon}</div>
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 12, padding: 16, border: '1px solid var(--color-border)' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Acciones Rápidas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <button className="buyer-btn-primary" onClick={() => setActiveTab('marketplace')}>Buscar Productos</button>
              <button className="buyer-btn-secondary" onClick={() => setActiveTab('purchases')}>Mis Pedidos</button>
              <button className="buyer-btn-secondary" onClick={() => setActiveTab('purchases')}>Rastrear Envío</button>
              <button className="buyer-btn-secondary" onClick={() => setActiveTab('profile')}>Mi Perfil</button>
            </div>
          </div>
        </div>
      </div>

      {/* Órdenes Activas Grid */}
      <h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Órdenes Activas</h2>
      {activeOrders.length === 0 ? (
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--color-text-muted)', background: 'var(--color-bg-elevated)', borderRadius: 12, border: '1px solid var(--color-border)' }}>
          No hay órdenes activas.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {activeOrders.map(order => (
            <div key={order.id} style={{ background: 'var(--color-bg-elevated)', borderRadius: 12, padding: 16, border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: '1.8rem' }}>{order.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{order.product}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{order.quantity} {order.unit}</div>
                  </div>
                </div>
                <div style={{ 
                  padding: '4px 10px', 
                  borderRadius: 16, 
                  fontSize: '0.75rem', 
                  fontWeight: 'bold',
                  background: order.status === 'EN_RUTA' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                  color: order.status === 'EN_RUTA' ? '#22c55e' : '#eab308'
                }}>
                  {getStatusText(order.status)}
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>
                📍 {order.origin} → {order.destination}
              </div>
              {order.driverName && (
                <div style={{ fontSize: '0.85rem', marginBottom: 12 }}>
                  🚚 {order.driverName} ({order.truckPlate})
                </div>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="buyer-btn-secondary" style={{ flex: 1, padding: '8px' }} onClick={() => setActiveTab('purchases')}>
                  Ver mapa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
