import { useState } from 'react'
import type { Order } from '../types'
import { useBuyerStore } from '../store/buyerStore'
import { BUYER_PROFILE } from '../data/mockData'

interface Props {
  product: Order
  onClose: () => void
}

type BuyStep = 'confirm' | 'processing' | 'success'

export default function BuyerBuyFlow({ product, onClose }: Props) {
  const [step, setStep] = useState<BuyStep>('confirm')
  const [selectedPayment, setSelectedPayment] = useState(product.paymentMethods?.[0] || 'Efectivo')
  
  const addPurchase = useBuyerStore(s => s.addPurchase)
  const setActiveTab = useBuyerStore(s => s.setActiveTab)

  const handleConfirm = () => {
    setStep('processing')
    setTimeout(() => {
      // Registrar la compra en el store
      addPurchase({
        ...product,
        status: 'VENDIDO_ESPERANDO_TRANSPORTE',
        routeStatus: 'libre',
        reports: [{ time: new Date().toLocaleTimeString(), msg: 'Compra confirmada, buscando transportista.' }]
      })
      setStep('success')
    }, 1500)
  }

  return (
    <div className="buyer-modal-overlay" onClick={step !== 'processing' ? onClose : undefined}>
      <div className="buyer-modal-card" onClick={e => e.stopPropagation()}>
        {step !== 'processing' && (
          <button className="buyer-modal-close" onClick={onClose}>✕</button>
        )}

        {step === 'processing' && (
          <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ 
              width: 48, height: 48, border: '4px solid var(--color-border)', 
              borderTopColor: '#1d9bf0', borderRadius: '50%', margin: '0 auto 24px auto',
              animation: 'spin 1s linear infinite' 
            }} />
            <h3 style={{ margin: '0 0 8px 0' }}>Conectando con el agricultor...</h3>
            <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>Buscando mejores rutas de transporte...</p>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {step === 'success' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>✅</div>
            <h2 style={{ margin: '0 0 8px 0', color: '#22c55e' }}>¡Compra registrada!</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>Tu pedido ha sido procesado exitosamente.</p>

            <div style={{ background: 'var(--color-bg)', padding: 16, borderRadius: 8, marginBottom: 24, textAlign: 'left' }}>
              <div style={{ fontWeight: 'bold', marginBottom: 4 }}>👨‍🌾 {product.farmerName}</div>
              <div style={{ color: 'var(--color-text-muted)' }}>📞 {product.farmerPhone}</div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <button className="buyer-btn-secondary" style={{ flex: 1, borderColor: '#25D366', color: '#25D366' }} onClick={() => window.open(`https://wa.me/${product.farmerPhone}`, '_blank')}>
                💬 WhatsApp
              </button>
              <button className="buyer-btn-secondary" style={{ flex: 1 }} onClick={() => window.open(`tel:${product.farmerPhone}`)}>
                📞 Llamar
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button className="buyer-btn-primary" onClick={() => { onClose(); setActiveTab('purchases') }}>
                Ver en Mis Compras
              </button>
              <button className="buyer-btn-secondary" style={{ border: 'none' }} onClick={onClose}>
                Volver al Mercado
              </button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div>
            <h2 style={{ margin: '0 0 24px 0' }}>Confirmar Compra</h2>
            
            {/* Resumen del producto */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', background: 'var(--color-bg)', padding: 16, borderRadius: 8, marginBottom: 16 }}>
              <div style={{ fontSize: '3rem' }}>{product.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{product.product}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{product.quantity}{product.unit} a S/ {product.pricePerKg}/kg</div>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#1d9bf0' }}>
                S/ {product.price.toLocaleString()}
              </div>
            </div>

            {/* Agricultor */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 4 }}>Vendedor</div>
              <div style={{ fontWeight: '500' }}>👨‍🌾 {product.farmerName} ({product.origin})</div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>📞 {product.farmerPhone}</div>
            </div>

            {/* Dirección de entrega */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 4 }}>Dirección de Entrega</div>
              <div style={{ fontWeight: '500' }}>📍 {BUYER_PROFILE.preferredZone}</div>
            </div>

            {/* Método de pago */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>Método de Pago</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Efectivo', 'Yape', 'Plin'].map(pm => (
                  <button 
                    key={pm}
                    style={{ 
                      padding: '8px 16px', 
                      borderRadius: 8, 
                      border: `1px solid ${selectedPayment === pm ? '#1d9bf0' : 'var(--color-border)'}`,
                      background: selectedPayment === pm ? 'rgba(29, 155, 240, 0.1)' : 'transparent',
                      color: selectedPayment === pm ? '#1d9bf0' : 'white',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedPayment(pm)}
                  >
                    {pm}
                  </button>
                ))}
              </div>
            </div>

            <button className="buyer-btn-primary" style={{ width: '100%' }} onClick={handleConfirm}>
              Confirmar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
