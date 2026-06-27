import { useTransporterStore } from '../store/transporterStore'

export default function TransporterAlertsView() {
  const alerts = useTransporterStore(s => s.alerts)
  const setActiveTab = useTransporterStore(s => s.setActiveTab)
  const markAlertsRead = useTransporterStore(s => s.markAlertsRead)
  
  // Mark as read when opening this view
  import('react').then(React => {
    React.useEffect(() => {
      markAlertsRead()
    }, [markAlertsRead])
  })

  return (
    <div style={{ padding: 24, paddingBottom: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Alertas Viales</h2>
        <select style={{ background: 'var(--color-bg)', color: 'var(--color-text)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: 8 }}>
          <option>Todas las severidades</option>
          <option>Solo Graves</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {alerts.map(alert => {
          const isGrave = alert.severity === 'GRAVE'
          const emoji = alert.type === 'HUAICO' ? '⛰️' : alert.type === 'LLUVIA' ? '🌧️' : '⚠️'
          
          return (
            <div key={alert.id} className="ts-card" style={{ borderLeft: `4px solid ${isGrave ? '#dc3545' : '#f5a623'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{alert.route}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{alert.timeElapsed}</span>
                  </div>
                </div>
                <span className={`ts-badge ${isGrave ? 'ts-badge--grave' : 'ts-badge--moderado'}`}>
                  {alert.severity}
                </span>
              </div>
              
              <p style={{ margin: '0 0 16px 0', fontSize: '0.95rem' }}>
                {alert.description}
              </p>

              {isGrave && (
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 8, fontSize: '0.85rem', marginBottom: 16 }}>
                  💡 <strong>Sugerencia:</strong> Usar ruta alternativa por el centro de Pillco Marca.
                </div>
              )}

              <button className="ts-btn ts-btn--secondary" onClick={() => setActiveTab('dashboard')} style={{ width: '100%' }}>
                🗺️ Ver en mapa
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
