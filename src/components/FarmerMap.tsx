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

// ─── Huánuco center ──────────────────────────────────────────────────────────
const HUANUCO_CENTER: L.LatLngTuple = [-9.9333, -76.25]

// ─── Route points (Agricultor → Comprador, shared with buyer) ────────────────
const ROUTE_ORIGIN: L.LatLngTuple = [-9.9833, -76.2167]
const ROUTE_DEST: L.LatLngTuple = [-9.9333, -76.25]

function createMarkerIcon(color: string, label: string): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        position:relative;
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
        position:relative;
        width:42px;height:42px;
        background:#2563eb;
        border-radius:50%;
        border:3px solid #fff;
        box-shadow:0 0 12px rgba(37,99,235,.6);
        display:flex;align-items:center;justify-content:center;
        font-size:18px;
        animation:pulse 2s infinite;
      ">🚛</div>
      <style>
        @keyframes pulse {
          0%,100%{box-shadow:0 0 12px rgba(37,99,235,.6)}
          50%{box-shadow:0 0 24px rgba(37,99,235,.9)}
        }
      </style>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  })
}

interface FarmerMapProps {
  compact?: boolean
  className?: string
}

export default function FarmerMap({ compact = false, className = '' }: FarmerMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const truckMarker = useRef<L.Marker | null>(null)
  const routeLine = useRef<L.Polyline | null>(null)
  const gpsHistory = useRef<L.LatLngTuple[]>([])

  const [gpsState, setGpsState] = useState<GpsState>({
    lat: HUANUCO_CENTER[0],
    lng: HUANUCO_CENTER[1],
    timestamp: Date.now(),
    isOnline: navigator.onLine,
    pendingCount: 0,
  })

  const [trackingActive, setTrackingActive] = useState(false)

  // Initialize map
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

    // Route line
    const line = L.polyline([ROUTE_ORIGIN, ROUTE_DEST], {
      color: '#2d7a3a',
      weight: 4,
      opacity: 0.7,
      dashArray: '10,8',
    }).addTo(map)
    routeLine.current = line

    // Truck marker at origin
    const truck = L.marker(ROUTE_ORIGIN, { icon: createTruckIcon() })
      .bindPopup('<b>📍 Mi ubicación</b><br>GPS activo')
      .addTo(map)
    truckMarker.current = truck

    mapInstance.current = map

    return () => {
      map.remove()
      mapInstance.current = null
    }
  }, [compact])

  // Handle GPS updates
  const handleGpsUpdate = useCallback(
    (state: GpsState) => {
      setGpsState(state)

      if (!mapInstance.current) return

      const pos: L.LatLngTuple = [state.lat, state.lng]

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

      gpsHistory.current.push(pos)

      if (routeLine.current) {
        routeLine.current.setLatLngs([ROUTE_ORIGIN, ...gpsHistory.current, ROUTE_DEST])
      }

      mapInstance.current.panTo(pos)
    },
    [],
  )

  // Start/stop GPS tracking
  const toggleTracking = useCallback(() => {
    if (trackingActive) {
      stopTracking()
      setTrackingActive(false)
    } else {
      startTracking()
      setTrackingActive(true)
    }
  }, [trackingActive])

  // Subscribe to GPS updates
  useEffect(() => {
    const unsub = subscribeGps(handleGpsUpdate)
    return unsub
  }, [handleGpsUpdate])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTracking()
    }
  }, [])

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
            <span
              style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 6,
                padding: '2px 6px',
                fontSize: 11,
              }}
            >
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
