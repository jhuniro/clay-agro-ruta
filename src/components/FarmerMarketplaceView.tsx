export default function FarmerMarketplaceView() {
  const mockAds = [
    {
      id: 1,
      farmer: 'María L.',
      location: 'Churubamba',
      product: 'Papa Canchán',
      quantity: '2 Toneladas',
      price: 'S/. 1.20 / kg',
      date: 'Hoy',
      tag: 'OFERTA'
    },
    {
      id: 2,
      farmer: 'Pedro C.',
      location: 'Ambo',
      product: 'Maíz Amarillo',
      quantity: '500 kg',
      price: 'S/. 2.50 / kg',
      date: 'Ayer',
      tag: 'DESTACADO'
    },
    {
      id: 3,
      farmer: 'Lucía V.',
      location: 'Pillco Marca',
      product: 'Cebolla Roja',
      quantity: '1 Tonelada',
      price: 'S/. 1.80 / kg',
      date: 'Hace 2 días'
    }
  ]

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', margin: '0 0 8px 0', color: 'var(--color-text)' }}>Marketplace Agrícola</h2>
          <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Descubre productos de otros agricultores de la región.</p>
        </div>
        <button style={{ 
          background: '#22c55e', 
          color: 'white', 
          border: 'none', 
          padding: '10px 20px', 
          borderRadius: 8, 
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          + Publicar mi Cosecha
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {mockAds.map(ad => (
          <div key={ad.id} style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            borderRadius: 12, 
            padding: 20,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontWeight: 'bold', color: 'var(--color-text)', fontSize: '1.1rem' }}>{ad.product}</span>
              {ad.tag && (
                <span style={{ 
                  background: ad.tag === 'OFERTA' ? 'rgba(254, 240, 138, 0.2)' : 'rgba(191, 219, 254, 0.2)',
                  color: ad.tag === 'OFERTA' ? '#fde047' : '#93c5fd',
                  padding: '2px 8px',
                  borderRadius: 12,
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {ad.tag}
                </span>
              )}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                <span>🧑‍🌾</span> {ad.farmer}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                <span>📍</span> {ad.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                <span>📦</span> {ad.quantity}
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: 16
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Precio sugerido</div>
                <div style={{ fontWeight: 'bold', color: '#22c55e', fontSize: '1.2rem' }}>{ad.price}</div>
              </div>
              <button style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '8px 16px',
                borderRadius: 6,
                color: 'var(--color-text)',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                Contactar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
