import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useTransporterStore } from '../store/transporterStore'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

function createCustomIcon(emoji: string, color: string): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div style="width:32px;height:32px;background:${color};border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;font-size:16px;">${emoji}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })
}

const ROUTE_ORIGIN: L.LatLngTuple = [-9.9833, -76.2167]
const ROUTE_DEST: L.LatLngTuple = [-9.9333, -76.25]
const NORMAL_WAYPOINTS: L.LatLngTuple[] = [
  [-9.975, -76.218],
  [-9.965, -76.225],
  [-9.955, -76.230],
  [-9.945, -76.238],
  [-9.938, -76.245],
]

const ALT_WAYPOINTS: L.LatLngTuple[] = [
  [-9.975, -76.218],
  [-9.970, -76.205],
  [-9.950, -76.210],
  [-9.940, -76.230],
  [-9.938, -76.245],
]

const OSRM_BASE = 'https://router.project-osrm.org'

async function fetchOsrmRoute(origin: L.LatLngTuple, dest: L.LatLngTuple, waypoints: L.LatLngTuple[]) {
  try {
    const allPts = [origin, ...waypoints, dest]
    const coordsStr = allPts.map(pt => `${pt[1]},${pt[0]}`).join(';')
    const url = `${OSRM_BASE}/route/v1/driving/${coordsStr}?overview=full&geometries=geojson&steps=false`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    if (data.code !== 'Ok' || !data.routes?.length) return null
    return {
      geometry: data.routes[0].geometry.coordinates.map((pt: any[]) => [pt[1], pt[0]] as L.LatLngTuple),
      distance: data.routes[0].distance,
      duration: data.routes[0].duration,
    }
  } catch {
    return null
  }
}

export default function TransporterDashboardView() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const routeLayer = useRef<L.Polyline | null>(null)
  
  const routeBlocked = useTransporterStore(s => s.routeBlocked)
  const setRouteBlocked = useTransporterStore(s => s.setRouteBlocked)
  const alerts = useTransporterStore(s => s.alerts)
  const setIncidentModalOpen = useTransporterStore(s => s.setIncidentModalOpen)
  const tripProgress = useTransporterStore(s => s.tripProgress)
  const setTripProgress = useTransporterStore(s => s.setTripProgress)
  const tripState = useTransporterStore(s => s.tripState)
  const setTripState = useTransporterStore(s => s.setTripState)
  const addPoints = useTransporterStore(s => s.addPoints)
  
  const [altDrawerOpen, setAltDrawerOpen] = useState(false)
  const [usingAltRoute, setUsingAltRoute] = useState(false)
  const [distance, setDistance] = useState(0)
  
  const [showFinalSignature, setShowFinalSignature] = useState(false)
  const [showVictory, setShowVictory] = useState(false)
  const [isSigning, setIsSigning] = useState(false)

  // Initialization
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return

    const map = L.map(mapContainer.current, {
      center: [-9.95, -76.23],
      zoom: 13,
      zoomControl: false,
    })
    L.control.zoom({ position: 'topright' }).addTo(map)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
    
    mapInstance.current = map

    L.marker(ROUTE_ORIGIN, { icon: createCustomIcon('🌱', '#2d7a3a') }).addTo(map)
    L.marker(ROUTE_DEST, { icon: createCustomIcon('🛒', '#f5a623') }).addTo(map)

    alerts.forEach(alert => {
      let emoji = '⚠️'
      let color = '#dc3545'
      if (alert.type === 'HUAICO') emoji = '⛰️'
      if (alert.type === 'LLUVIA') { emoji = '🌧️'; color = '#0ea5e9' }
      
      L.marker(alert.coord as L.LatLngTuple, { icon: createCustomIcon(emoji, color) })
        .bindPopup(`<b>${alert.type}</b><br>${alert.description}`)
        .addTo(map)
    })

    return () => {
      map.remove()
      mapInstance.current = null
    }
  }, [alerts])

  // Route drawing
  useEffect(() => {
    const drawRoute = async () => {
      if (!mapInstance.current) return
      
      const waypoints = usingAltRoute ? ALT_WAYPOINTS : NORMAL_WAYPOINTS
      const route = await fetchOsrmRoute(ROUTE_ORIGIN, ROUTE_DEST, waypoints)
      
      if (routeLayer.current) {
        mapInstance.current.removeLayer(routeLayer.current)
      }

      if (route) {
        routeLayer.current = L.polyline(route.geometry, {
          color: usingAltRoute ? '#3b82f6' : '#2d7a3a',
          dashArray: usingAltRoute ? '10, 10' : '',
          weight: 6,
          opacity: 0.8
        }).addTo(mapInstance.current)
        
        mapInstance.current.fitBounds(routeLayer.current.getBounds(), { padding: [40,40] })
        setDistance(route.distance)
      }
    }
    drawRoute()
  }, [usingAltRoute])

  // Block Trigger
  useEffect(() => {
    if (routeBlocked && !usingAltRoute) {
      setAltDrawerOpen(true)
      setTripState('VIAJE_PAUSADO')
    } else {
      setAltDrawerOpen(false)
    }
  }, [routeBlocked, usingAltRoute])

  const acceptAltRoute = () => {
    setUsingAltRoute(true)
    setAltDrawerOpen(false)
    setRouteBlocked(false)
    setTripState('EN_RUTA')
  }

  const handleFinishTrip = () => {
    setIsSigning(true)
    setTimeout(() => {
      setIsSigning(false)
      setShowFinalSignature(false)
      setShowVictory(true)
    }, 1500)
  }

  const formatDist = (m: number) => m > 1000 ? `${(m/1000).toFixed(1)} km` : `${Math.round(m)} m`
  const is100 = tripProgress >= 100

  return (
    <div className="ts-dashboard">
      <div ref={mapContainer} className="ts-map-container" />
      
      {/* Botones Flotantes de Progreso de Demo */}
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 400, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={() => setTripState(tripState === 'EN_RUTA' ? 'VIAJE_PAUSADO' : 'EN_RUTA')} style={{ padding: '8px 12px', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 8, color: 'white', fontWeight: 'bold' }}>
          {tripState === 'EN_RUTA' ? '⏸️ Pausar' : '▶️ Reanudar'}
        </button>
        <button onClick={() => setTripProgress(tripProgress + 20)} style={{ padding: '8px 12px', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 8, color: 'white' }}>
          +20%
        </button>
        {tripState === 'VIAJE_PAUSADO' && routeBlocked && (
          <button onClick={() => { setRouteBlocked(false); setTripState('EN_RUTA') }} style={{ padding: '8px 12px', background: '#f59e0b', border: '1px solid #d97706', borderRadius: 8, color: 'white', fontWeight: 'bold' }}>
            ✅ Ruta Despejada
          </button>
        )}
      </div>
      
      <div className="ts-bottom-bar" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Progreso del Viaje */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: tripState === 'VIAJE_PAUSADO' ? '#ef4444' : '#a8e6b0' }}>
              {tripState === 'VIAJE_PAUSADO' ? 'Viaje Pausado (Emergencia)' : 'Progreso del viaje'}
            </span>
            <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{tripProgress}%</span>
          </div>
          <div style={{ width: '100%', height: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ 
              width: `${tripProgress}%`, 
              height: '100%', 
              background: tripState === 'VIAJE_PAUSADO' ? '#ef4444' : '#22c55e',
              transition: 'width 0.3s ease-out'
            }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="ts-bottom-bar__stat">
            <span className="ts-bottom-bar__stat-label">Distancia</span>
            <span className="ts-bottom-bar__stat-value">{formatDist(distance)}</span>
          </div>
          <div className="ts-bottom-bar__stat">
            <span className="ts-bottom-bar__stat-label">ETA</span>
            <span className="ts-bottom-bar__stat-value">{tripState === 'VIAJE_PAUSADO' ? '-- min' : (usingAltRoute ? '45 min' : '30 min')}</span>
          </div>
          <div className="ts-bottom-bar__stat">
            <span className="ts-bottom-bar__stat-label">Flete</span>
            <span className="ts-bottom-bar__stat-value">S/ 350</span>
          </div>
        </div>

        <button 
          disabled={!is100 || tripState === 'VIAJE_PAUSADO'}
          onClick={() => setShowFinalSignature(true)}
          style={{ 
            width: '100%', 
            padding: 16, 
            borderRadius: 8, 
            background: is100 ? '#1d9bf0' : 'rgba(255,255,255,0.1)', 
            color: is100 ? 'white' : '#888',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: is100 ? 'pointer' : 'not-allowed',
            opacity: is100 ? 1 : 0.5,
            transition: 'all 0.3s'
          }}
        >
          {is100 ? 'Confirmar Entrega y Cobrar' : 'En camino...'}
        </button>
      </div>

      <button className="ts-fab" onClick={() => setIncidentModalOpen(true)}>
        +
      </button>

      {/* Alternate Route Drawer */}
      <div className={`ts-alt-drawer ${altDrawerOpen ? 'open' : ''}`}>
        <h3 style={{ color: 'var(--color-danger)', margin: '0 0 12px 0', fontSize: '1.2rem' }}>
          ⚠️ Bloqueo Detectado
        </h3>
        <p style={{ margin: '0 0 16px 0', fontSize: '0.9rem' }}>
          Se ha reportado un deslizamiento más adelante en tu ruta principal.
        </p>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 8, marginBottom: 16 }}>
          <strong>Ruta Alternativa:</strong> Desvío por Llacuabamba<br/>
          <span style={{ color: '#f5a623' }}>+15 minutos de tiempo extra</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="ts-btn ts-btn--success" style={{ flex: 1 }} onClick={acceptAltRoute}>
            Usar ruta alternativa
          </button>
          <button className="ts-btn ts-btn--secondary" style={{ flex: 1 }} onClick={() => setAltDrawerOpen(false)}>
            Ignorar
          </button>
        </div>
      </div>

      {/* Firma Final Modal */}
      {showFinalSignature && (
        <div className="modal-overlay" onClick={isSigning ? undefined : () => setShowFinalSignature(false)}>
          <motion.div 
            className="modal-card" 
            onClick={e => e.stopPropagation()}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: 16, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Guía de Remisión Electrónica N° 001-49281
              </div>
            </div>
            
            <h2 style={{ margin: '0 0 16px 0', borderBottom: '1px solid var(--color-border)', paddingBottom: 16 }}>
              Confirmación de Recepción
            </h2>

            <div style={{ fontSize: '0.9rem', marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div><strong>Carga:</strong> Papa Amarilla Tumbay</div>
              <div><strong>Peso Recibido:</strong> 1500 kg</div>
              <div><strong>Receptor:</strong> Supermercados Metro (Sede Huánuco)</div>
            </div>

            <div style={{ background: 'var(--color-bg)', padding: 16, borderRadius: 8, marginBottom: 24 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>
                Firma del receptor (Comprador)
              </div>
              <div style={{ 
                height: 120, 
                border: '2px dashed #1d9bf0', 
                borderRadius: 8, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#1d9bf0',
                background: 'rgba(29, 155, 240, 0.05)'
              }}>
                [ Dibuja tu firma aquí ]
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                className="action-btn action-btn--secondary" 
                onClick={() => setShowFinalSignature(false)} 
                disabled={isSigning}
              >
                Cancelar
              </button>
              <button 
                className="action-btn action-btn--primary" 
                onClick={handleFinishTrip}
                disabled={isSigning}
              >
                {isSigning ? 'Procesando...' : '✍️ Firmar y Entregar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de Victoria (Gamificación) */}
      <AnimatePresence>
        {showVictory && (
          <div className="modal-overlay">
            <motion.div 
              className="modal-card"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              style={{ textAlign: 'center', background: 'linear-gradient(135deg, #1e3a8a, #0f172a)', border: '1px solid #3b82f6' }}
            >
              <div style={{ fontSize: '5rem', marginBottom: 16 }}>🎉</div>
              <h1 style={{ margin: '0 0 8px 0', color: '#60a5fa' }}>¡Viaje Completado!</h1>
              <p style={{ color: '#94a3b8', marginBottom: 24 }}>El cliente ha recibido la carga con éxito y el pago ha sido liberado.</p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 12, flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Impacto Económico</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>S/ 1,200</div>
                  <div style={{ fontSize: '0.75rem', color: '#22c55e' }}>salvados de pérdida</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 12, flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Experiencia CLAY</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#eab308' }}>+50 XP</div>
                  <div style={{ fontSize: '0.75rem', color: '#eab308' }}>Rango actualizado</div>
                </div>
              </div>

              <button 
                className="action-btn action-btn--primary"
                onClick={() => {
                  addPoints(50)
                  setTripProgress(0)
                  setTripState('NOT_STARTED')
                  setShowVictory(false)
                }}
              >
                Genial, volver al inicio
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
