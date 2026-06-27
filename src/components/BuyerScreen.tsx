import { useState } from 'react'
import type { Order } from '../types'
import BuyerDashboard from './BuyerDashboard'
import BuyerMarketplace from './BuyerMarketplace'
import BuyerBuyFlow from './BuyerBuyFlow'
import BuyerMap from './BuyerMap'
import AppSidebar from './AppSidebar'
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
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
        <button className="role-topbar__menu" onClick={() => setSidebarOpen(!sidebarOpen)} type="button">
          ☰
        </button>
      </div>

      {/* Sidebar */}
      {sidebarOpen && <div className="fsb-overlay" onClick={() => setSidebarOpen(false)} />}
      <div className={`fsb-wrapper fsb-wrapper--buyer ${sidebarOpen ? 'fsb-wrapper--open' : ''}`}>
        <AppSidebar module="buyer" />
      </div>

      {/* Main content */}
      <div className="buyer-main">
        <div style={{ position: 'relative' }}>
          <svg style={{ position: 'absolute', right: 0, top: -10, pointerEvents: 'none' }} width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 25 Q25 15 50 28 Q75 41 100 25" stroke="rgba(29,155,240,0.08)" strokeWidth="1.5" fill="none"/>
            <path d="M0 35 Q30 25 55 36 Q80 47 100 35" stroke="rgba(29,155,240,0.05)" strokeWidth="1" fill="none"/>
          </svg>
          <h1 className="role-greeting role-greeting--buyer">
            Hola, Carlos 👋
          </h1>
        </div>
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
