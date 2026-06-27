export default function TransporterProfileView() {
  return (
    <div style={{ padding: 24, paddingBottom: 100, maxWidth: 600, margin: '0 auto' }}>
      <div className="ts-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
        <div style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          👨🏽‍✈️
        </div>
        
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '1.5rem' }}>Miguel C.</h2>
          <div style={{ color: '#f5a623', fontSize: '1.2rem', fontWeight: 700 }}>
            ★ 4.9 <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 400 }}>(124 envíos)</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 16 }}>
          <span className="ts-badge ts-badge--moderado">Camión Furgón 5T</span>
          <span className="ts-badge ts-badge--moderado">Refrigerado</span>
        </div>
      </div>

      <h3 style={{ marginTop: 32, marginBottom: 16 }}>Información Comercial (Pública)</h3>
      <div className="ts-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: 12 }}>
          <span style={{ color: 'var(--color-text-muted)' }}>Tarifa Base</span>
          <strong style={{ fontSize: '1.1rem' }}>S/ 3.50 por km</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: 12 }}>
          <span style={{ color: 'var(--color-text-muted)' }}>Capacidad de carga</span>
          <strong>5,000 kg</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>Zonas de Cobertura frecuentes</span>
          <div style={{ textAlign: 'right' }}>
            <div>📍 Huánuco Centro</div>
            <div>📍 Tingo María</div>
            <div>📍 Ambo</div>
          </div>
        </div>
      </div>

      <button className="ts-btn ts-btn--secondary" style={{ width: '100%', marginTop: 24 }}>
        ✏️ Editar Perfil
      </button>
    </div>
  )
}
