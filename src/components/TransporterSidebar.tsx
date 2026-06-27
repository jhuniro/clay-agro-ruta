import { useTransporterStore, TabId } from '../store/transporterStore'
import './Transporter.css'

interface Props {
  onBack: () => void
}

export default function TransporterSidebar({ onBack }: Props) {
  const activeTab = useTransporterStore(s => s.activeTab)
  const setActiveTab = useTransporterStore(s => s.setActiveTab)
  const unreadAlerts = useTransporterStore(s => s.unreadAlertsCount)

  const navItems: { id: TabId, label: string, icon: string }[] = [
    { id: 'dashboard', label: 'Inicio', icon: '🏠' },
    { id: 'rutas', label: 'Rutas', icon: '🗺️' },
    { id: 'envios', label: 'Mis Envíos', icon: '📦' },
    { id: 'alertas', label: 'Alertas', icon: '⚠️' },
    { id: 'historial', label: 'Historial', icon: '🕒' },
    { id: 'perfil', label: 'Perfil', icon: '👤' },
    { id: 'config', label: 'Configuración', icon: '⚙️' },
  ]

  return (
    <aside className="transporter-sidebar">
      <div className="transporter-sidebar__header">
        <div className="transporter-sidebar__logo">
          🌿 AgroRuta
        </div>
        <div className="transporter-sidebar__role">
          Transportista · Huánuco
        </div>
      </div>

      <nav className="transporter-sidebar__nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`transporter-nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            type="button"
          >
            <div className="transporter-nav-item__left">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            {item.id === 'alertas' && unreadAlerts > 0 && (
              <span className="transporter-nav-badge">{unreadAlerts}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="transporter-sidebar__footer" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="transporter-avatar">👨🏽‍✈️</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Miguel C.</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ID: TR-8921</span>
          </div>
        </div>
        <button 
          onClick={onBack}
          style={{ 
            marginTop: 16, 
            background: 'rgba(255,255,255,0.05)', 
            border: 'none', 
            padding: '8px', 
            borderRadius: 8, 
            color: 'var(--color-text)',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          ← Cambiar de Rol
        </button>
      </div>
    </aside>
  )
}
