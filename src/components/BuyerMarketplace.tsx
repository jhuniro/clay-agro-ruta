import { useState } from 'react'
import type { Order } from '../types'
import { MARKETPLACE_PRODUCTS, CATEGORIES } from '../data/mockData'

interface Props {
  onBuyProduct: (product: Order) => void
}

export default function BuyerMarketplace({ onBuyProduct }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'precio_bajo' | 'precio_alto' | 'ventas'>('precio_bajo')
  
  const [expandedProduct, setExpandedProduct] = useState<Order | null>(null)

  let filtered = MARKETPLACE_PRODUCTS.filter(p => {
    const matchCategory = !selectedCategory || p.categoryId === selectedCategory
    const matchSearch = !search || p.product.toLowerCase().includes(search.toLowerCase()) || p.farmerName.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  // Ordenamiento
  filtered = filtered.sort((a, b) => {
    if (sortBy === 'precio_bajo') return a.price - b.price
    if (sortBy === 'precio_alto') return b.price - a.price
    return 0 // "ventas" no está en mockOrder, así que lo omitimos
  })

  return (
    <div className="bd-producers" style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      
      {/* Cabecera */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        <input
          style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 8, color: 'white' }}
          placeholder="¿Qué producto o agricultor buscas?"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div className="buyer-chips-container" style={{ margin: 0, padding: 0 }}>
            <button className={`buyer-chip ${!selectedCategory ? 'active' : ''}`} onClick={() => setSelectedCategory(null)}>Todos</button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`buyer-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>
          
          <select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value as any)}
            style={{ background: 'var(--color-bg-elevated)', color: 'white', border: '1px solid var(--color-border)', padding: '8px 12px', borderRadius: 8 }}
          >
            <option value="precio_bajo">Precio: Más bajo</option>
            <option value="precio_alto">Precio: Más alto</option>
            <option value="ventas">Más vendidos</option>
          </select>
        </div>
        
        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Mostrando {filtered.length} de {MARKETPLACE_PRODUCTS.length} productos disponibles
        </div>
      </div>

      {/* Grid de Productos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.map(product => (
          <div key={product.id} style={{ background: 'var(--color-bg-elevated)', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setExpandedProduct(product)}>
            {/* Cabecera de la tarjeta */}
            <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1e40af)', padding: 24, textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 12, right: 12 }}>
                <span style={{ 
                  padding: '4px 10px', 
                  borderRadius: 16, 
                  fontSize: '0.75rem', 
                  fontWeight: 'bold',
                  background: product.routeStatus === 'libre' ? 'rgba(34, 197, 94, 0.2)' : product.routeStatus === 'riesgo' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(220, 53, 69, 0.2)',
                  color: product.routeStatus === 'libre' ? '#4ade80' : product.routeStatus === 'riesgo' ? '#fde047' : '#f87171'
                }}>
                  ● Ruta {product.routeStatus}
                </span>
              </div>
              <div style={{ fontSize: '4rem' }}>{product.emoji}</div>
            </div>
            
            <div style={{ padding: 16 }}>
              <h3 style={{ margin: '0 0 8px 0' }}>{product.product}</h3>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 16 }}>
                👨‍🌾 {product.farmerName} • 📍 {product.origin}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#1d9bf0' }}>S/ {product.price.toLocaleString()}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>S/ {product.pricePerKg}/kg • {product.quantity}{product.unit}</div>
                </div>
              </div>

              <button 
                className="buyer-btn-primary" 
                style={{ width: '100%', background: product.routeStatus === 'bloqueada' ? 'var(--color-border)' : '#1d9bf0' }}
                disabled={product.routeStatus === 'bloqueada'}
                onClick={(e) => {
                  e.stopPropagation()
                  if (product.routeStatus !== 'bloqueada') onBuyProduct(product)
                }}
              >
                {product.routeStatus === 'bloqueada' ? '🚫 Ruta Bloqueada' : 'Comprar Lote'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--color-text-muted)', background: 'var(--color-bg-elevated)', borderRadius: 12, border: '1px solid var(--color-border)' }}>
          No se encontraron productos para esta búsqueda.
        </div>
      )}

      {/* Modal Productor Expandido */}
      {expandedProduct && (
        <div className="buyer-modal-overlay" onClick={() => setExpandedProduct(null)}>
          <div className="buyer-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
            <button className="buyer-modal-close" onClick={() => setExpandedProduct(null)}>✕</button>
            
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: '4rem' }}>{expandedProduct.emoji}</div>
              <div>
                <h2 style={{ margin: '0 0 4px 0' }}>{expandedProduct.product}</h2>
                <div style={{ color: 'var(--color-text-muted)' }}>👨‍🌾 Agricultor: {expandedProduct.farmerName}</div>
              </div>
            </div>

            <div style={{ background: 'var(--color-bg)', padding: 16, borderRadius: 8, fontSize: '0.95rem' }}>
              {expandedProduct.description}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: 'var(--color-bg)', padding: 16, borderRadius: 8 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>Ubicación y Ruta</div>
                <div style={{ fontWeight: 'bold' }}>📍 {expandedProduct.origin}</div>
                <div style={{ fontSize: '0.85rem' }}>Distancia: {expandedProduct.distanceKm} km</div>
                <div style={{ marginTop: 8, color: expandedProduct.routeStatus === 'libre' ? '#4ade80' : expandedProduct.routeStatus === 'riesgo' ? '#fde047' : '#f87171' }}>
                  Estado de ruta: {expandedProduct.routeStatus}
                </div>
              </div>
              <div style={{ background: 'var(--color-bg)', padding: 16, borderRadius: 8 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>Detalles de Venta</div>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#1d9bf0' }}>S/ {expandedProduct.price.toLocaleString()}</div>
                <div style={{ fontSize: '0.85rem' }}>Cantidad: {expandedProduct.quantity}{expandedProduct.unit}</div>
                <div style={{ fontSize: '0.85rem' }}>Precio/Kg: S/ {expandedProduct.pricePerKg}</div>
              </div>
            </div>

            <div style={{ background: 'var(--color-bg)', padding: 16, borderRadius: 8 }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Información Comercial</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.9rem' }}>
                <div><strong>Horarios de entrega:</strong> {expandedProduct.deliverySchedule}</div>
                <div>
                  <strong>Métodos de pago:</strong> 
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    {expandedProduct.paymentMethods?.map(pm => (
                      <span key={pm} style={{ background: 'var(--color-bg-elevated)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--color-border)' }}>{pm}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button className="buyer-btn-secondary" style={{ flex: 1 }} onClick={() => window.open(`https://wa.me/${expandedProduct.farmerPhone}`, '_blank')}>
                💬 WhatsApp
              </button>
              <button className="buyer-btn-secondary" style={{ flex: 1 }} onClick={() => window.open(`tel:${expandedProduct.farmerPhone}`)}>
                📞 Llamar
              </button>
              <button 
                className="buyer-btn-primary" 
                style={{ flex: 2 }}
                disabled={expandedProduct.routeStatus === 'bloqueada'}
                onClick={() => {
                  setExpandedProduct(null)
                  onBuyProduct(expandedProduct)
                }}
              >
                {expandedProduct.routeStatus === 'bloqueada' ? 'Ruta Bloqueada' : 'Comprar Lote'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
