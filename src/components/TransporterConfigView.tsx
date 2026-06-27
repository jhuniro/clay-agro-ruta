import { useTransporterStore } from '../store/transporterStore'

export default function TransporterConfigView() {
  const simulateFarmerLoaded = useTransporterStore(s => s.simulateFarmerLoaded)
  const simulateRouteBlock = useTransporterStore(s => s.simulateRouteBlock)

  return (
    <div style={{ padding: 24, paddingBottom: 100 }}>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem' }}>Configuración</h2>
      
      <div className="ts-card">
        <h3>Preferencias de la App</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="checkbox" defaultChecked /> Notificaciones Push
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="checkbox" defaultChecked /> Modo Oscuro
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="checkbox" defaultChecked /> Alertas de clima por voz
          </label>
        </div>
      </div>

      <div className="ts-card" style={{ border: '1px solid #f5a623' }}>
        <h3 style={{ color: '#f5a623' }}>🛠️ Módulo de Simulación (Modo Demo)</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 16 }}>
          Utiliza estos botones para probar los flujos de la aplicación sin backend.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="ts-btn ts-btn--secondary" onClick={simulateFarmerLoaded}>
            🌱 Simular "Agricultor cargó la mercancía"
          </button>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '-8px 0 8px 0' }}>
            Esto habilitará el botón de confirmación en la pestaña "Mis Envíos".
          </p>

          <button className="ts-btn ts-btn--secondary" onClick={simulateRouteBlock} style={{ borderColor: '#dc3545', color: '#ff6b7b' }}>
            ⚠️ Simular "Ruta bloqueada detectada"
          </button>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '-8px 0 8px 0' }}>
            Esto abrirá el panel de Ruta Alternativa en la pestaña "Inicio".
          </p>
        </div>
      </div>
    </div>
  )
}
