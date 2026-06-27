import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
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

// Simulated routes (we hardcode for demo purposes, representing Huánuco roads)
const ROUTE_ORIGIN: L.LatLngTuple = [-9.9833, -76.2167]
const ROUTE_DEST: L.LatLngTuple = [-9.9333, -76.25]
const NORMAL_WAYPOINTS: L.LatLngTuple[] = [
  [-9.975, -76.218],
  [-9.965, -76.225],
  [-9.955, -76.230],
  [-9.945, -76.238],
  [-9.938, -76.245],
]

// Alternate route (Simulates going around the blockage)
const ALT_WAYPOINTS: L.LatLngTuple[] = [
  [-9.975, -76.218],
  [-9.970, -76.205], // Detour east
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
  
  const [altDrawerOpen, setAltDrawerOpen] = useState(false)
  const [usingAltRoute, setUsingAltRoute] = useState(false)
  const [distance, setDistance] = useState(0)

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
    L.marker(ROUTE_ORIGIN, { icon: createCustomIcon('🚛', '#2563eb') }).addTo(map)

    // Render alerts
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

  // Watch for block trigger
  useEffect(() => {
    if (routeBlocked && !usingAltRoute) {
      setAltDrawerOpen(true)
    } else {
      setAltDrawerOpen(false)
    }
  }, [routeBlocked, usingAltRoute])

  const acceptAltRoute = () => {
    setUsingAltRoute(true)
    setAltDrawerOpen(false)
    setRouteBlocked(false) // consume the event
  }

  const rejectAltRoute = () => {
    setAltDrawerOpen(false)
    setRouteBlocked(false)
  }

  const formatDist = (m: number) => m > 1000 ? `${(m/1000).toFixed(1)} km` : `${Math.round(m)} m`

  return (
    <div className="ts-dashboard">
      <div ref={mapContainer} className="ts-map-container" />
      
      <div className="ts-bottom-bar">
        <div className="ts-bottom-bar__stat">
          <span className="ts-bottom-bar__stat-label">Distancia</span>
          <span className="ts-bottom-bar__stat-value">{formatDist(distance)}</span>
        </div>
        <div className="ts-bottom-bar__stat">
          <span className="ts-bottom-bar__stat-label">ETA</span>
          <span className="ts-bottom-bar__stat-value">{usingAltRoute ? '45 min' : '30 min'}</span>
        </div>
        <div className="ts-bottom-bar__stat">
          <span className="ts-bottom-bar__stat-label">Ganancia</span>
          <span className="ts-bottom-bar__stat-value">S/ 250</span>
        </div>
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
          <button className="ts-btn ts-btn--secondary" style={{ flex: 1 }} onClick={rejectAltRoute}>
            Ignorar
          </button>
        </div>
      </div>
    </div>
  )
}
