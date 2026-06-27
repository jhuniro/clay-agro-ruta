import { useState } from 'react'
import { useBuyerStore } from '../store/buyerStore'
import BuyerMap from './BuyerMap'
import type { OrderStatus } from '../types'

export default function BuyerPurchases() {
  const buyHistory = useBuyerStore(s => s.buyHistory)
  const ratePurchase = useBuyerStore(s => s.ratePurchase)
  
  const [filter, setFilter] = useState<'ALL' | OrderStatus>('ALL')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [ratingVal, setRatingVal] = useState(5)
  const [ratingComment, setRatingComment] = useState('')

  const filtered = filter === 'ALL' ? buyHistory : buyHistory.filter(o => o.status === filter)

  const handleRate = (id: string) => {
    ratePurchase(id, ratingVal, ratingComment)
    setExpandedId(null)
  }

  return (
    <div className="bd-purchases" style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: 16 }}>Mis Compras</h2>
      
      {/* Resumen */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'var(--color-bg-elevated)', padding: 16, borderRadius: 8, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Total Compras</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{buyHistory.length}</div>
        </div>
        <div style={{ background: 'var(--color-bg-elevated)', padding: 16, borderRadius: 8, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>En tránsito</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1d9bf0' }}>
            {buyHistory.filter(o => o.status === 'EN_RUTA').length}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="buyer-chips-container">
        <button className={`buyer-chip ${filter === 'ALL' ? 'active' : ''}`} onClick={() => setFilter('ALL')}>Todas</button>
        <button className={`buyer-chip ${filter === 'EN_RUTA' ? 'active' : ''}`} onClick={() => setFilter('EN_RUTA')}>En tránsito</button>
        <button className={`buyer-chip ${filter === 'VENDIDO_ESPERANDO_TRANSPORTE' ? 'active' : ''}`} onClick={() => setFilter('VENDIDO_ESPERANDO_TRANSPORTE')}>Pendientes</button>
        <button className={`buyer-chip ${filter === 'ENTREGADO' ? 'active' : ''}`} onClick={() => setFilter('ENTREGADO')}>Recibidas</button>
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--color-text-muted)' }}>
          No tienes compras registradas en este estado.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map(order => {
            const isExpanded = expandedId === order.id
            return (
              <div key={order.id} style={{ background: 'var(--color-bg-elevated)', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <div 
                  style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                >
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ fontSize: '2rem' }}>{order.emoji}</div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{order.product}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{order.quantity} {order.unit} • {order.farmerName}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ 
                      padding: '4px 12px', 
                      borderRadius: 20, 
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      background: order.status === 'EN_RUTA' ? 'rgba(29, 155, 240, 0.1)' : order.status === 'ENTREGADO' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                      color: order.status === 'EN_RUTA' ? '#1d9bf0' : order.status === 'ENTREGADO' ? '#22c55e' : '#eab308'
                    }}>
                      {order.status === 'EN_RUTA' ? 'En tránsito' : order.status === 'ENTREGADO' ? 'Entregado' : 'Pendiente'}
                    </div>
                    <span>{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ padding: 16, borderTop: '1px solid var(--color-border)', background: 'rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 24 }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Total Pagado</div>
                        <div style={{ fontWeight: 'bold' }}>S/ {order.price}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Ruta</div>
                        <div style={{ fontWeight: 'bold' }}>{order.origin} → {order.destination}</div>
                      </div>
                      {order.driverName && (
                        <div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Conductor</div>
                          <div style={{ fontWeight: 'bold' }}>{order.driverName} ({order.truckPlate})</div>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                      {/* Timeline */}
                      <div>
                        <h4 style={{ margin: '0 0 16px 0' }}>Actualizaciones</h4>
                        {order.reports && order.reports.length > 0 ? (
                          <div className="buyer-timeline">
                            {order.reports.map((r, i) => (
                              <div key={i} className="buyer-timeline-item">
                                <div className="buyer-timeline-time">{r.time}</div>
                                <div className="buyer-timeline-msg">{r.msg}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>No hay reportes de ruta aún.</div>
                        )}
                        
                        {order.status === 'EN_RUTA' && (
                          <button className="buyer-btn-secondary" style={{ marginTop: 24, width: '100%' }}>
                            💬 Contactar Conductor
                          </button>
                        )}
                      </div>

                      {/* Mapa or Rating */}
                      <div>
                        {order.status === 'ENTREGADO' ? (
                          <div style={{ background: 'var(--color-bg)', padding: 24, borderRadius: 12 }}>
                            <h4 style={{ margin: '0 0 16px 0' }}>Calificar Pedido</h4>
                            {order.rating ? (
                              <div>
                                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{'★'.repeat(order.rating)}{'☆'.repeat(5 - order.rating)}</div>
                                <div>"{order.ratingComment}"</div>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div style={{ display: 'flex', gap: 8 }}>
                                  {[1,2,3,4,5].map(s => (
                                    <span key={s} className={`buyer-star ${ratingVal >= s ? '' : 'inactive'}`} onClick={() => setRatingVal(s)}>★</span>
                                  ))}
                                </div>
                                <input 
                                  style={{ padding: 12, background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', color: 'white', borderRadius: 8 }} 
                                  placeholder="Deja un comentario..."
                                  value={ratingComment}
                                  onChange={e => setRatingComment(e.target.value)}
                                />
                                <button className="buyer-btn-primary" onClick={() => handleRate(order.id)}>Enviar Calificación</button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div style={{ height: 250, borderRadius: 12, overflow: 'hidden' }}>
                            <BuyerMap />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
