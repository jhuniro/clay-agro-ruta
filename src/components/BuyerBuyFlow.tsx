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
          <svg className="modal-card__bg" fill="none" viewBox="0 0 342 350" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="url(#grad_success)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V334C342 342.84 342 346.42 338.42 348.21C334.84 350 327.68 350 313.36 350H28.64C14.32 350 7.16 350 3.58 348.21C0 346.42 0 342.84 0 334V16Z"/>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" y2="175" x2="342" y1="175" x1="0">
                <stop stop-color="#2d7a3a"/>
                <stop stop-color="#1e5528" offset="1"/>
              </linearGradient>
            </defs>
          </svg>
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
        <svg className="modal-card__bg" fill="none" viewBox="0 0 342 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#grad_confirm)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V304C342 312.84 342 316.42 338.42 318.21C334.84 320 327.68 320 313.36 320H28.64C14.32 320 7.16 320 3.58 318.21C0 316.42 0 312.84 0 304V16Z"/>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" y2="160" x2="342" y1="160" x1="0">
              <stop stop-color="#1a6b9a"/>
              <stop stop-color="#0d4f6e" offset="1"/>
            </linearGradient>
          </defs>
        </svg>
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
