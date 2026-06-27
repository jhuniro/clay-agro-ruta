import { useState } from 'react'

interface Props {
  onClose: () => void
  onSubmit: (data: { product: string, quantity: number, unit: string, price: number, origin: string }) => void
}

export default function PublishHarvestModal({ onClose, onSubmit }: Props) {
  const [product, setProduct] = useState('Papa')
  const [quantity, setQuantity] = useState<number | ''>('')
  const [unit, setUnit] = useState('kg')
  const [price, setPrice] = useState<number | ''>('')
  
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [originText, setOriginText] = useState('')

  const total = (typeof quantity === 'number' && typeof price === 'number') 
    ? (quantity * price).toFixed(2) 
    : '0.00'

  const handleGetLocation = () => {
    setLocationStatus('loading')
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationStatus('success')
          setOriginText(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`)
        },
        () => {
          setLocationStatus('error')
        },
        { enableHighAccuracy: false, timeout: 5000 }
      )
    } else {
      setLocationStatus('error')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!quantity || !price || !originText) {
      alert('Por favor completa todos los campos obligatorios.')
      return
    }
    onSubmit({
      product,
      quantity: Number(quantity),
      unit,
      price: Number(price),
      origin: originText
    })
  }

  return (
    <div className="fm-overlay" onClick={onClose}>
      <form className="fm-modal" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Publicar Cosecha</h2>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: 'var(--color-text)' }}>
            ×
          </button>
        </div>

        <div>
          <label className="fm-label">Producto</label>
          <select className="fm-input" value={product} onChange={e => setProduct(e.target.value)}>
            <option value="Papa">🥔 Papa</option>
            <option value="Maíz amarillo">🌽 Maíz</option>
            <option value="Café">☕ Café</option>
            <option value="Cacao">🍫 Cacao</option>
            <option value="Aguacate">🥑 Aguacate</option>
            <option value="Tomate">🍅 Tomate</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 2 }}>
            <label className="fm-label">Cantidad</label>
            <input 
              className="fm-input" 
              type="number" 
              placeholder="Ej: 500" 
              value={quantity} 
              onChange={e => setQuantity(e.target.value ? Number(e.target.value) : '')} 
              min={1}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className="fm-label">Unidad</label>
            <select className="fm-input" value={unit} onChange={e => setUnit(e.target.value)}>
              <option value="kg">Kg</option>
              <option value="ton">Ton</option>
            </select>
          </div>
        </div>

        <div>
          <label className="fm-label">Precio Unitario (S/)</label>
          <input 
            className="fm-input" 
            type="number" 
            placeholder="Ej: 1.50" 
            value={price} 
            onChange={e => setPrice(e.target.value ? Number(e.target.value) : '')}
            step="0.1"
            min={0}
          />
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 8 }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Total Calculado:</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2d7a3a' }}>
            S/ {total}
          </div>
        </div>

        <div>
          <label className="fm-label">Ubicación (Origen)</label>
          <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
            <button 
              type="button" 
              onClick={handleGetLocation}
              disabled={locationStatus === 'loading'}
              style={{
                background: locationStatus === 'success' ? '#2d7a3a' : 'var(--color-bg-elevated)',
                color: locationStatus === 'success' ? 'white' : 'var(--color-text)',
                border: `1px solid ${locationStatus === 'success' ? '#2d7a3a' : 'var(--color-border)'}`,
                padding: '10px',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              {locationStatus === 'loading' ? 'Obteniendo...' : 
               locationStatus === 'success' ? '📍 Ubicación capturada' : 
               '📍 Usar mi ubicación actual'}
            </button>
            
            {locationStatus === 'error' && (
              <input 
                className="fm-input"
                type="text"
                placeholder="Escribe el origen manualmente..."
                value={originText}
                onChange={e => setOriginText(e.target.value)}
                style={{ borderColor: '#dc3545' }}
              />
            )}
            {locationStatus === 'error' && (
              <span style={{ fontSize: '0.8rem', color: '#ff6b7b' }}>No se pudo obtener la ubicación automáticamente.</span>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          style={{
            background: '#2d7a3a',
            color: 'white',
            border: 'none',
            padding: '14px',
            borderRadius: 8,
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: 8
          }}
        >
          Publicar Cosecha
        </button>
      </form>
    </div>
  )
}
