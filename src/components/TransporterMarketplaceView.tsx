import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTransporterStore } from '../store/transporterStore'
import type { MockShipment } from '../store/transporterStore'

export default function TransporterMarketplaceView() {
  const shipments = useTransporterStore(s => s.shipments)
  const availableShipments = shipments.filter(s => s.status === 'PENDIENTE_CARGA')
  
  const [selectedShipment, setSelectedShipment] = useState<MockShipment | null>(null)
  const [isSigning, setIsSigning] = useState(false)
  const setActiveTab = useTransporterStore(s => s.setActiveTab)
  const updateShipmentStatus = useTransporterStore(s => s.updateShipmentStatus)

  const handleSign = () => {
    setIsSigning(true)
    setTimeout(() => {
      if (selectedShipment) {
        updateShipmentStatus(selectedShipment.id, 'EN_TRANSITO')
        setActiveTab('envios')
      }
      setIsSigning(false)
      setSelectedShipment(null)
    }, 1500)
  }

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      
      {/* Widget de Alerta Preventiva (Clima) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}
      >
        <span style={{ fontSize: '2rem' }}>🌧️</span>
        <div>
          <div style={{ fontWeight: 'bold', color: '#60a5fa' }}>Alerta Preventiva CLAY</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            80% de probabilidad de lluvias intensas en Tingo María. Planifica tus rutas con precaución.
          </div>
        </div>
      </motion.div>

      <h2 style={{ margin: '0 0 24px 0' }}>Bolsa de Cargas Disponibles</h2>

      {/* Grid de Cargas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        <AnimatePresence>
          {availableShipments.map((shipment, i) => (
            <motion.div
              key={shipment.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                borderRadius: 12,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ padding: 16, flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: 16, 
                    fontSize: '0.75rem', 
                    fontWeight: 'bold',
                    background: shipment.routeStatus === 'libre' ? 'rgba(34, 197, 94, 0.2)' : shipment.routeStatus === 'riesgo' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: shipment.routeStatus === 'libre' ? '#4ade80' : shipment.routeStatus === 'riesgo' ? '#fde047' : '#f87171'
                  }}>
                    ● Ruta {shipment.routeStatus}
                  </span>
                  <span style={{ fontWeight: 'bold', color: '#1d9bf0', fontSize: '1.2rem' }}>S/ {shipment.price}</span>
                </div>

                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>{shipment.product} ({shipment.weight} kg)</h3>
                
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div>📍 Origen: <span style={{ color: 'white' }}>{shipment.origin}</span></div>
                  <div>🏁 Destino: <span style={{ color: 'white' }}>{shipment.destination}</span></div>
                  <div>📅 Fecha: <span style={{ color: 'white' }}>{shipment.date}</span></div>
                </div>
              </div>

              <div style={{ padding: 16, background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--color-border)' }}>
                {shipment.routeStatus === 'bloqueada' ? (
                  <button 
                    disabled 
                    style={{ width: '100%', padding: '12px', borderRadius: 8, background: 'var(--color-border)', color: '#888', fontWeight: 'bold', cursor: 'not-allowed', border: 'none' }}
                  >
                    🚫 Vía intransitable
                  </button>
                ) : (
                  <button 
                    onClick={() => setSelectedShipment(shipment)}
                    style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#1d9bf0', color: 'white', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}
                  >
                    🤝 Aceptar Flete
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal de Firma Inicial */}
      {selectedShipment && (
        <div className="modal-overlay" onClick={isSigning ? undefined : () => setSelectedShipment(null)}>
          <motion.div 
            className="modal-card" 
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 style={{ margin: '0 0 16px 0', borderBottom: '1px solid var(--color-border)', paddingBottom: 16 }}>
              Contrato de Flete de Carga
            </h2>

            <div style={{ fontSize: '0.9rem', marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div><strong>Carga:</strong> {selectedShipment.product}</div>
              <div><strong>Peso Total:</strong> {selectedShipment.weight} kg</div>
              <div><strong>Pago Acordado:</strong> S/ {selectedShipment.price}</div>
              <div><strong>Ruta:</strong> {selectedShipment.origin} → {selectedShipment.destination}</div>
            </div>

            <div style={{ background: 'var(--color-bg)', padding: 16, borderRadius: 8, marginBottom: 24 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>
                Firma de aceptación del transportista
              </div>
              <div style={{ 
                height: 100, 
                border: '2px dashed var(--color-border)', 
                borderRadius: 8, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
                background: 'rgba(255,255,255,0.02)'
              }}>
                [ Espacio para firma digital ]
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                className="action-btn action-btn--secondary" 
                onClick={() => setSelectedShipment(null)} 
                disabled={isSigning}
              >
                Cancelar
              </button>
              <button 
                className="action-btn action-btn--primary" 
                onClick={handleSign}
                disabled={isSigning}
              >
                {isSigning ? 'Firmando...' : '✍️ Firmar y Aceptar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
