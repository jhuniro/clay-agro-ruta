import { useFarmerStore } from '../store/farmerStore'
import FarmerSidebar from './FarmerSidebar'
import FarmerDashboardView from './FarmerDashboardView'
import FarmerHarvestsView from './FarmerHarvestsView'
import FarmerMarketplaceView from './FarmerMarketplaceView'
import './FarmerScreen.css'

interface Props {
  onBack: () => void
}

export default function FarmerScreen({ onBack }: Props) {
  const activeTab = useFarmerStore(s => s.activeTab)

  return (
    <div className="farmer-layout">
      {/* Sidebar for navigation */}
      <FarmerSidebar onBack={onBack} />

      {/* Main Area */}
      <main className="farmer-main">
        {/* Content Area (Views) */}
        <div className="farmer-content">
          {activeTab === 'dashboard' && <FarmerDashboardView />}
          {activeTab === 'harvests' && <FarmerHarvestsView />}
          {activeTab === 'marketplace' && <FarmerMarketplaceView />}
          {activeTab === 'reports' && (
            <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--color-text)' }}>Reportar Incidente</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>Ayuda a la comunidad reportando bloqueos o huaicos en tu zona.</p>
              
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: 24, borderRadius: 12 }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', marginBottom: 8, color: 'var(--color-text)' }}>Tipo de Incidente</label>
                  <select style={{ width: '100%', padding: '10px', borderRadius: 8, background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <option>Derrumbe / Huaico</option>
                    <option>Bloqueo de Carretera</option>
                    <option>Accidente de Tránsito</option>
                    <option>Inundación</option>
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', marginBottom: 8, color: 'var(--color-text)' }}>Ubicación</label>
                  <input type="text" value="Detectando ubicación actual..." disabled style={{ width: '100%', padding: '10px', borderRadius: 8, background: 'rgba(0,0,0,0.2)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', marginBottom: 8, color: 'var(--color-text)' }}>Descripción (Opcional)</label>
                  <textarea rows={3} placeholder="Detalla el nivel de gravedad..." style={{ width: '100%', padding: '10px', borderRadius: 8, background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }} />
                </div>
                <button style={{ background: '#ef4444', color: 'white', border: 'none', padding: '12px 24px', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>
                  Enviar Reporte
                </button>
              </div>
            </div>
          )}
          {activeTab === 'sales' && (
            <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--color-text)' }}>Mis Ventas Mensuales</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Ingresos este mes</div>
                  <div style={{ color: '#22c55e', fontSize: '1.5rem', fontWeight: 'bold' }}>S/. 4,500</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Kg Vendidos</div>
                  <div style={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: 'bold' }}>3,200 kg</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Compradores</div>
                  <div style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 'bold' }}>5</div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--color-text)' }}>Papa Huayro (500 kg)</span>
                  <span style={{ color: '#22c55e', fontWeight: 'bold' }}>+ S/. 750.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--color-text)' }}>Café en grano (200 kg)</span>
                  <span style={{ color: '#22c55e', fontWeight: 'bold' }}>+ S/. 2,000.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--color-text)' }}>Maíz Amarillo (1000 kg)</span>
                  <span style={{ color: '#22c55e', fontWeight: 'bold' }}>+ S/. 1,750.00</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
