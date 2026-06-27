import { useEffect, useRef, useState, useCallback } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { startTracking, stopTracking, subscribeGps, type GpsState } from '@/offline/gpsTracker'
import { useTransporterStore } from '../store/transporterStore'

// ─── Fix Leaflet default marker icon path for Vite ────────────────────────────
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

// ─── Huánuco coordinates ─────────────────────────────────────────────────────
const HUANUCO_CENTER: L.LatLngTuple = [-9.9333, -76.25]

// ─── Route: Agricultor (origin) → Comprador (dest) ──────────────────────────
const ROUTE_ORIGIN: L.LatLngTuple = [-9.9833, -76.2167]
const ROUTE_DEST: L.LatLngTuple = [-9.9333, -76.25]

const WAYPOINTS: L.LatLngTuple[] = [
  [-9.975, -76.218],
  [-9.965, -76.225],
  [-9.955, -76.230],
  [-9.945, -76.238],
  [-9.938, -76.245],
]

const OSRM_BASE = 'https://router.project-osrm.org'

interface OsrmRoute {
  geometry: [number, number][]
  distance: number
  duration: number
}

async function fetchOsrmRoute(
  origin: L.LatLngTuple,
  dest: L.LatLngTuple,
  waypoints: L.LatLngTuple[],
): Promise<OsrmRoute | null> {
  try {
    const allPts = [origin, ...waypoints, dest]
    const coordsStr = allPts.map(([lat, lng]) => `${lng},${lat}`).join(';')

    const url = `${OSRM_BASE}/route/v1/driving/${coordsStr}?overview=full&geometries=geojson&steps=false`
    const res = await fetch(url)
    if (!res.ok) return null

    const data = await res.json()
    if (data.code !== 'Ok' || !data.routes?.length) return null

    const route = data.routes[0]
    return {
      geometry: route.geometry.coordinates,
      distance: route.distance,
      duration: route.duration,
    }
  } catch {
    return null
  }
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`
  return `${(meters / 1000).toFixed(1)} km`
}

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.round((seconds % 3600) / 60)
  if (hrs > 0) return `${hrs}h ${mins}min`
  return `${mins} min`
}

function createMarkerIcon(color: string, label: string): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:36px;height:36px;
        background:${color};
        border-radius:50%;
        border:3px solid white;
        box-shadow:0 2px 6px rgba(0,0,0,.4);
        display:flex;align-items:center;justify-content:center;
        font-size:16px;
        color:white;font-weight:bold;
      ">${label}</div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })
}

function createTruckIcon(color = '#2563eb'): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:42px;height:42px;
        background:${color};
        border-radius:50%;
        border:3px solid #fff;
        box-shadow:0 0 12px ${color}90;
        display:flex;align-items:center;justify-content:center;
        font-size:18px;
        transition: all 0.3s;
      ">🚛</div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  })
}

interface FarmerMapProps {
  compact?: boolean
  className?: string
  focusType?: 'BLOQUEADA' | 'RIESGO' | null
}

export default function FarmerMap({ compact = false, className = '', focusType = null }: FarmerMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const truckMarker = useRef<L.Marker | null>(null)
  const roadLine = useRef<L.Polyline | null>(null)
  const gpsTrail = useRef<L.Polyline | null>(null)
  const gpsHistory = useRef<L.LatLngTuple[]>([])
  const routeLatLngs = useRef<L.LatLngTuple[]>([])

  const [gpsState, setGpsState] = useState<GpsState>({
    lat: HUANUCO_CENTER[0],
    lng: HUANUCO_CENTER[1],
    timestamp: Date.now(),
    isOnline: navigator.onLine,
    pendingCount: 0,
  })

  const [trackingActive, setTrackingActive] = useState(false)
  const [routeInfo, setRouteInfo] = useState<{ distance: number; duration: number } | null>(null)
  const [routeLoading, setRouteLoading] = useState(true)

  // ─── Efecto Espejo (Sincronización con TransporterStore) ───────────────────
  const tripProgress = useTransporterStore(s => s.tripProgress)
  const tripState = useTransporterStore(s => s.tripState)

  // ─── Initialize map & fetch OSRM route ─────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    const map = L.map(mapRef.current, {
      center: HUANUCO_CENTER,
      zoom: compact ? 13 : 12,
      zoomControl: false,
    })

    L.control.zoom({ position: 'bottomright' }).addTo(map)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)

    L.marker(ROUTE_ORIGIN, { icon: createMarkerIcon('#2d7a3a', '🌱') }).addTo(map)
    L.marker(ROUTE_DEST, { icon: createMarkerIcon('#f5a623', '🛒') }).addTo(map)

    const truck = L.marker(ROUTE_ORIGIN, { icon: createTruckIcon() })
      .bindPopup('<b>📍 Transportista Asignado</b><br>GPS Sincronizado')
      .addTo(map)
    truckMarker.current = truck

    const trail = L.polyline([], {
      color: '#4ade80',
      weight: 3,
      opacity: 0.8,
    }).addTo(map)
    gpsTrail.current = trail

    mapInstance.current = map

    fetchOsrmRoute(ROUTE_ORIGIN, ROUTE_DEST, WAYPOINTS).then((route) => {
      setRouteLoading(false)
      if (!route) return

      const latLngs: L.LatLngTuple[] = route.geometry.map(([lng, lat]) => [lat, lng])
      routeLatLngs.current = latLngs

      const road = L.polyline(latLngs, {
        color: '#2d7a3a',
        weight: 5,
        opacity: 0.75,
      }).addTo(map)
      roadLine.current = road

      setRouteInfo({ distance: route.distance, duration: route.duration })

      if (!focusType) {
        map.fitBounds(road.getBounds(), { padding: [40, 40] })
      }
    })

    return () => {
      map.remove()
      mapInstance.current = null
    }
  }, [compact])

  // ─── Update Truck marker on Progress change (Efecto Espejo) ────────────────
  useEffect(() => {
    if (!truckMarker.current || routeLatLngs.current.length === 0) return

    // Si el viaje está pausado, lo mostramos en rojo
    truckMarker.current.setIcon(createTruckIcon(tripState === 'VIAJE_PAUSADO' ? '#ef4444' : '#2563eb'))

    // Interpolar la posición en el arreglo de coords
    const index = Math.floor((tripProgress / 100) * (routeLatLngs.current.length - 1))
    const currentPos = routeLatLngs.current[index]

    if (currentPos) {
      truckMarker.current.setLatLng(currentPos)
      
      // Añadir al trail
      gpsHistory.current.push(currentPos)
      if (gpsTrail.current) {
        gpsTrail.current.setLatLngs(gpsHistory.current)
      }
    }
  }, [tripProgress, tripState])

  useEffect(() => {
    if (!mapInstance.current) return
    const map = mapInstance.current

    if (focusType) {
      const ALERTAS = [
        { id: 1, lat: -9.945, lng: -76.238, type: 'BLOQUEADA' },
        { id: 2, lat: -9.955, lng: -76.230, type: 'RIESGO' },
        { id: 3, lat: -9.965, lng: -76.225, type: 'RIESGO' },
        { id: 4, lat: -9.975, lng: -76.218, type: 'RIESGO' },
      ]
      const targetAlert = ALERTAS.find(a => a.type === focusType)
      if (targetAlert) {
        map.flyTo([targetAlert.lat, targetAlert.lng], 15, { animate: true, duration: 1 })
      }
    }
  }, [focusType])

  useEffect(() => {
    if (!mapInstance.current) return
    const map = mapInstance.current
    
    const ALERTAS: { id: number; lat: number; lng: number; type: 'BLOQUEADA' | 'RIESGO'; color: string; label: string }[] = [
      { id: 1, lat: -9.945, lng: -76.238, type: 'BLOQUEADA', color: '#ef4444', label: '⚠️' },
      { id: 2, lat: -9.955, lng: -76.230, type: 'RIESGO', color: '#eab308', label: '⚠️' },
      { id: 3, lat: -9.965, lng: -76.225, type: 'RIESGO', color: '#eab308', label: '⚠️' },
      { id: 4, lat: -9.975, lng: -76.218, type: 'RIESGO', color: '#eab308', label: '⚠️' },
    ]

    ALERTAS.forEach(alerta => {
      L.marker([alerta.lat, alerta.lng], { icon: createMarkerIcon(alerta.color, alerta.label) })
        .bindPopup(`<b>Alerta: ${alerta.type}</b><br>Tramo afectado`)
        .addTo(map)
    })
  }, [])

  const handleGpsUpdate = useCallback(
    (state: GpsState) => {
      setGpsState(state)
    },
    [],
  )

  const toggleTracking = useCallback(() => {
    if (trackingActive) {
      stopTracking()
      setTrackingActive(false)
    } else {
      startTracking()
      setTrackingActive(true)
    }
  }, [trackingActive])

  useEffect(() => {
    const unsub = subscribeGps(handleGpsUpdate)
    return unsub
  }, [handleGpsUpdate])

  useEffect(() => {
    return () => { stopTracking() }
  }, [])

  const timeSince = (ts: number) => {
    const secs = Math.floor((Date.now() - ts) / 1000)
    if (secs < 60) return `${secs}s`
    return `${Math.floor(secs / 60)}m ${secs % 60}s`
  }

  const wrapperClass = `farmer-map ${compact ? 'farmer-map--compact' : ''} ${className}`.trim()

  return (
    <div className={wrapperClass} style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      
      {!compact && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
          }}>
            {routeLoading ? (
              <span style={{ fontSize: 11, color: '#888', fontFamily: 'monospace' }}>
                🔄 Calculando ruta por carretera...
              </span>
            ) : routeInfo ? (
              <>
                <span style={{
                  background: 'rgba(45,122,58,0.15)',
                  border: '1px solid rgba(45,122,58,0.3)',
                  borderRadius: 8,
                  padding: '5px 12px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#a8e6b0',
                  fontFamily: 'monospace',
                }}>
                  🛣️ {formatDistance(routeInfo.distance)}
                </span>
                <span style={{
                  background: 'rgba(37,99,235,0.15)',
                  border: '1px solid rgba(37,99,235,0.3)',
                  borderRadius: 8,
                  padding: '5px 12px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#90caf9',
                  fontFamily: 'monospace',
                }}>
                  ⏱️ {formatDuration(routeInfo.duration)}
                </span>
                <span style={{
                  background: 'rgba(245,166,35,0.15)',
                  border: '1px solid rgba(245,166,35,0.3)',
                  borderRadius: 8,
                  padding: '5px 12px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#f5c86a',
                  fontFamily: 'monospace',
                }}>
                  🌐 Sincronizado con Transportista
                </span>
              </>
            ) : (
              <span style={{ fontSize: 11, color: '#f5a0a8', fontFamily: 'monospace' }}>
                ⚠️ No se pudo calcular la ruta. Usando línea recta.
              </span>
            )}
          </div>

          <button
            className="farmer-map__toggle"
            onClick={toggleTracking}
            type="button"
            style={{
              background: trackingActive ? '#dc3545' : '#2d7a3a',
              color: 'white',
              border: '2px solid transparent',
              borderRadius: 20,
              padding: '6px 16px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {trackingActive ? '⏹ Detener GPS' : '▶ Iniciar GPS'}
          </button>
        </div>
      )}

      <div style={{ position: 'relative', width: '100%', flexGrow: 1 }}>
        <div
          className="farmer-map__statusbar"
          style={{
            position: 'absolute',
            top: compact ? 6 : 8,
            left: compact ? 6 : 8,
            right: compact ? 6 : 8,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: tripState === 'VIAJE_PAUSADO' 
              ? 'rgba(239,68,68,0.92)' 
              : gpsState.isOnline
                ? 'rgba(45,122,58,0.92)'
                : 'rgba(180,40,40,0.92)',
            color: 'white',
            borderRadius: compact ? 8 : 10,
            padding: compact ? '6px 10px' : '8px 12px',
            fontSize: compact ? 11 : 12,
            fontFamily: 'system-ui, sans-serif',
            boxShadow: '0 2px 8px rgba(0,0,0,.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: compact ? 12 : 14 }}>
              {tripState === 'VIAJE_PAUSADO' ? '⚠️' : (gpsState.isOnline ? '🟢' : '🔴')}
            </span>
            <span style={{ fontWeight: 600 }}>
              {tripState === 'VIAJE_PAUSADO' 
                ? 'El camión se ha detenido por un incidente' 
                : (gpsState.isOnline ? `Carga en Movimiento: ${tripProgress}%` : 'Sin conexión — GPS activo')}
            </span>
          </div>
        </div>

        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: compact ? '100%' : 'calc(100vh - 350px)',
            minHeight: compact ? undefined : 450,
            borderRadius: compact ? 10 : 12,
            overflow: 'hidden',
          }}
        />
      </div>

      {!compact && (
        <div
          className="farmer-map__coords"
          style={{
            fontSize: 11,
            color: '#888',
            textAlign: 'center',
            fontFamily: 'monospace',
          }}
        >
          📍 {gpsState.lat.toFixed(5)}, {gpsState.lng.toFixed(5)} · Última actualización: {timeSince(gpsState.timestamp)}
        </div>
      )}
    </div>
  )
}
