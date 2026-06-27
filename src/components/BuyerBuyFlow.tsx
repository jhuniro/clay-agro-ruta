import { useState } from 'react'
import type { Order } from '../types'

interface Props {
  product: Order
  onClose: () => void
}

type BuyStep = 'confirm' | 'processing' | 'success'

export default function BuyerBuyFlow({ product, onClose }: Props) {
  const [step, setStep] = useState<BuyStep>('confirm')

  if (step === 'processing') {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-card" onClick={e => e.stopPropagation()}>
          <div className="modal-spinner" />
          <p className="modal-processing-text">Conectando con el agricultor...</p>
        </div>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-card" onClick={e => e.stopPropagation()}>
          <div className="modal-success-header">
            <span className="modal-success-icon">✅</span>
            <h2 className="modal-title">¡Lote Separado!</h2>
          </div>
          <p className="modal-subtitle">Contacta al agricultor para coordinar el pago.</p>

          <div className="modal-farmer">
            <span className="modal-farmer__name">🌱 {product.farmerName}</span>
            <span className="modal-farmer__phone">📞 {product.farmerPhone}</span>
          </div>

          <div className="modal-contact-btns">
            <a
              className="modal-btn modal-btn--whatsapp"
              href={`https://wa.me/${product.farmerPhone}?text=Hola ${product.farmerName}, separé tu lote de ${product.product}. Coordinamos el pago.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📱 WhatsApp
            </a>
            <a className="modal-btn modal-btn--call" href={`tel:${product.farmerPhone}`}>
              📞 Llamar
            </a>
          </div>

          <button className="action-btn action-btn--secondary" onClick={onClose} type="button">
            Volver al Marketplace
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-card" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">🤝 Confirmar Compra</h2>

        <div className="modal-product">
          <span className="modal-product__emoji">{product.emoji}</span>
          <div className="modal-product__info">
            <span className="modal-product__name">{product.product}</span>
            <span className="modal-product__qty">{product.quantity} {product.unit}</span>
            <span className="modal-product__price">S/ {product.price.toLocaleString()}</span>
          </div>
        </div>

        <p className="modal-question">
          ¿Seguro que deseas separar este lote por <strong>S/ {product.price.toLocaleString()}</strong>?
        </p>

        <div className="modal-actions">
          <button className="action-btn action-btn--secondary" onClick={onClose} type="button">
            Cancelar
          </button>
          <button
            className="action-btn action-btn--primary"
            onClick={() => {
              setStep('processing')
              setTimeout(() => setStep('success'), 1500)
            }}
            type="button"
          >
            Sí, Separar ✓
          </button>
        </div>
      </div>
    </div>
  )
}
