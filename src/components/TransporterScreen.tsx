import { useTransporterStore } from '../store/transporterStore'
import TransporterSidebar from './TransporterSidebar'
import TransporterHeader from './TransporterHeader'
import TransporterDashboardView from './TransporterDashboardView'
import TransporterMarketplaceView from './TransporterMarketplaceView'
import TransporterAlertsView from './TransporterAlertsView'
import TransporterShipmentsView from './TransporterShipmentsView'
import TransporterProfileView from './TransporterProfileView'
import TransporterConfigView from './TransporterConfigView'
import IncidentReportModal from './IncidentReportModal'
import './Transporter.css'

interface Props {
  onBack: () => void
}

export default function TransporterScreen({ onBack }: Props) {
  const activeTab = useTransporterStore(s => s.activeTab)
  const incidentModalOpen = useTransporterStore(s => s.incidentModalOpen)
  const setIncidentModalOpen = useTransporterStore(s => s.setIncidentModalOpen)
  const addAlert = useTransporterStore(s => s.addAlert)
  const isOffline = useTransporterStore(s => s.isOffline)

  const handleIncidentSubmit = (data: { type: string, description: string }) => {
    addAlert({
      id: Date.now().toString(),
      type: data.type as any,
      route: 'Ruta actual',
      description: data.description || 'Reporte de conductor',
      timeElapsed: 'Justo ahora',
      severity: 'GRAVE',
      coord: [-9.9833, -76.2167]
    })
    setIncidentModalOpen(false)
    alert('Reporte enviado correctamente y notificado a la red.')
  }

  return (
    <div className={`transporter-layout ${isOffline ? 'is-offline' : ''}`}>
      {/* Sidebar for navigation */}
      <TransporterSidebar onBack={onBack} />

      {/* Main Area */}
      <main className="transporter-main">
        {/* Header */}
        <TransporterHeader />

        {/* Offline Banner */}
        {isOffline && (
          <div style={{ background: '#ef4444', color: 'white', padding: '8px 16px', textAlign: 'center', fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
            <span>📡 Señal perdida. Trabajando en modo sin conexión. Los datos se guardan en caché.</span>
          </div>
        )}

        {/* Content Area (Views) */}
        <div className="transporter-content" style={{ filter: isOffline ? 'grayscale(100%) opacity(0.8)' : 'none', pointerEvents: isOffline ? 'none' : 'auto', transition: 'all 0.3s' }}>
          {activeTab === 'dashboard' && <TransporterDashboardView />}
          {activeTab === 'rutas' && <TransporterMarketplaceView />}
          {activeTab === 'envios' && <TransporterShipmentsView />}
          {activeTab === 'alertas' && <TransporterAlertsView />}
          {activeTab === 'historial' && (
            <div style={{ padding: 24 }}>
              <h2>Historial de Viajes</h2>
              <p>No tienes viajes recientes.</p>
            </div>
          )}
          {activeTab === 'perfil' && <TransporterProfileView />}
          {activeTab === 'config' && <TransporterConfigView />}
        </div>
      </main>

      {/* Floating Modals */}
      {incidentModalOpen && (
        <IncidentReportModal 
          onClose={() => setIncidentModalOpen(false)}
          onSubmit={handleIncidentSubmit}
        />
      )}
    </div>
  )
}
