import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTransporterStore, DriverStatus } from '../store/transporterStore'
import './Transporter.css'

export default function TransporterHeader() {
  const activeTab = useTransporterStore(s => s.activeTab)
  const driverStatus = useTransporterStore(s => s.driverStatus)
  const setDriverStatus = useTransporterStore(s => s.setDriverStatus)
  const unreadAlerts = useTransporterStore(s => s.unreadAlertsCount)
  const setActiveTab = useTransporterStore(s => s.setActiveTab)
  const points = useTransporterStore(s => s.points)
  const isOffline = useTransporterStore(s => s.isOffline)
  const setIsOffline = useTransporterStore(s => s.setIsOffline)
  
  const [showRankModal, setShowRankModal] = useState(false)

  const getRank = (pts: number) => {
    if (pts < 200) return { name: 'Hierro', emoji: '🪨', color: '#a1a1aa' }
    if (pts < 500) return { name: 'Bronce', emoji: '🥉', color: '#b45309' }
    if (pts < 1000) return { name: 'Plata', emoji: '🥈', color: '#94a3b8' }
    if (pts < 2000) return { name: 'Oro', emoji: '🥇', color: '#eab308' }
    if (pts < 5000) return { name: 'Diamante', emoji: '💎', color: '#38bdf8' }
    return { name: 'Maestro', emoji: '👑', color: '#a855f7' }
  }

  const rank = getRank(points)
  const nextRankPts = rank.name === 'Hierro' ? 200 : rank.name === 'Bronce' ? 500 : rank.name === 'Plata' ? 1000 : rank.name === 'Oro' ? 2000 : rank.name === 'Diamante' ? 5000 : 5000
  const progressToNext = Math.min(100, (points / nextRankPts) * 100)

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Inicio'
      case 'rutas': return 'Explorar Rutas'
      case 'envios': return 'Mis Envíos Activos'
      case 'alertas': return 'Alertas Viales'
      case 'historial': return 'Historial de Viajes'
      case 'perfil': return 'Mi Perfil'
      case 'config': return 'Configuración'
      default: return 'Transportista'
    }
  }

  return (
    <header className="transporter-header">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 className="transporter-header__title">{getTitle()}</h1>
        
        {/* Rango Gamificado */}
        <button 
          onClick={() => setShowRankModal(true)}
          style={{ 
            background: 'rgba(255,255,255,0.05)', 
            border: `1px solid ${rank.color}`, 
            borderRadius: 16, 
            padding: '4px 12px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            fontSize: '0.85rem',
            width: 'fit-content',
            marginTop: 4,
            boxShadow: `0 0 10px ${rank.color}40`
          }}
        >
          <span>{rank.emoji} {rank.name}</span>
          <span style={{ color: 'var(--color-text-muted)' }}>({points} pts)</span>
        </button>
      </div>
      
      <div className="transporter-header__actions">
        {/* Toggle PWA Offline Simulator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8 }}>
          <span style={{ fontSize: '0.85rem', color: isOffline ? '#ef4444' : '#22c55e', fontWeight: 'bold' }}>
            {isOffline ? 'Offline' : 'Online'}
          </span>
          <label className="transporter-toggle">
            <input type="checkbox" checked={!isOffline} onChange={() => setIsOffline(!isOffline)} />
            <span className="transporter-toggle__slider"></span>
          </label>
        </div>

        <select 
          className="transporter-status-select"
          value={driverStatus}
          onChange={(e) => setDriverStatus(e.target.value as DriverStatus)}
          style={{
            borderColor: driverStatus === 'en_ruta' ? '#2d7a3a' : 
                         driverStatus === 'disponible' ? '#3b82f6' : '#6c757d',
            color: driverStatus === 'en_ruta' ? '#2d7a3a' : 
                   driverStatus === 'disponible' ? '#3b82f6' : '#6c757d'
          }}
        >
          <option value="en_ruta">🟢 En ruta</option>
          <option value="disponible">🔵 Disponible</option>
          <option value="fuera_servicio">⚪ Fuera de servicio</option>
        </select>

        <button 
          className="transporter-bell" 
          onClick={() => setActiveTab('alertas')}
          title="Ver alertas"
        >
          🔔
          {unreadAlerts > 0 && (
            <span className="transporter-bell__badge">{unreadAlerts}</span>
          )}
        </button>
      </div>

      {/* Modal Ranking */}
      <AnimatePresence>
        {showRankModal && (
          <div className="modal-overlay" onClick={() => setShowRankModal(false)}>
            <motion.div 
              className="modal-card" 
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ background: '#0f172a', border: '1px solid #1e293b' }}
            >
              <button className="modal-close" onClick={() => setShowRankModal(false)}>✕</button>
              <h2 style={{ textAlign: 'center', margin: '0 0 8px 0', color: 'white' }}>Ranking CLAY Huánuco</h2>
              <p style={{ textAlign: 'center', color: '#94a3b8', margin: '0 0 24px 0' }}>Compite por mejores fletes y beneficios.</p>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: 24, borderRadius: 16, marginBottom: 24, textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: 8, textShadow: `0 0 20px ${rank.color}` }}>{rank.emoji}</div>
                <h3 style={{ margin: '0 0 8px 0', color: rank.color }}>Nivel {rank.name}</h3>
                <div style={{ color: 'white', fontWeight: 'bold' }}>{points} / {nextRankPts} pts</div>
                <div style={{ width: '100%', height: 8, background: '#1e293b', borderRadius: 4, marginTop: 12, overflow: 'hidden' }}>
                  <div style={{ width: `${progressToNext}%`, height: '100%', background: rank.color, transition: 'width 0.3s' }} />
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 8 }}>
                  A {nextRankPts - points} pts del próximo nivel
                </div>
              </div>

              <div>
                <h4 style={{ color: '#94a3b8', marginBottom: 12 }}>Top 4 Regional</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* Top 1 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: 'linear-gradient(90deg, rgba(234, 179, 8, 0.2) 0%, transparent 100%)', borderRadius: 8, border: '1px solid rgba(234, 179, 8, 0.3)' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold', color: '#eab308' }}>#1</span>
                      <span style={{ color: 'white' }}>💎 Carlos Ruiz</span>
                    </div>
                    <span style={{ color: '#eab308', fontWeight: 'bold' }}>4250 pts</span>
                  </div>
                  {/* Top 2 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold', color: '#94a3b8' }}>#2</span>
                      <span style={{ color: 'white' }}>🥇 Miguel Ángel</span>
                    </div>
                    <span style={{ color: '#94a3b8', fontWeight: 'bold' }}>1890 pts</span>
                  </div>
                  {/* Top 3 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold', color: '#b45309' }}>#3</span>
                      <span style={{ color: 'white' }}>🥇 Rosa Torres</span>
                    </div>
                    <span style={{ color: '#b45309', fontWeight: 'bold' }}>1200 pts</span>
                  </div>
                  {/* Yo (Top 4) */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: 'rgba(29, 155, 240, 0.1)', borderRadius: 8, border: '1px solid #1d9bf0' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold', color: '#1d9bf0' }}>#4</span>
                      <span style={{ color: 'white' }}>{rank.emoji} Tú</span>
                    </div>
                    <span style={{ color: '#1d9bf0', fontWeight: 'bold' }}>{points} pts</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  )
}
