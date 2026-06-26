import { useState, useEffect, useCallback } from 'react'

// ─── Mock Data ───────────────────────────────────────────────────────────────
interface Trucker {
  id: string
  name: string
  plate: string
  phone: string
  distance: number   // km from farmer
  rating: number     // 1-5
  available: boolean
  vehicle: string    // "Camión 5T", "Furgón 3T", etc
}

const MOCK_TRUCKERS: Trucker[] = [
  { id: 't1', name: 'Carlos Mendoza', plate: 'ABC-123', phone: '+51923456789', distance: 3.2, rating: 4.8, available: true, vehicle: 'Camión 5T' },
  { id: 't2', name: 'Luis Quispe', plate: 'DEF-456', phone: '+51923456790', distance: 5.7, rating: 4.5, available: true, vehicle: 'Furgón 3T' },
  { id: 't3', name: 'Miguel Torres', plate: 'GHI-789', phone: '+51923456791', distance: 8.1, rating: 4.9, available: false, vehicle: 'Camión 8T' },
  { id: 't4', name: 'Roberto Sánchez', plate: 'JKL-012', phone: '+51923456792', distance: 12.3, rating: 4.3, available: true, vehicle: 'Camión 5T' },
]

// ─── Types ───────────────────────────────────────────────────────────────────
interface CargoAlert {
  id: string
  product: string
  quantity: string
  destination: string
  origin: string
  timestamp: number
  status: 'broadcasting' | 'matched'
  matchedTrucker?: Trucker
}

interface FarmerAlertsProps {
  farmerLocation?: string
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function FarmerAlerts({ farmerLocation = 'Huamalíes, Huánuco' }: FarmerAlertsProps) {
  const [alerts, setAlerts] = useState<CargoAlert[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ product: '', quantity: '', destination: '' })
  const [nearbyTruckers, setNearbyTruckers] = useState<Trucker[]>([])
  const [sendingTo, setSendingTo] = useState<string | null>(null)

  // Show nearby truckers when there's an active broadcast
  const hasBroadcast = alerts.some((a) => a.status === 'broadcasting')

  useEffect(() => {
    if (hasBroadcast) {
      // Simulate: truckers appear after 1s
      const timer = setTimeout(() => {
        setNearbyTruckers(MOCK_TRUCKERS.filter((t) => t.available))
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setNearbyTruckers([])
    }
  }, [hasBroadcast])

  // Simulate a trucker accepting after random delay
  const simulateMatch = useCallback((alertId: string, trucker: Trucker) => {
    setSendingTo(trucker.id)

    const delay = 2000 + Math.random() * 3000 // 2-5 seconds
    setTimeout(() => {
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === alertId
            ? { ...a, status: 'matched' as const, matchedTrucker: trucker }
            : a,
        ),
      )
      setSendingTo(null)
    }, delay)
  }, [])

  // Send alert
  const handleSend = () => {
    if (!form.product || !form.quantity || !form.destination) return

    const newAlert: CargoAlert = {
      id: `alert-${Date.now()}`,
      product: form.product,
      quantity: form.quantity,
      destination: form.destination,
      origin: farmerLocation,
      timestamp: Date.now(),
      status: 'broadcasting',
    }

    setAlerts((prev) => [newAlert, ...prev])
    setForm({ product: '', quantity: '', destination: '' })
    setShowForm(false)
  }

  // Cancel alert
  const cancelAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  const timeAgo = (ts: number) => {
    const secs = Math.floor((Date.now() - ts) / 1000)
    if (secs < 60) return `${secs}s`
    return `${Math.floor(secs / 60)}m`
  }

  const renderStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '')
  }

  return (
    <div className="fa">
      {/* ─── Section Header ─── */}
      <div className="fa-header">
        <h2 className="fd-section-title">🚛 Buscar Transporte</h2>
        <button
          className="fa-send-btn"
          onClick={() => setShowForm(!showForm)}
          type="button"
        >
          {showForm ? '✕ Cancelar' : '+ Nueva Alerta'}
        </button>
      </div>

      {/* ─── Send Alert Form ─── */}
      {showForm && (
        <div className="fa-form">
          <svg className="fa-form__bg" fill="none" viewBox="0 0 342 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="url(#fa_form)" d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V184C342 192.84 342 196.42 338.42 198.21C334.84 200 327.68 200 313.36 200H28.64C14.32 200 7.16 200 3.58 198.21C0 196.42 0 192.84 0 184V16Z"/>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" y2="100" x2="342" y1="100" x1="0">
                <stop stopColor="#1a3a1a"/><stop offset="1" stopColor="#0f2a0f"/>
              </linearGradient>
            </defs>
          </svg>

          <div className="fa-form__inner">
            <h3 className="fa-form__title">📢 Alertar Transportistas Cercanos</h3>
            <p className="fa-form__desc">Se notificará a los camioneros en un radio de 15 km</p>

            <div className="fa-form__fields">
              <div className="fa-field">
                <label className="fa-field__label">Producto</label>
                <select
                  className="fa-field__input"
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                >
                  <option value="">Seleccionar...</option>
                  <option value="🥔 Papa">🥔 Papa</option>
                  <option value="🌽 Maíz">🌽 Maíz</option>
                  <option value="☕ Café">☕ Café</option>
                  <option value="🍅 Tomate">🍅 Tomate</option>
                  <option value="🫘 Fríjol">🫘 Fríjol</option>
                  <option value="🥑 Aguacate">🥑 Aguacate</option>
                  <option value="🍊 Naranja">🍊 Naranja</option>
                </select>
              </div>

              <div className="fa-field">
                <label className="fa-field__label">Cantidad</label>
                <input
                  className="fa-field__input"
                  type="text"
                  placeholder="ej: 500 kg"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                />
              </div>

              <div className="fa-field">
                <label className="fa-field__label">Destino</label>
                <input
                  className="fa-field__input"
                  type="text"
                  placeholder="ej: Tingo María"
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                />
              </div>
            </div>

            <button
              className="fa-form__submit"
              onClick={handleSend}
              disabled={!form.product || !form.quantity || !form.destination}
              type="button"
            >
              📡 Enviar Alerta a Transportistas
            </button>
          </div>
        </div>
      )}

      {/* ─── Active Alerts ─── */}
      {alerts.length > 0 && (
        <div className="fa-alerts">
          {alerts.map((alert) => (
            <div key={alert.id} className={`fa-alert-card fa-alert-card--${alert.status}`}>
              <svg className="fa-alert-card__bg" fill="none" viewBox="0 0 342 160" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill={alert.status === 'matched' ? 'url(#fa_matched)' : 'url(#fa_broadcast)'}
                  d="M0 16C0 7.16 0 3.58 3.58 1.79C7.16 0 14.32 0 28.64 0H313.36C327.68 0 334.84 0 338.42 1.79C342 3.58 342 7.16 342 16V144C342 152.84 342 156.42 338.42 158.21C334.84 160 327.68 160 313.36 160H28.64C14.32 160 7.16 160 3.58 158.21C0 156.42 0 152.84 0 144V16Z"
                />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" y2="80" x2="342" y1="80" x1="0">
                    <stop stopColor="#1a5276"/><stop offset="1" stopColor="#0e3a5a"/>
                  </linearGradient>
                  <linearGradient gradientUnits="userSpaceOnUse" y2="80" x2="342" y1="80" x1="0">
                    <stop stopColor="#2d7a3a"/><stop offset="1" stopColor="#1e5528"/>
                  </linearGradient>
                </defs>
              </svg>

              <div className="fa-alert-card__inner">
                {/* Header */}
                <div className="fa-alert-card__top">
                  <div className="fa-alert-card__info">
                    <span className="fa-alert-card__product">{alert.product}</span>
                    <span className="fa-alert-card__qty">{alert.quantity}</span>
                  </div>
                  <span className={`fa-alert-card__status fa-alert-card__status--${alert.status}`}>
                    {alert.status === 'broadcasting' ? '📡 Buscando...' : '✅ Match!'}
                  </span>
                </div>

                {/* Route */}
                <div className="fa-alert-card__route">
                  📍 {alert.origin} → 🏁 {alert.destination}
                </div>

                {/* Time */}
                <div className="fa-alert-card__time">
                  hace {timeAgo(alert.timestamp)}
                </div>

                {/* Matched Trucker */}
                {alert.status === 'matched' && alert.matchedTrucker && (
                  <div className="fa-match">
                    <div className="fa-match__avatar">
                      {alert.matchedTrucker.name.charAt(0)}
                    </div>
                    <div className="fa-match__info">
                      <span className="fa-match__name">{alert.matchedTrucker.name}</span>
                      <span className="fa-match__detail">
                        🚛 {alert.matchedTrucker.vehicle} · {alert.matchedTrucker.plate}
                      </span>
                      <span className="fa-match__detail">
                        ⭐ {renderStars(alert.matchedTrucker.rating)} ({alert.matchedTrucker.rating})
                      </span>
                    </div>
                    <a
                      className="fa-match__call"
                      href={`tel:${alert.matchedTrucker.phone}`}
                      type="button"
                    >
                      📞 Llamar
                    </a>
                  </div>
                )}

                {/* Broadcasting animation */}
                {alert.status === 'broadcasting' && (
                  <div className="fa-broadcasting">
                    <span className="fa-broadcasting__dot" />
                    <span className="fa-broadcasting__dot" />
                    <span className="fa-broadcasting__dot" />
                    <span className="fa-broadcasting__txt">Señal enviada a transportistas cercanos...</span>
                  </div>
                )}

                {/* Cancel button */}
                {alert.status === 'broadcasting' && (
                  <button
                    className="fa-alert-card__cancel"
                    onClick={() => cancelAlert(alert.id)}
                    type="button"
                  >
                    Cancelar alerta
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Nearby Truckers ─── */}
      {hasBroadcast && nearbyTruckers.length > 0 && (
        <div className="fa-truckers">
          <h3 className="fd-section-title">🚛 Transportistas Cerca ({nearbyTruckers.length})</h3>
          <div className="fa-truckers__list">
            {nearbyTruckers.map((trucker) => {
              const activeAlert = alerts.find((a) => a.status === 'broadcasting')
              const isSending = sendingTo === trucker.id

              return (
                <div key={trucker.id} className="fa-trucker">
                  <div className="fa-trucker__avatar">
                    {trucker.name.charAt(0)}
                  </div>
                  <div className="fa-trucker__info">
                    <span className="fa-trucker__name">{trucker.name}</span>
                    <span className="fa-trucker__detail">
                      🚛 {trucker.vehicle} · {trucker.plate}
                    </span>
                    <span className="fa-trucker__detail">
                      ⭐ {renderStars(trucker.rating)} · 📏 {trucker.distance} km
                    </span>
                  </div>
                  <button
                    className={`fa-trucker__btn ${isSending ? 'fa-trucker__btn--sending' : ''}`}
                    onClick={() => activeAlert && simulateMatch(activeAlert.id, trucker)}
                    disabled={isSending || !!activeAlert?.matchedTrucker}
                    type="button"
                  >
                    {isSending ? (
                      <span className="fa-trucker__spinner" />
                    ) : (
                      '📲 Contactar'
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ─── Empty State ─── */}
      {!showForm && alerts.length === 0 && (
        <div className="fa-empty">
          <span className="fa-empty__icon">🚛</span>
          <p className="fa-empty__txt">
            No hay alertas activas.<br/>
            Envía una alerta para encontrar transportistas cercanos.
          </p>
        </div>
      )}
    </div>
  )
}
