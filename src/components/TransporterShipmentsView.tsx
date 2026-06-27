import { useTransporterStore } from '../store/transporterStore'
import ConfirmationCountdown from './ConfirmationCountdown'

export default function TransporterShipmentsView() {
  const shipments = useTransporterStore(s => s.shipments)
  const updateShipmentStatus = useTransporterStore(s => s.updateShipmentStatus)
  const setActiveTab = useTransporterStore(s => s.setActiveTab)

  const handleConfirmLoad = (id: string) => {
    updateShipmentStatus(id, 'EN_TRANSITO')
    alert('Notificación enviada: "Carga verificada"')
  }

  const handleConfirmDelivery = (id: string) => {
    updateShipmentStatus(id, 'ENTREGADO')
    alert('Notificación enviada: "Entrega completada"')
  }

  const handleExpireLoad = () => {
    alert('Alerta automática: Confirmación de carga pendiente')
  }

  const handleExpireDelivery = () => {
    alert('Alerta automática: Recepción pendiente de confirmación')
  }

  return (
    <div style={{ padding: 24, paddingBottom: 100 }}>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem' }}>Tus Envíos de Hoy</h2>

      {shipments.map(shipment => (
        <div key={shipment.id} className="ts-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>📦 {shipment.product}</h3>
            <span className={`ts-badge ${shipment.status === 'EN_TRANSITO' ? 'ts-badge--grave' : 'ts-badge--moderado'}`} style={{ 
              background: shipment.status === 'EN_TRANSITO' ? 'rgba(45,122,58,0.2)' : undefined,
              color: shipment.status === 'EN_TRANSITO' ? '#a8e6b0' : undefined,
              borderColor: shipment.status === 'EN_TRANSITO' ? 'rgba(45,122,58,0.5)' : undefined,
            }}>
              {shipment.status.replace(/_/g, ' ')}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 16 }}>
            <span>⚖️ <strong>Peso:</strong> {shipment.weight} kg</span>
            <span>🌱 <strong>Agricultor:</strong> {shipment.farmer}</span>
            <span>🛒 <strong>Destino:</strong> {shipment.buyer}</span>
            {shipment.eta && <span>⏱️ <strong>ETA:</strong> {shipment.eta}</span>}
          </div>

          {/* Conditional actions based on status */}
          
          {shipment.status === 'PENDIENTE_CARGA' && shipment.farmerLoaded && (
            <ConfirmationCountdown 
              label="Confirmar que la mercancía fue cargada" 
              onConfirm={() => handleConfirmLoad(shipment.id)}
              onExpire={handleExpireLoad}
            />
          )}

          {shipment.status === 'PENDIENTE_CARGA' && !shipment.farmerLoaded && (
            <div style={{ padding: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 8, textAlign: 'center', fontSize: '0.85rem' }}>
              Esperando a que el agricultor confirme que subió la mercancía...
            </div>
          )}

          {shipment.status === 'EN_TRANSITO' && (
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="ts-btn ts-btn--primary" style={{ flex: 1 }} onClick={() => setActiveTab('dashboard')}>
                🗺️ Ver ruta en mapa
              </button>
              <button className="ts-btn ts-btn--success" style={{ flex: 1 }} onClick={() => updateShipmentStatus(shipment.id, 'LLEGANDO')}>
                Simular Llegada
              </button>
            </div>
          )}

          {shipment.status === 'LLEGANDO' && (
            <ConfirmationCountdown 
              label="Entregué la mercancía" 
              onConfirm={() => handleConfirmDelivery(shipment.id)}
              onExpire={handleExpireDelivery}
            />
          )}

        </div>
      ))}
    </div>
  )
}
