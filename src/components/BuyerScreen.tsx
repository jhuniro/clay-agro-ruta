import { useState } from 'react'
import type { Order } from '../types'
import { useBuyerStore } from '../store/buyerStore'
import BuyerSidebar from './BuyerSidebar'
import BuyerDashboard from './BuyerDashboard'
import BuyerMarketplace from './BuyerMarketplace'
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
        {/* Top Header (Optional: Can be extracted to BuyerHeader.tsx if it grows) */}
        <header style={{ padding: '24px 24px 0 24px' }}>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>
            Hola, Carlos 👋
          </h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Busca productos y verifica rutas antes de comprar
          </p>
        </header>

        <div className="buyer-content">
          {activeTab === 'dashboard' && <BuyerDashboard />}
          {activeTab === 'marketplace' && <BuyerMarketplace onBuyProduct={handleBuy} />}
          {activeTab === 'purchases' && (
            <div style={{ padding: 24 }}>
              <h2>Mis Compras</h2>
              <p>Historial de compras en desarrollo...</p>
            </div>
          )}
          {activeTab === 'profile' && (
            <div style={{ padding: 24 }}>
              <h2>Perfil</h2>
              <p>Datos del perfil en desarrollo...</p>
            </div>
          )}
          {activeTab === 'config' && (
            <div style={{ padding: 24 }}>
              <h2>Configuración</h2>
              <p>Ajustes del comprador en desarrollo...</p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showBuyModal && selectedProduct && (
        <BuyerBuyFlow product={selectedProduct} onClose={() => setShowBuyModal(false)} />
      )}
    </div>
  )
}
