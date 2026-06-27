import { useEffect, useRef, useState, useCallback } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { startTracking, stopTracking, subscribeGps, type GpsState } from '@/offline/gpsTracker'

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

// ─── Waypoints between origin and dest (real Huánuco roads) ──────────────────
// These help OSRM follow the actual highway through the valley
const WAYPOINTS: L.LatLngTuple[] = [
  [-9.975, -76.218],  // Just after origin
  [-9.965, -76.225],  // Turn onto main road
  [-9.955, -76.230],  // Along valley
  [-9.945, -76.238],  // Approaching city
  [-9.938, -76.245],  // Near destination
]

// ─── OSRM free routing engine ────────────────────────────────────────────────
const OSRM_BASE = 'https://router.project-osrm.org'

interface OsrmRoute {
  geometry: [number, number][]  // [lng, lat] pairs
  distance: number              // meters
  duration: number              // seconds
}

async function fetchOsrmRoute(
  origin: L.LatLngTuple,
  dest: L.LatLngTuple,
  waypoints: L.LatLngTuple[],
): Promise<OsrmRoute | null> {
  try {
    // Build coordinates string: origin;waypoints;dest
    const allPts = [origin, ...waypoints, dest]
    const coordsStr = allPts.map(([lat, lng]) => `${lng},${lat}`).join(';')

    const url = `${OSRM_BASE}/route/v1/driving/${coordsStr}?overview=full&geometries=geojson&steps=false`
    const res = await fetch(url)
    if (!res.ok) return null

    const data = await res.json()
    if (data.code !== 'Ok' || !data.routes?.length) return null

    const route = data.routes[0]
    return {
      geometry: route.geometry.coordinates, // GeoJSON: [lng, lat]
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

// ─── Marker Icons ────────────────────────────────────────────────────────────
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

function createTruckIcon(): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:42px;height:42px;
        background:#2563eb;
        border-radius:50%;
        border:3px solid #fff;
        box-shadow:0 0 12px rgba(37,99,235,.6);
        display:flex;align-items:center;justify-content:center;
        font-size:18px;
      ">🚛</div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  })
}

// ─── Component ───────────────────────────────────────────────────────────────
interface FarmerMapProps {
  compact?: boolean
  className?: string
}

export default function FarmerMap({ compact = false, className = '' }: FarmerMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const truckMarker = useRef<L.Marker | null>(null)
  const roadLine = useRef<L.Polyline | null>(null)
  const gpsTrail = useRef<L.Polyline | null>(null)
  const gpsHistory = useRef<L.LatLngTuple[]>([])

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

  // ─── Initialize map & fetch OSRM route ─────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    const map = L.map(mapRef.current, {
      center: HUANUCO_CENTER,
      zoom: compact ? 13 : 12,
      zoomControl: false,
    })

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map)

    // Origin marker
    L.marker(ROUTE_ORIGIN, { icon: createMarkerIcon('#2d7a3a', '🌱') })
      .bindPopup('<b>Origen</b><br>Zone Agrícola')
      .addTo(map)

    // Destination marker
    L.marker(ROUTE_DEST, { icon: createMarkerIcon('#f5a623', '🛒') })
      .bindPopup('<b>Destino</b><br>Huánuco Centro')
      .addTo(map)

    // Truck marker at origin
    const truck = L.marker(ROUTE_ORIGIN, { icon: createTruckIcon() })
      .bindPopup('<b>📍 Mi ubicación</b><br>GPS activo')
      .addTo(map)
    truckMarker.current = truck

    // GPS trail (green line behind truck when tracking)
    const trail = L.polyline([], {
      color: '#4ade80',
      weight: 3,
      opacity: 0.8,
    }).addTo(map)
    gpsTrail.current = trail

    mapInstance.current = map

    // ─── Fetch real road route from OSRM ─────────────────────────────────────
    fetchOsrmRoute(ROUTE_ORIGIN, ROUTE_DEST, WAYPOINTS).then((route) => {
      setRouteLoading(false)
      if (!route) return

      // Convert GeoJSON [lng, lat] → Leaflet [lat, lng]
      const latLngs: L.LatLngTuple[] = route.geometry.map(
        ([lng, lat]) => [lat, lng],
      )

      // Draw road-following polyline
      const road = L.polyline(latLngs, {
        color: '#2d7a3a',
        weight: 5,
        opacity: 0.75,
        lineJoin: 'round',
        lineCap: 'round',
      }).addTo(map)
      roadLine.current = road

      // Set route info
      setRouteInfo({ distance: route.distance, duration: route.duration })

      // Fit map to route bounds
      map.fitBounds(road.getBounds(), { padding: [40, 40] })
    })

    return () => {
      map.remove()
      mapInstance.current = null
    }
  }, [compact])

  // ─── Handle GPS updates ────────────────────────────────────────────────────
  const handleGpsUpdate = useCallback(
    (state: GpsState) => {
      setGpsState(state)

      if (!mapInstance.current) return

      const pos: L.LatLngTuple = [state.lat, state.lng]

      // Move truck marker
      if (truckMarker.current) {
        truckMarker.current.setLatLng(pos)
        truckMarker.current.setPopupContent(
          `<b>📍 Mi ubicación</b><br>
           Lat: ${state.lat.toFixed(4)}<br>
           Lng: ${state.lng.toFixed(4)}<br>
           ${state.isOnline ? '🟢 En línea' : '🔴 Sin conexión'}<br>
           Pendientes: ${state.pendingCount}`,
        )
      }

      // Build GPS trail
      gpsHistory.current.push(pos)
      if (gpsTrail.current) {
        gpsTrail.current.setLatLngs(gpsHistory.current)
      }

      mapInstance.current.panTo(pos)
    },
    [],
  )

  // ─── Start/stop GPS ────────────────────────────────────────────────────────
  const toggleTracking = useCallback(() => {
    if (trackingActive) {
      stopTracking()
      setTrackingActive(false)
    } else {
      startTracking()
      setTrackingActive(true)
    }
  }, [trackingActive])

  // ─── Subscribe to GPS ──────────────────────────────────────────────────────
  useEffect(() => {
    const unsub = subscribeGps(handleGpsUpdate)
    return unsub
  }, [handleGpsUpdate])

  useEffect(() => {
    return () => { stopTracking() }
  }, [])

  // ─── Helpers ───────────────────────────────────────────────────────────────
  const timeSince = (ts: number) => {
    const secs = Math.floor((Date.now() - ts) / 1000)
    if (secs < 60) return `${secs}s`
    return `${Math.floor(secs / 60)}m ${secs % 60}s`
  }

  const wrapperClass = `farmer-map ${compact ? 'farmer-map--compact' : ''} ${className}`.trim()

  return (
    <div className={wrapperClass} style={{ position: 'relative', width: '100%' }}>
      {/* GPS Status Bar */}
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
          background: gpsState.isOnline
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
          <span style={{ fontSize: compact ? 12 : 14 }}>{gpsState.isOnline ? '🟢' : '🔴'}</span>
          <span style={{ fontWeight: 600 }}>
            {gpsState.isOnline ? 'En línea' : 'Sin conexión — GPS activo'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {gpsState.pendingCount > 0 && (
            <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 6, padding: '2px 6px', fontSize: 11 }}>
              📦 {gpsState.pendingCount} pendiente{gpsState.pendingCount > 1 ? 's' : ''}
            </span>
          )}
          {!compact && (
            <span style={{ fontSize: 11, opacity: 0.8 }}>
              hace {timeSince(gpsState.timestamp)}
            </span>
          )}
        </div>
      </div>

      {/* Map container */}
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: compact ? '100%' : 320,
          borderRadius: compact ? 10 : 12,
          overflow: 'hidden',
        }}
      />

      {/* Route Info Card — below map */}
      {!compact && (
        <div style={{
          marginTop: 8,
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
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
                🌐 OSRM · Carretera real
              </span>
            </>
          ) : (
            <span style={{ fontSize: 11, color: '#f5a0a8', fontFamily: 'monospace' }}>
              ⚠️ No se pudo calcular la ruta. Usando línea recta.
            </span>
          )}
        </div>
      )}

      {/* Toggle GPS button */}
      {!compact && (
        <button
          className="farmer-map__toggle"
          onClick={toggleTracking}
          type="button"
          style={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            background: trackingActive ? '#dc3545' : '#2d7a3a',
            color: 'white',
            border: '2px solid white',
            borderRadius: 20,
            padding: '8px 20px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,.3)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {trackingActive ? '⏹ Detener GPS' : '▶ Iniciar GPS'}
        </button>
      )}

      {/* Coordinates footer — only full mode */}
      {!compact && (
        <div
          className="farmer-map__coords"
          style={{
            marginTop: 6,
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
