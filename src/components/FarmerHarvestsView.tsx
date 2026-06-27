import { useState } from 'react'
import { useFarmerStore } from '../store/farmerStore'
import PublishHarvestModal from './PublishHarvestModal'

export default function FarmerHarvestsView() {
  const shipments = useFarmerStore(s => s.shipments)
  const addShipment = useFarmerStore(s => s.addShipment)
  const [modalOpen, setModalOpen] = useState(false)

  const handlePublish = (data: { product: string, quantity: number, unit: string, price: number, origin: string }) => {
    addShipment({
      id: `f_sh_${Date.now()}`,
      product: data.product,
      quantity: data.quantity,
      unit: data.unit,
      status: 'DISPONIBLE',
      origin: data.origin,
      destination: 'Por definir', // Default when just published
      price: data.price
    })
    setModalOpen(false)
    alert('¡Cosecha publicada con éxito en la bolsa de cargas!')
  }

  const handleTrack = (id: string) => {
    window.history.pushState({}, '', `/tracking/${id}`)
    window.dispatchEvent(new Event('popstate'))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'EN_TRANSITO': return <span className="fd-badge fd-badge--green">En tránsito</span>
      case 'BUSCANDO_TRANSPORTE': return <span className="fd-badge fd-badge--yellow">Buscando Transporte</span>
      case 'DISPONIBLE': return <span className="fd-badge fd-badge--blue" style={{ background: 'rgba(59,130,246,0.2)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.5)' }}>Disponible</span>
      case 'RETRASADO': return <span className="fd-badge fd-badge--red">Retrasado</span>
      default: return <span className="fd-badge">{status}</span>
    }
  }

  return (
    <div style={{ padding: 24, paddingBottom: 100 }}>
      <div className="fh-header">
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Mis Cosechas</h2>
        <button className="fh-btn-primary" onClick={() => setModalOpen(true)}>
          + Publicar Cosecha
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {shipments.map(ship => {
          const isEnTransito = ship.status === 'EN_TRANSITO' || ship.status === 'RETRASADO'
          
          return (
            <div key={ship.id} className="fh-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    {ship.product === 'Papa Huayro' || ship.product === 'Papa' ? '🥔' : 
                     ship.product === 'Maíz amarillo' ? '🌽' :
                     ship.product === 'Café' ? '☕' : '📦'} {ship.product}
                  </h3>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    {ship.quantity} {ship.unit} • S/ {ship.price}
                  </div>
                </div>
                {getStatusBadge(ship.status)}
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8, fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>
                <div>📍 Origen: <strong>{ship.origin}</strong></div>
                <div>🏁 Destino: <strong>{ship.destination}</strong></div>
                {ship.driver && <div style={{ marginTop: 8 }}>🚛 Conductor: {ship.driver} {ship.eta && `(ETA: ${ship.eta})`}</div>}
              </div>

              {isEnTransito && (
                <button 
                  className="fh-btn-outline" 
                  onClick={() => handleTrack(ship.id)}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  📍 Rastrear Pedido
                </button>
              )}
            </div>
          )
        })}
      </div>

      {modalOpen && (
        <PublishHarvestModal 
          onClose={() => setModalOpen(false)}
          onSubmit={handlePublish}
        />
      )}
    </div>
  )
}
