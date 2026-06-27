import { useState, useEffect } from 'react'
import AppSidebar from './AppSidebar'
import FarmerMap from './FarmerMap'
import { useTransporterStore, Carga } from '../store/transporterStore'
import { useEmergencyStore } from '../store/emergencyStore'
import './RoleScreens.css'

interface Props {
  onBack: () => void
}

export default function TransporterScreen({ onBack }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { 
    transportista, 
    estadoViaje, 
    viajeActivo, 
    cargasDisponibles, 
    progresoViaje, 
    aceptarFlete, 
    confirmarCarga, 
    iniciarRuta, 
    activarRutaAlterna, 
    confirmarEntrega, 
    finalizarViaje,
    setRutaBloqueada,
    despejarRuta,
    agregarPuntos
  } = useTransporterStore()
  
  const { isEmergency, triggerEmergency } = useEmergencyStore()

  const [cargaAConfirmar, setCargaAConfirmar] = useState<Carga | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showAlternativeRouteModal, setShowAlternativeRouteModal] = useState(false)
  const [showDeliveryModal, setShowDeliveryModal] = useState(false)
  const [showVictoryModal, setShowVictoryModal] = useState(false)
  const [showRankingModal, setShowRankingModal] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const [reportType, setReportType] = useState('Huaico')
  const [displayedProgress, setDisplayedProgress] = useState(0)

  useEffect(() => {
    if (!isOffline) {
      setDisplayedProgress(progresoViaje)
    }
  }, [progresoViaje, isOffline])

  const getNivel = (pts: number) => {
    if (pts < 200) return { nombre: '🪨 Hierro', color: '#9ca3af', min: 0, max: 200, next: '🥉 Bronce' }
    if (pts < 400) return { nombre: '🥉 Bronce', color: '#b45309', min: 200, max: 400, next: '🥈 Plata' }
    if (pts < 600) return { nombre: '🥈 Plata', color: '#94a3b8', min: 400, max: 600, next: '🥇 Oro' }
    if (pts < 800) return { nombre: '🥇 Oro', color: '#f5a623', min: 600, max: 800, next: '💎 Diamante' }
    if (pts < 1200) return { nombre: '💎 Diamante', color: '#60a5fa', min: 800, max: 1200, next: '👑 Maestro' }
    return { nombre: '👑 Maestro', color: '#c084fc', min: 1200, max: 1200, next: 'MAX' }
  }

  const calcularETA = () => {
    if (!viajeActivo) return ''
    const baseMin = viajeActivo.duracionEstimadaMin
    const minsRestantes = Math.round(baseMin * (1 - progresoViaje / 100))
    if (estadoViaje === 'ruta_alterna') return `${minsRestantes + 30}min (Ruta alterna)`
    if (minsRestantes > 60) return `${Math.floor(minsRestantes/60)}h ${minsRestantes%60}min`
    return `${minsRestantes}min`
  }

  const evaluarDisponibilidad = (carga: Carga) => {
    if (viajeActivo) return { puede: false, motivo: 'Ya tienes un viaje activo en curso.', badge: 'No disponible' }
    if (carga.estadoRuta === 'bloqueada') return { puede: false, motivo: 'Ruta bloqueada por emergencia vial.', badge: 'Ruta bloqueada' }
    if (carga.kg > transportista.capacidadKg) return { puede: false, motivo: 'Carga excede capacidad.', badge: 'Excede capacidad' }
    if (carga.estadoRuta === 'riesgo') return { puede: true, motivo: 'Ruta en riesgo. Se recomienda revisar alternativa.', badge: 'Aceptar con riesgo', isWarning: true }
    return { puede: true, motivo: '', badge: 'Aceptar flete' }
  }

  const handleConfirmarFlete = () => {
    if (cargaAConfirmar) {
      aceptarFlete(cargaAConfirmar)
      setCargaAConfirmar(null)
      window.dispatchEvent(new CustomEvent('toast:show', { detail: 'Flete aceptado. Dirígete al punto de recojo.' }))
    }
  }

  const handleConfirmarEntregaClick = () => {
    if (displayedProgress < 100) {
      window.dispatchEvent(new CustomEvent('toast:show', { detail: 'Aún no puedes confirmar entrega. Debes llegar al 100% de la ruta y tener conexión.' }))
      return
    }
    setShowDeliveryModal(true)
  }

  const handleSignDelivery = () => {
    setShowDeliveryModal(false)
    confirmarEntrega()
    window.dispatchEvent(new CustomEvent('toast:show', { detail: 'Guía de Remisión firmada. Entrega confirmada.' }))
  }

  const handleReportar = () => {
    setShowReportModal(false)
    if (reportType === 'Huaico' || reportType === 'Derrumbe') {
      triggerEmergency(reportType === 'Huaico' ? 'huaico' : 'derrumbe')
    }
    if (viajeActivo) setRutaBloqueada()
    window.dispatchEvent(new CustomEvent('toast:show', { detail: 'Incidencia reportada. Agricultor y comprador notificados.' }))
  }

  const handleVerRutaAlternativa = () => {
    setShowAlternativeRouteModal(true)
  }

  const confirmarRutaAlternativa = () => {
    setShowAlternativeRouteModal(false)
    activarRutaAlterna()
    window.dispatchEvent(new CustomEvent('toast:show', { detail: 'Ruta alternativa activada.' }))
  }

  const handleIniciarRuta = () => {
    iniciarRuta()
    window.dispatchEvent(new CustomEvent('toast:show', { detail: 'Ruta iniciada. Navegando al mapa...' }))
    handleNavegar()
  }

  const handleContactar = () => {
    if (!viajeActivo) {
      window.dispatchEvent(new CustomEvent('toast:show', { detail: 'Primero acepta un flete para contactar.' }))
      return
    }
    setShowContactModal(true)
  }

  const handleNavegar = () => {
    if (!viajeActivo) {
      window.dispatchEvent(new CustomEvent('toast:show', { detail: 'Acepta un flete para iniciar navegación.' }))
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.dispatchEvent(new CustomEvent('toast:show', { detail: `Mostrando ruta hacia ${viajeActivo.destino}.` }))
  }

  return (
    <div className="role-screen transporter-screen" aria-label="Pantalla del Transportista">
      <div className="role-topbar">
        <button className="role-topbar__back" onClick={onBack} type="button">← Volver</button>
        <span className="role-topbar__title" style={{ color: '#ce93d8' }}>🚛 Transportista</span>
        <button className="role-topbar__menu" onClick={() => setSidebarOpen(!sidebarOpen)} type="button">☰</button>
      </div>

      {sidebarOpen && <div className="fsb-overlay" onClick={() => setSidebarOpen(false)} />}
      <div className={`fsb-wrapper fsb-wrapper--transporter ${sidebarOpen ? 'fsb-wrapper--open' : ''}`}>
        <AppSidebar module="transporter" onGoMap={() => {
          setSidebarOpen(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }} />
      </div>

      <div className="transporter-main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="role-greeting role-greeting--transporter">Hola, {transportista.nombre.split(' ')[0]} 👋</h1>
            <p className="role-subtitle">
              {transportista.vehiculo} · {transportista.rating} ⭐<br/>
              <button 
                onClick={() => setShowRankingModal(true)}
                style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  border: `1px solid ${getNivel(transportista.puntos).color}`, 
                  color: getNivel(transportista.puntos).color, 
                  fontWeight: 'bold',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '8px',
                  boxShadow: `0 0 8px ${getNivel(transportista.puntos).color}40`,
                  transition: 'all 0.2s'
                }}
              >
                {getNivel(transportista.puntos).nombre} ({transportista.puntos} pts)
                <span style={{ fontSize: '10px' }}>➜</span>
              </button>
            </p>
          </div>
          <button 
            onClick={() => setIsOffline(!isOffline)}
            style={{
              background: isOffline ? '#fee2e2' : '#dcfce7',
              color: isOffline ? '#ef4444' : '#22c55e',
              border: `1px solid ${isOffline ? '#f87171' : '#4ade80'}`,
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {isOffline ? '🔴 Offline' : '🟢 En línea'}
          </button>
        </div>

        {isOffline && (
           <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', fontSize: '13px', textAlign: 'center', borderRadius: '8px', marginBottom: '16px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
             ⚠️ Sin conexión a internet. Los datos se guardan localmente y se sincronizarán al recuperar la señal.
           </div>
        )}

        {isEmergency && (
          <div className="alert-banner alert-banner--danger" style={{ marginBottom: '16px' }}>
            <span className="alert-banner__icon">🚨</span>
            <span>Incidencia reportada en la vía. Precaución.</span>
          </div>
        )}

        <div style={{ height: ['en_ruta', 'ruta_alterna', 'ruta_bloqueada', 'viaje_pausado'].includes(estadoViaje) ? '450px' : '200px', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.1)', transition: 'height 0.3s ease' }}>
          {viajeActivo ? <FarmerMap compact={!['en_ruta', 'ruta_alterna', 'ruta_bloqueada', 'viaje_pausado'].includes(estadoViaje)} /> : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', color: '#666' }}>
              Acepta un flete para visualizar la ruta.
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
          <button className="action-btn" style={{ background: '#1e293b', border: '1px solid #334155' }} onClick={handleReportar}>🚨 Reportar</button>
          <button className="action-btn" style={{ background: '#1e293b', border: '1px solid #334155' }} onClick={handleNavegar}>🗺️ Navegar</button>
          <button className="action-btn" style={{ background: '#1e293b', border: '1px solid #334155' }} onClick={handleContactar}>📞 Contactar</button>
        </div>

        <h2 className="section-title">Viaje activo</h2>
        <div className="trip-card">
          {!viajeActivo ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#a3a3a3' }}>
              Sin viaje activo.<br/>Acepta una carga disponible para iniciar una ruta.
            </div>
          ) : (
            <>
              <div className="trip-card__header">
                <span>🚛</span>
                <span style={{ textTransform: 'capitalize' }}>
                  {estadoViaje.replace('_', ' ')}
                </span>
              </div>
              <div className="trip-card__route">📍 {viajeActivo.origen} &nbsp;|&nbsp; 🏁 {viajeActivo.destino}</div>
              <div className="trip-card__product">{viajeActivo.producto} – {viajeActivo.kg} kg</div>
              <div style={{ fontSize: '0.9rem', color: '#a3a3a3', marginTop: '8px' }}>
                <div>Agricultor: {viajeActivo.agricultor}</div>
                <div>Pago: S/ {viajeActivo.pago}</div>
                <div>Recojo: {viajeActivo.horaRecojo} | Entrega: {viajeActivo.horaEntregaMaxima}</div>
                {['en_ruta', 'ruta_alterna'].includes(estadoViaje) && (
                  <div style={{ color: isOffline ? '#9ca3af' : '#4ade80', fontWeight: 'bold', marginTop: '4px' }}>
                    {isOffline ? `📡 Señal perdida (Último ETA: ${calcularETA()})` : `ETA: ${calcularETA()}`}
                  </div>
                )}
              </div>

              {['en_ruta', 'ruta_alterna'].includes(estadoViaje) && (
                <div className="fd-ship__progress" style={{ marginTop: '12px' }}>
                  <div className="fd-ship__progress-bar" style={{ 
                    width: `${displayedProgress}%`, 
                    background: isOffline ? '#9ca3af' : (estadoViaje === 'ruta_alterna' ? '#3b82f6' : '#22c55e'),
                    transition: isOffline ? 'none' : 'width 0.5s ease'
                  }} />
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '16px' }}>
                <button className="action-btn action-btn--primary" onClick={() => { confirmarCarga(); window.dispatchEvent(new CustomEvent('toast:show', { detail: 'Carga confirmada' }))}} type="button" disabled={estadoViaje !== 'carga_aceptada'}>Confirmar carga</button>
                <button className="action-btn action-btn--primary" onClick={handleIniciarRuta} type="button" disabled={!['carga_confirmada', 'viaje_pausado'].includes(estadoViaje)}>
                  {estadoViaje === 'viaje_pausado' ? 'Continuar viaje' : 'Iniciar ruta'}
                </button>
                <button className="action-btn action-btn--secondary" onClick={handleVerRutaAlternativa} type="button" disabled={!['carga_aceptada', 'carga_confirmada', 'en_ruta', 'ruta_bloqueada', 'viaje_pausado'].includes(estadoViaje) || estadoViaje === 'ruta_alterna'}>Ver ruta alternativa</button>
                <button className="action-btn action-btn--primary" onClick={handleConfirmarEntregaClick} type="button" style={{ background: estadoViaje === 'entregado' ? '#059669' : '#22c55e', opacity: (displayedProgress < 100 && estadoViaje !== 'entregado') ? 0.5 : 1 }} disabled={displayedProgress < 100 || estadoViaje === 'entregado'}>Confirmar entrega</button>
                
                {estadoViaje === 'ruta_bloqueada' && (
                  <button className="action-btn action-btn--primary" onClick={() => { despejarRuta(); window.dispatchEvent(new CustomEvent('toast:show', { detail: 'Ruta despejada, puedes continuar.' }))}} type="button" style={{ gridColumn: '1 / -1', background: '#f5a623', border: '1px solid #d97706' }}>
                    ✅ Ruta despejada
                  </button>
                )}
                
                <button className="action-btn action-btn--secondary" onClick={() => setShowVictoryModal(true)} type="button" style={{ gridColumn: '1 / -1' }} disabled={estadoViaje !== 'entregado'}>Finalizar viaje</button>
              </div>
            </>
          )}
        </div>

        <div style={{ background: 'linear-gradient(135deg, rgba(30,58,138,0.3) 0%, rgba(30,64,175,0.1) 100%)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', padding: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '32px' }}>⛈️</span>
          <div>
            <h4 style={{ margin: 0, color: '#60a5fa', fontSize: '14px' }}>Alerta Meteorológica Regional</h4>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#bfdbfe', lineHeight: 1.4 }}>80% de probabilidad de lluvias intensas en la zona de Tingo María en las próximas 3 horas. Anticipe sus cargas.</p>
          </div>
        </div>

        <h2 className="section-title">Bolsa de cargas disponibles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {cargasDisponibles.map(carga => {
            const ev = evaluarDisponibilidad(carga)
            return (
              <div className="item-card" key={carga.id} style={{ display: 'flex', flexDirection: 'column', height: '100%', marginBottom: 0 }}>
                <div className="item-card__header">
                  <span className="item-card__product">{carga.producto} X {carga.kg} kg</span>
                  <span className={`item-card__status item-card__status--${carga.estadoRuta === 'libre' ? 'libre' : (carga.estadoRuta === 'riesgo' ? 'riesgo' : 'bloqueada')}`}>
                    {carga.prioridad}
                  </span>
                </div>
                <div className="item-card__details" style={{ flexGrow: 1 }}>
                  <span className="item-card__detail">📍 {carga.origen} → {carga.destino}</span>
                  <span className="item-card__detail">💰 S/ {carga.pago}</span>
                  <span className="item-card__detail">
                    <span className={`route-badge route-badge--${carga.estadoRuta === 'libre' ? 'libre' : (carga.estadoRuta === 'riesgo' ? 'riesgo' : 'bloqueada')}`}>
                      ● Ruta {carga.estadoRuta}
                    </span>
                  </span>
                  {!ev.puede && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{ev.motivo}</span>}
                </div>
                <div className="item-card__actions" style={{ marginTop: 'auto' }}>
                  <button 
                    className={`action-btn action-btn--${ev.puede ? (ev.isWarning ? 'secondary' : 'primary') : 'secondary'}`} 
                    type="button" 
                    disabled={!ev.puede}
                    onClick={() => ev.puede ? setCargaAConfirmar(carga) : null}
                    style={ev.isWarning ? { borderColor: '#f5a623', color: '#f5a623' } : undefined}
                  >
                    {ev.badge}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* MODAL CONFIRMAR FLETE */}
      {cargaAConfirmar && (
        <div className="modal-overlay" onClick={() => setCargaAConfirmar(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Confirmar aceptación del flete</h2>
            <div style={{ marginTop: '16px', fontSize: '0.9rem', color: '#e5e5e5', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>Producto:</strong> {cargaAConfirmar.producto} ({cargaAConfirmar.kg} kg)</div>
              <div><strong>Pago:</strong> S/ {cargaAConfirmar.pago}</div>
              <div><strong>Agricultor:</strong> {cargaAConfirmar.agricultor} ({cargaAConfirmar.telefonoAgricultor})</div>
              <div><strong>Ruta:</strong> {cargaAConfirmar.origen} → {cargaAConfirmar.destino}</div>
              <div><strong>Recojo:</strong> {cargaAConfirmar.horaRecojo} | <strong>Entrega:</strong> {cargaAConfirmar.horaEntregaMaxima}</div>
              <div><strong>Estado de ruta:</strong> <span style={{ textTransform: 'capitalize' }}>{cargaAConfirmar.estadoRuta}</span></div>
              {evaluarDisponibilidad(cargaAConfirmar).isWarning && (
                <div style={{ color: '#f5a623', marginTop: '8px', padding: '8px', background: 'rgba(245,166,35,0.1)', borderRadius: '4px' }}>
                  ⚠️ {evaluarDisponibilidad(cargaAConfirmar).motivo}
                </div>
              )}
            </div>

            <div style={{ marginTop: '20px', background: '#e5e5e5', borderRadius: '8px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontStyle: 'italic', position: 'relative' }}>
              <span>Firma de aceptación aquí...</span>
              <div style={{ position: 'absolute', bottom: 20, left: '10%', width: '80%', borderBottom: '2px solid #333' }} />
            </div>

            <div className="modal-actions" style={{ marginTop: '20px' }}>
              <button className="action-btn action-btn--secondary" onClick={() => setCargaAConfirmar(null)} type="button">Cancelar</button>
              <button className="action-btn action-btn--primary" onClick={handleConfirmarFlete} type="button">Firmar y Aceptar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RUTA ALTERNA */}
      {showAlternativeRouteModal && (
        <div className="modal-overlay" onClick={() => setShowAlternativeRouteModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Rutas Alternativas</h2>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(59,130,246,0.1)', border: '1px solid #3b82f6', borderRadius: '8px' }}>
                <div style={{ fontWeight: 'bold', color: '#60a5fa' }}>Desvío Seguro (Asfaltado)</div>
                <div style={{ fontSize: '0.85rem', color: '#e5e5e5', marginTop: '4px' }}>Hacia: {viajeActivo?.destino || 'Destino'}</div>
                <div style={{ fontSize: '0.85rem', color: '#e5e5e5', marginTop: '4px' }}>ETA: {calcularETA()} + 30 min extra</div>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '4px' }}>Evita la zona de la incidencia reportada.</div>
                <button className="action-btn action-btn--primary" onClick={confirmarRutaAlternativa} type="button" style={{ marginTop: '12px', width: '100%' }}>
                  Usar esta ruta
                </button>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', borderRadius: '8px' }}>
                <div style={{ fontWeight: 'bold', color: '#a3a3a3' }}>Desvío por Trocha (Riesgo alto)</div>
                <div style={{ fontSize: '0.85rem', color: '#e5e5e5', marginTop: '4px' }}>ETA: {calcularETA()} + 10 min extra</div>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '4px' }}>Camino no asfaltado, no apto para {transportista.vehiculo}.</div>
                <button className="action-btn action-btn--secondary" type="button" disabled style={{ marginTop: '12px', width: '100%' }}>
                  No recomendada
                </button>
              </div>
            </div>
            <div className="modal-actions" style={{ marginTop: '20px' }}>
              <button className="action-btn action-btn--secondary" onClick={() => setShowAlternativeRouteModal(false)} type="button">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONTACTAR */}
      {showContactModal && viajeActivo && (
        <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Contactar Agricultor</h2>
            <div style={{ marginTop: '16px', fontSize: '0.9rem', color: '#e5e5e5', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>Nombre:</strong> {viajeActivo.agricultor}</div>
              <div><strong>Teléfono:</strong> {viajeActivo.telefonoAgricultor}</div>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginTop: '8px' }}>
                <p style={{ fontStyle: 'italic', color: '#a3a3a3', margin: 0 }}>
                  "Hola, soy el transportista asignado para recoger {viajeActivo.producto} de {viajeActivo.kg} kg en {viajeActivo.origen}. Estoy en camino y mi ETA estimado es {calcularETA() || viajeActivo.duracionEstimadaMin + 'min'}."
                </p>
              </div>
            </div>
            <div className="modal-actions" style={{ marginTop: '20px' }}>
              <button className="action-btn action-btn--secondary" onClick={() => {
                window.dispatchEvent(new CustomEvent('toast:show', { detail: 'Mensaje copiado' }))
                setShowContactModal(false)
              }} type="button">Copiar mensaje</button>
              <button className="action-btn action-btn--primary" onClick={() => setShowContactModal(false)} type="button">Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL REPORTAR */}
      {showReportModal && (
        <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Reportar Incidencia</h2>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <select 
                value={reportType} 
                onChange={e => setReportType(e.target.value)}
                style={{ padding: '10px', borderRadius: '6px', background: '#111', color: 'white', border: '1px solid #333' }}
              >
                <option>Huaico</option>
                <option>Derrumbe</option>
                <option>Bloqueo</option>
                <option>Lluvia fuerte</option>
                <option>Accidente</option>
              </select>
              <textarea placeholder="Descripción (opcional)" style={{ padding: '10px', borderRadius: '6px', background: '#111', color: 'white', border: '1px solid #333', minHeight: '80px' }} />
            </div>
            <div className="modal-actions" style={{ marginTop: '20px' }}>
              <button className="action-btn action-btn--secondary" onClick={() => setShowReportModal(false)} type="button">Cancelar</button>
              <button className="action-btn action-btn--primary" onClick={handleReportar} type="button" style={{ background: '#ef4444' }}>Enviar Reporte</button>
            </div>
          </div>
        </div>
      )}
      {/* MODAL VICTORIA */}
      {showVictoryModal && viajeActivo && (
        <div className="modal-overlay" onClick={() => setShowVictoryModal(false)}>
          <div className="modal-card" style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎉</div>
            <h2 className="modal-title" style={{ color: '#4ade80' }}>¡Misión Cumplida!</h2>
            <p style={{ color: '#e5e5e5', margin: '12px 0' }}>Has entregado {viajeActivo.producto} a salvo.</p>
            
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', margin: '16px 0', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ color: '#f5a623', fontSize: '20px', fontWeight: 'bold' }}>+50 Pts Reputación</div>
              <div style={{ color: '#60a5fa', fontSize: '14px', marginTop: '8px' }}>Impacto CLAY: Salvaste S/ {viajeActivo.pago} en fletes y productos que corrían riesgo.</div>
            </div>

            <button className="action-btn action-btn--primary" onClick={() => {
              agregarPuntos(50)
              setShowVictoryModal(false)
              finalizarViaje()
            }} style={{ width: '100%' }}>
              Volver al inicio
            </button>
          </div>
        </div>
      )}

      {/* MODAL GUÍA DE REMISIÓN */}
      {showDeliveryModal && viajeActivo && (
        <div className="modal-overlay" onClick={() => setShowDeliveryModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Guía de Remisión Electrónica</h2>
            <p style={{ color: '#a3a3a3', fontSize: '13px', marginTop: '8px' }}>GR Transportista N° 001-49281</p>
            
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#e5e5e5', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <div><strong>Producto:</strong> {viajeActivo.producto}</div>
              <div><strong>Cantidad:</strong> {viajeActivo.kg} kg</div>
              <div><strong>Destino:</strong> {viajeActivo.destino}</div>
            </div>

            <div style={{ marginTop: '20px', background: '#e5e5e5', borderRadius: '8px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontStyle: 'italic', position: 'relative' }}>
              <span>Firma del receptor aquí...</span>
              <div style={{ position: 'absolute', bottom: 20, left: '10%', width: '80%', borderBottom: '2px solid #333' }} />
            </div>

            <div className="modal-actions" style={{ marginTop: '20px' }}>
              <button className="action-btn action-btn--secondary" onClick={() => setShowDeliveryModal(false)} type="button">Cancelar</button>
              <button className="action-btn action-btn--primary" onClick={handleSignDelivery} type="button">Firmar y Entregar</button>
            </div>
          </div>
        </div>
      )}
      {/* MODAL RANKING / GAMIFICACIÓN */}
      {showRankingModal && (
        <div className="modal-overlay" onClick={() => setShowRankingModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ width: '90%', maxWidth: '400px', padding: '0', background: '#0f172a' }}>
            {/* Header del Modal */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: '24px', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>{getNivel(transportista.puntos).nombre.split(' ')[0]}</div>
              <h2 style={{ color: 'white', margin: 0, fontSize: '24px' }}>Mi Rango Actual</h2>
              <div style={{ color: getNivel(transportista.puntos).color, fontSize: '18px', fontWeight: 'bold', marginTop: '4px', textShadow: `0 0 10px ${getNivel(transportista.puntos).color}80` }}>
                {getNivel(transportista.puntos).nombre}
              </div>
              
              {/* Barra de progreso */}
              {getNivel(transportista.puntos).next !== 'MAX' ? (
                <div style={{ marginTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#cbd5e1', marginBottom: '8px' }}>
                    <span>{transportista.puntos} pts</span>
                    <span>Faltan {getNivel(transportista.puntos).max - transportista.puntos} pts para {getNivel(transportista.puntos).next}</span>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.5)', height: '12px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ 
                      width: `${((transportista.puntos - getNivel(transportista.puntos).min) / (getNivel(transportista.puntos).max - getNivel(transportista.puntos).min)) * 100}%`, 
                      background: `linear-gradient(90deg, ${getNivel(transportista.puntos).color}, #fff)`,
                      height: '100%',
                      borderRadius: '6px'
                    }} />
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: '24px', color: '#fcd34d', fontWeight: 'bold', fontSize: '14px' }}>
                  ¡Has alcanzado el rango máximo!
                </div>
              )}
            </div>

            {/* Leaderboard */}
            <div style={{ padding: '24px' }}>
              <h3 style={{ color: '#e5e5e5', marginTop: 0, marginBottom: '16px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🏆 Top Transportistas Regionales
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* #1 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'linear-gradient(90deg, rgba(245, 166, 35, 0.15), transparent)', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #f5a623' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f5a623', width: '24px', textAlign: 'center' }}>1</div>
                  <div style={{ fontSize: '28px', filter: 'drop-shadow(0 0 4px rgba(245, 166, 35, 0.5))' }}>👨🏽‍🦱</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>Carlos Mendoza</div>
                    <div style={{ color: '#a3a3a3', fontSize: '12px' }}>👑 Maestro</div>
                  </div>
                  <div style={{ color: '#f5a623', fontWeight: 'bold', fontSize: '14px' }}>1450 pts</div>
                </div>

                {/* #2 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#9ca3af', width: '24px', textAlign: 'center' }}>2</div>
                  <div style={{ fontSize: '24px' }}>🧔🏻‍♂️</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>Juan Pérez</div>
                    <div style={{ color: '#a3a3a3', fontSize: '12px' }}>💎 Diamante</div>
                  </div>
                  <div style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '14px' }}>1020 pts</div>
                </div>

                {/* #3 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#b45309', width: '24px', textAlign: 'center' }}>3</div>
                  <div style={{ fontSize: '24px' }}>👴🏽</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>Miguel Rojas</div>
                    <div style={{ color: '#a3a3a3', fontSize: '12px' }}>🥇 Oro</div>
                  </div>
                  <div style={{ color: '#f5a623', fontWeight: 'bold', fontSize: '14px' }}>650 pts</div>
                </div>

                {/* TU POSICIÓN */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(59, 130, 246, 0.15)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', width: '24px', textAlign: 'center' }}>4</div>
                  <div style={{ fontSize: '24px' }}>👤</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>{transportista.nombre.split(' ')[0]} (Tú)</div>
                    <div style={{ color: '#a3a3a3', fontSize: '12px' }}>{getNivel(transportista.puntos).nombre}</div>
                  </div>
                  <div style={{ color: getNivel(transportista.puntos).color, fontWeight: 'bold', fontSize: '14px' }}>{transportista.puntos} pts</div>
                </div>
              </div>

              <button className="action-btn action-btn--secondary" onClick={() => setShowRankingModal(false)} type="button" style={{ width: '100%', marginTop: '20px' }}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
