import { useState } from 'react'
import type { Order } from '../types'
import BuyerDashboard from './BuyerDashboard'
import BuyerMarketplace from './BuyerMarketplace'
import BuyerBuyFlow from './BuyerBuyFlow'
import BuyerMap from './BuyerMap'
import './BuyerScreen.css'

interface Props {
  onBack: () => void
}

type SubView = 'dashboard' | 'marketplace'

export default function BuyerScreen({ onBack }: Props) {
  const [subView, setSubView] = useState<SubView>('dashboard')
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Order | null>(null)
  const [showMap, setShowMap] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const handleBuy = (product: Order) => {
    setSelectedProduct(product)
    setShowBuyModal(true)
  }

  const handleShowMap = (order: Order) => {
    setSelectedOrder(order)
    setShowMap(true)
  }

  return (
    <div className="buyer-screen" aria-label="Pantalla del Comprador">
      {/* Header */}
      <div className="role-topbar">
        <button className="role-topbar__back" onClick={onBack} type="button">
          ← Volver
        </button>
        <span className="role-topbar__title" style={{ color: '#90caf9' }}>🛒 Comprador</span>
      </div>

      <h1 className="role-greeting role-greeting--buyer">
        Hola, Carlos 👋
      </h1>
      <p className="role-subtitle">Busca productos y verifica rutas antes de comprar</p>

      {/* Contenido */}
      <div className="buyer-content">
        {subView === 'dashboard' && (
          <BuyerDashboard onShowMap={handleShowMap} />
        )}
        {subView === 'marketplace' && (
          <BuyerMarketplace onBuyProduct={handleBuy} />
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="buyer-bottomnav">
        <button
          className={`buyer-bottomnav__btn ${subView === 'dashboard' ? 'buyer-bottomnav__btn--active' : ''}`}
          onClick={() => setSubView('dashboard')}
          type="button"
        >
          <span className="buyer-bottomnav__icon">🏠</span>
          <span className="buyer-bottomnav__label">Inicio</span>
        </button>
        <button
          className={`buyer-bottomnav__btn ${subView === 'marketplace' ? 'buyer-bottomnav__btn--active' : ''}`}
          onClick={() => setSubView('marketplace')}
          type="button"
        >
          <span className="buyer-bottomnav__icon">🛒</span>
          <span className="buyer-bottomnav__label">Mercado</span>
        </button>
      </nav>

      {/* Modales */}
      {showBuyModal && selectedProduct && (
        <BuyerBuyFlow product={selectedProduct} onClose={() => setShowBuyModal(false)} />
      )}
      {showMap && selectedOrder && (
        <BuyerMap order={selectedOrder} onClose={() => setShowMap(false)} />
      )}
    </div>
  )
}
