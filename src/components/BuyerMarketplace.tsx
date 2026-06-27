import { useState } from 'react'
import type { Order } from '../types'
import { MARKETPLACE_PRODUCTS, CATEGORIES } from '../data/mockData'

interface Props {
  onBuyProduct: (product: Order) => void
}

export default function BuyerMarketplace({ onBuyProduct }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = MARKETPLACE_PRODUCTS.filter(p => {
    const matchCategory = !selectedCategory || p.emoji === CATEGORIES.find(c => c.id === selectedCategory)?.emoji
    const matchSearch = !search || p.product.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="buyer-marketplace">
      {/* Buscador */}
      <div className="marketplace-search">
        <input
          className="marketplace-search__input"
          placeholder="¿Qué buscas hoy?"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Chips de categorías */}
      <div className="marketplace-chips">
        <button
          className={`chip ${!selectedCategory ? 'chip--active' : ''}`}
          onClick={() => setSelectedCategory(null)}
          type="button"
        >
          Todos
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`chip ${selectedCategory === cat.id ? 'chip--active' : ''}`}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            type="button"
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* Feed de productos */}
      <div className="marketplace-feed">
        {filtered.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-card__top">
              <span className="product-card__emoji">{product.emoji}</span>
              <span className={`route-badge route-badge--${product.routeStatus}`}>
                ● Ruta {product.routeStatus}
              </span>
            </div>
            <h3 className="product-card__name">{product.product}</h3>
            <p className="product-card__qty">{product.quantity} {product.unit}</p>
            <div className="product-card__price">
              <span className="product-card__total">S/ {product.price.toLocaleString()}</span>
              <span className="product-card__perkg">S/ {product.pricePerKg}/kg</span>
            </div>
            <p className="product-card__origin">📍 {product.origin} ({product.distanceKm} km)</p>
            <button
              className={`action-btn ${product.routeStatus === 'bloqueada' ? 'action-btn--secondary' : 'action-btn--primary'}`}
              disabled={product.routeStatus === 'bloqueada'}
              onClick={() => onBuyProduct(product)}
              type="button"
            >
              {product.routeStatus === 'bloqueada' ? '🚫 No disponible' : '🤝 Comprar Lote'}
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state__icon">🔍</div>
            <p className="empty-state__text">No se encontraron productos</p>
          </div>
        )}
      </div>
    </div>
  )
}
