import { useState } from 'react'
import { BUYER_PROFILE } from '../data/mockData'
import { useBuyerStore } from '../store/buyerStore'

export default function BuyerProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const buyHistory = useBuyerStore(s => s.buyHistory)

  return (
    <div className="bd-profile" style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Mi Perfil</h2>
        <button className="buyer-btn-secondary" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
        {/* Columna Izquierda: Datos de usuario */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ background: 'var(--color-bg-elevated)', padding: 24, borderRadius: 12, border: '1px solid var(--color-border)', textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
              <img src={BUYER_PROFILE.avatar} alt="Avatar" style={{ width: 120, height: 120, borderRadius: '50%', border: '4px solid #1d9bf0' }} />
              {isEditing && (
                <button style={{ position: 'absolute', bottom: 0, right: 0, background: '#1d9bf0', border: 'none', color: 'white', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer' }}>📷</button>
              )}
            </div>
            {isEditing ? (
              <input type="text" defaultValue={BUYER_PROFILE.name} style={{ width: '100%', padding: 8, textAlign: 'center', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'white' }} />
            ) : (
              <h3 style={{ margin: '0 0 4px 0' }}>{BUYER_PROFILE.name}</h3>
            )}
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{BUYER_PROFILE.type}</div>
            
            <div style={{ marginTop: 24, textAlign: 'left' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Email</div>
              {isEditing ? (
                <input type="email" defaultValue={BUYER_PROFILE.email} style={{ width: '100%', padding: 8, marginTop: 4, background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'white' }} />
              ) : (
                <div>{BUYER_PROFILE.email}</div>
              )}
            </div>
            <div style={{ marginTop: 16, textAlign: 'left' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Miembro desde</div>
              <div>{BUYER_PROFILE.memberSince}</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button className="buyer-btn-secondary" style={{ width: '100%', color: '#dc2626', borderColor: '#dc2626' }} onClick={() => alert('Cerrando sesión...')}>
              Cerrar Sesión
            </button>
            <button className="buyer-btn-secondary" style={{ width: '100%', color: 'var(--color-text-muted)', border: 'none' }} onClick={() => alert('Eliminar cuenta...')}>
              Eliminar cuenta
            </button>
          </div>
        </div>

        {/* Columna Derecha: Estadísticas y Preferencias */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'var(--color-bg-elevated)', padding: 24, borderRadius: 12, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>Compras Realizadas</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1d9bf0' }}>{buyHistory.length + BUYER_PROFILE.totalPurchases}</div>
            </div>
            <div style={{ background: 'var(--color-bg-elevated)', padding: 24, borderRadius: 12, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>Total Invertido</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>S/ {BUYER_PROFILE.totalSpent.toLocaleString()}</div>
            </div>
            <div style={{ background: 'var(--color-bg-elevated)', padding: 24, borderRadius: 12, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>Proveedores Activos</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{BUYER_PROFILE.activeSuppliers}</div>
            </div>
            <div style={{ background: 'var(--color-bg-elevated)', padding: 24, borderRadius: 12, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>Compra Promedio</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>S/ {BUYER_PROFILE.avgPurchase}</div>
            </div>
          </div>

          {/* Preferences */}
          <div style={{ background: 'var(--color-bg-elevated)', padding: 24, borderRadius: 12, border: '1px solid var(--color-border)' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Preferencias de Compra</h3>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>Zona de Entrega Preferida</div>
              {isEditing ? (
                <input type="text" defaultValue={BUYER_PROFILE.preferredZone} style={{ width: '100%', padding: 12, background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'white', borderRadius: 8 }} />
              ) : (
                <div style={{ fontWeight: 'bold' }}>📍 {BUYER_PROFILE.preferredZone}</div>
              )}
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>Productos Favoritos</div>
              <div className="buyer-chips-container" style={{ margin: 0, padding: 0 }}>
                {BUYER_PROFILE.favoriteProducts.map(p => (
                  <span key={p} className="buyer-chip active">{p}</span>
                ))}
                {isEditing && <span className="buyer-chip">+ Añadir</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
