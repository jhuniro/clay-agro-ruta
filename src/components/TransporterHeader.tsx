import { useTransporterStore, DriverStatus } from '../store/transporterStore'
import './Transporter.css'

export default function TransporterHeader() {
  const activeTab = useTransporterStore(s => s.activeTab)
  const driverStatus = useTransporterStore(s => s.driverStatus)
  const setDriverStatus = useTransporterStore(s => s.setDriverStatus)
  const unreadAlerts = useTransporterStore(s => s.unreadAlertsCount)
  const setActiveTab = useTransporterStore(s => s.setActiveTab)

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Inicio'
      case 'rutas': return 'Explorar Rutas'
      case 'envios': return 'Mis Envíos Activos'
      case 'alertas': return 'Alertas Viales'
      case 'historial': return 'Historial de Viajes'
      case 'perfil': return 'Mi Perfil'
      case 'config': return 'Configuración'
      default: return 'Transportista'
    }
  }

  return (
    <header className="transporter-header">
      <h1 className="transporter-header__title">{getTitle()}</h1>
      
      <div className="transporter-header__actions">
        <select 
          className="transporter-status-select"
          value={driverStatus}
          onChange={(e) => setDriverStatus(e.target.value as DriverStatus)}
          style={{
            borderColor: driverStatus === 'en_ruta' ? '#2d7a3a' : 
                         driverStatus === 'disponible' ? '#3b82f6' : '#6c757d',
            color: driverStatus === 'en_ruta' ? '#2d7a3a' : 
                   driverStatus === 'disponible' ? '#3b82f6' : '#6c757d'
          }}
        >
          <option value="en_ruta">🟢 En ruta</option>
          <option value="disponible">🔵 Disponible</option>
          <option value="fuera_servicio">⚪ Fuera de servicio</option>
        </select>

        <button 
          className="transporter-bell" 
          onClick={() => setActiveTab('alertas')}
          title="Ver alertas"
        >
          🔔
          {unreadAlerts > 0 && (
            <span className="transporter-bell__badge">{unreadAlerts}</span>
          )}
        </button>
      </div>
    </header>
  )
}
