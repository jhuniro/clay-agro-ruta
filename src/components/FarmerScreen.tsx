import { useFarmerStore } from '../store/farmerStore'
import FarmerSidebar from './FarmerSidebar'
import FarmerDashboardView from './FarmerDashboardView'
import FarmerHarvestsView from './FarmerHarvestsView'
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
          {activeTab === 'search_transport' && (
            <div style={{ padding: 24 }}>
              <h2>Buscar Transporte</h2>
              <p>Funcionalidad en desarrollo. Por ahora usa "Mis Cosechas".</p>
            </div>
          )}
          {activeTab === 'reports' && (
            <div style={{ padding: 24 }}>
              <h2>Reportar Incidente</h2>
              <p>Funcionalidad en desarrollo.</p>
            </div>
          )}
          {activeTab === 'sales' && (
            <div style={{ padding: 24 }}>
              <h2>Mis Ventas</h2>
              <p>No tienes ventas recientes.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
