import { useFarmerStore, FarmerTab } from '../store/farmerStore'

interface Props {
  onBack: () => void
}

export default function FarmerSidebar({ onBack }: Props) {
  const activeTab = useFarmerStore(s => s.activeTab)
  const setActiveTab = useFarmerStore(s => s.setActiveTab)

  const navItems: { id: FarmerTab, label: string, icon: string }[] = [
    { id: 'dashboard', label: 'Inicio', icon: '🏠' },
    { id: 'harvests', label: 'Mis Cosechas', icon: '📦' },
    { id: 'search_transport', label: 'Buscar Transporte', icon: '🚛' },
    { id: 'reports', label: 'Reportar', icon: '⚠️' },
    { id: 'sales', label: 'Mis Ventas', icon: '📊' },
  ]

  return (
    <aside className="farmer-sidebar">
      <div className="farmer-sidebar__header">
        <div className="farmer-sidebar__brand">
          🌱 AgroRuta
        </div>
        <div className="farmer-sidebar__role">
          Agricultor · Huánuco
        </div>
      </div>

      <nav className="farmer-sidebar__nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`farmer-nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            type="button"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="farmer-sidebar__footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#2d7a3a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            JG
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Juan García</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Fundo La Esperanza</span>
          </div>
        </div>
        <button 
          onClick={onBack}
          style={{ 
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
