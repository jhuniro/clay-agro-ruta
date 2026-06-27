import { useState } from 'react'
import type { Order } from '../types'
import { useBuyerStore } from '../store/buyerStore'
import { BUYER_PROFILE } from '../data/mockData'
import BuyerSidebar from './BuyerSidebar'
import BuyerDashboard from './BuyerDashboard'
import BuyerMarketplace from './BuyerMarketplace'
import BuyerPurchases from './BuyerPurchases'
import BuyerProfile from './BuyerProfile'
import BuyerConfig from './BuyerConfig'
import BuyerBuyFlow from './BuyerBuyFlow'
import './BuyerScreen.css'

interface Props {
  onBack: () => void
}

export default function BuyerScreen({ onBack }: Props) {
  const activeTab = useBuyerStore(s => s.activeTab)
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Order | null>(null)

  const handleBuy = (product: Order) => {
    setSelectedProduct(product)
    setShowBuyModal(true)
  }

  return (
    <div className="buyer-layout" aria-label="Pantalla del Comprador">
      {/* Sidebar Navigation */}
      <BuyerSidebar onBack={onBack} />

      {/* Main Content Area */}
      <main className="buyer-main">
        {/* Top Header */}
        <header style={{ padding: '24px 24px 0 24px' }}>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>
            Hola, {BUYER_PROFILE.name.split(' ')[0]} 👋
          </h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Busca productos y verifica rutas antes de comprar
          </p>
        </header>

        <div className="buyer-content">
          {activeTab === 'dashboard' && <BuyerDashboard />}
          {activeTab === 'marketplace' && <BuyerMarketplace onBuyProduct={handleBuy} />}
          {activeTab === 'purchases' && <BuyerPurchases />}
          {activeTab === 'profile' && <BuyerProfile />}
          {activeTab === 'config' && <BuyerConfig />}
        </div>
      </main>

      {/* Modals */}
      {showBuyModal && selectedProduct && (
        <BuyerBuyFlow product={selectedProduct} onClose={() => setShowBuyModal(false)} />
      )}
    </div>
  )
}
