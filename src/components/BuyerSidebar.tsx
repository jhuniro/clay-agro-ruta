import { useBuyerStore, BuyerTab } from '../store/buyerStore'

interface Props {
  onBack: () => void
}

export default function BuyerSidebar({ onBack }: Props) {
  const activeTab = useBuyerStore(s => s.activeTab)
  const setActiveTab = useBuyerStore(s => s.setActiveTab)

  const navItems: { id: BuyerTab, label: string, icon: string }[] = [
    { id: 'dashboard', label: 'Inicio', icon: '🏠' },
    { id: 'marketplace', label: 'Mercado', icon: '🛒' },
    { id: 'purchases', label: 'Mis Compras', icon: '📦' },
    { id: 'profile', label: 'Perfil', icon: '👤' },
    { id: 'config', label: 'Configuración', icon: '⚙️' },
  ]

  return (
    <aside className="buyer-sidebar">
      <div className="buyer-sidebar__header">
        <div className="buyer-sidebar__brand">
          🛒 AgroRuta
        </div>
        <div className="buyer-sidebar__role">
          Comprador Mayorista
        </div>
      </div>

      <nav className="buyer-sidebar__nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`buyer-nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            type="button"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="buyer-sidebar__footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            CA
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Carlos A.</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Supermercados</span>
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
