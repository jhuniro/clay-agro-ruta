import { useBuyerStore } from '../store/buyerStore'

export default function BuyerConfig() {
  const config = useBuyerStore(s => s.config)
  const updateConfig = useBuyerStore(s => s.updateConfig)

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: 24 }}>Configuración</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Preferencias de la App */}
        <div style={{ background: 'var(--color-bg-elevated)', padding: 24, borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>Preferencias de la App</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>Notificaciones Push</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Recibe alertas de tus envíos y rutas</div>
            </div>
            <div 
              className={`buyer-toggle ${config.notifications ? 'active' : ''}`}
              onClick={() => updateConfig('notifications', !config.notifications)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>Modo Oscuro</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Aspecto visual de la aplicación</div>
            </div>
            <div 
              className={`buyer-toggle ${config.darkMode ? 'active' : ''}`}
              onClick={() => updateConfig('darkMode', !config.darkMode)}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>Idioma</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Idioma principal</div>
            </div>
            <select 
              value={config.language} 
              onChange={e => updateConfig('language', e.target.value)}
              style={{ background: 'var(--color-bg)', color: 'white', border: '1px solid var(--color-border)', padding: '8px 12px', borderRadius: 8 }}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        {/* Preferencias Comerciales */}
        <div style={{ background: 'var(--color-bg-elevated)', padding: 24, borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>Preferencias Comerciales</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>Moneda</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Moneda por defecto para el mercado</div>
            </div>
            <select 
              value={config.currency} 
              onChange={e => updateConfig('currency', e.target.value)}
              style={{ background: 'var(--color-bg)', color: 'white', border: '1px solid var(--color-border)', padding: '8px 12px', borderRadius: 8 }}
            >
              <option value="PEN">Soles (S/)</option>
              <option value="USD">Dólares ($)</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>Unidades de Medida</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Masa y volumen</div>
            </div>
            <select 
              value={config.units} 
              onChange={e => updateConfig('units', e.target.value)}
              style={{ background: 'var(--color-bg)', color: 'white', border: '1px solid var(--color-border)', padding: '8px 12px', borderRadius: 8 }}
            >
              <option value="kg">Kilogramos (kg)</option>
              <option value="lb">Libras (lb)</option>
            </select>
          </div>
        </div>

        {/* Acerca de */}
        <div style={{ background: 'var(--color-bg-elevated)', padding: 24, borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>Acerca de</h3>
          <div style={{ padding: '12px 0', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            <div>AgroRuta v1.0.0</div>
            <div>Desarrollado para Clay Hackathon 2026</div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button className="buyer-btn-secondary" style={{ flex: 1 }} onClick={() => {
              if (confirm('¿Limpiar caché de la aplicación?')) {
                alert('Caché limpiada.')
              }
            }}>
              Limpiar Caché
            </button>
            <button className="buyer-btn-primary" style={{ flex: 1 }} onClick={() => {
              window.open('https://wa.me/51999999999?text=Hola, necesito ayuda con la aplicación AgroRuta', '_blank')
            }}>
              Soporte y Ayuda
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
