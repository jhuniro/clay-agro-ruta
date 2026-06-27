import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Order } from '../types'
import { MY_ORDERS } from '../data/mockData'

const OSRM_BASE = 'https://router.project-osrm.org'
const HUANUCO_CENTER = { lat: -9.9306, lng: -76.2415 }

async function fetchOsrmGeometry(
  origin: { lat: number; lng: number },
  dest: { lat: number; lng: number },
): Promise<{ coordinates: [number, number][]; distance: number; duration: number } | null> {
  try {
    const coords = `${origin.lng},${origin.lat};${dest.lng},${dest.lat}`
    const url = `${OSRM_BASE}/route/v1/driving/${coords}?overview=full&geometries=geojson&steps=false`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    if (data.code !== 'Ok' || !data.routes?.length) return null
    const r = data.routes[0]
    return { coordinates: r.geometry.coordinates, distance: r.distance, duration: r.duration }
  } catch {
    return null
  }
}

function fmtDist(m: number) { return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km` }
function fmtDur(s: number) {
  const h = Math.floor(s / 3600), min = Math.round((s % 3600) / 60)
  return h > 0 ? `${h}h ${min}min` : `${min} min`
}

interface Props {
  order?: Order
  height?: number | string
}

export default function BuyerMap({ order, height = '100%' }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [routeInfo, setRouteInfo] = useState<{ distance: number; duration: number } | null>(null)

  const centerMap = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [HUANUCO_CENTER.lng, HUANUCO_CENTER.lat], zoom: 9 })
    }
  }

  useEffect(() => {
    if (!mapContainer.current) return

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [HUANUCO_CENTER.lng, HUANUCO_CENTER.lat],
      zoom: 9,
    })

    mapRef.current = map
    map.addControl(new maplibregl.NavigationControl(), 'top-right')

    // Mi Ubicación (Mock)
    new maplibregl.Marker({ color: '#1d9bf0' })
      .setLngLat([HUANUCO_CENTER.lng, HUANUCO_CENTER.lat])
      .setPopup(new maplibregl.Popup().setHTML(`<b>Mi Ubicación</b><br>Huánuco Centro`))
      .addTo(map)

    map.on('load', () => {
      // Función para pintar una ruta
      const drawRoute = (ord: Order, index: string) => {
        map.addSource(`route-${index}`, {
          type: 'geojson',
          data: { type: 'Feature', geometry: { type: 'LineString', coordinates: [] }, properties: {} },
        })

        map.addLayer({
          id: `route-line-${index}`,
          type: 'line',
          source: `route-${index}`,
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color': ord.routeStatus === 'libre' ? '#22c55e' : ord.routeStatus === 'riesgo' ? '#eab308' : '#ef4444',
            'line-width': 4,
            'line-opacity': 0.8,
          },
        })

        // Marcador Origen
        new maplibregl.Marker({ color: '#10b981' })
          .setLngLat([ord.originCoord.lng, ord.originCoord.lat])
          .setPopup(new maplibregl.Popup().setHTML(`<b>Origen:</b> ${ord.origin}<br>${ord.farmerName}`))
          .addTo(map)

        // Marcador Destino (si es distinto a mi ubicación, pero suele ser la misma)
        
        if (ord.truckCoord) {
          new maplibregl.Marker({ color: '#f5a623' })
            .setLngLat([ord.truckCoord.lng, ord.truckCoord.lat])
            .setPopup(new maplibregl.Popup().setHTML(`<b>🚚 Camión:</b> ${ord.truckPlate}`))
            .addTo(map)
        }

        fetchOsrmGeometry(ord.originCoord, ord.destinationCoord).then((result) => {
          if (!result) return
          if (order && index === 'main') setRouteInfo({ distance: result.distance, duration: result.duration })

          const src = map.getSource(`route-${index}`) as maplibregl.GeoJSONSource
          if (src) {
            src.setData({
              type: 'Feature',
              geometry: { type: 'LineString', coordinates: result.coordinates },
              properties: {},
            })
          }

          if (order && index === 'main') {
            const bounds = new maplibregl.LngLatBounds()
            result.coordinates.forEach((c) => bounds.extend(c))
            if (ord.truckCoord) bounds.extend([ord.truckCoord.lng, ord.truckCoord.lat])
            map.fitBounds(bounds, { padding: 40 })
          }
        })
      }

      if (order) {
        drawRoute(order, 'main')
      } else {
        // Pintar todas las rutas activas si es la vista general
        MY_ORDERS.filter(o => o.status !== 'ENTREGADO').forEach((o, i) => drawRoute(o, i.toString()))
      }
    })

    return () => {
      map.remove()
    }
  }, [order])

  return (
    <div style={{ position: 'relative', width: '100%', height }}>
      {/* Mapa contenedor */}
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />

      {/* Controles Flotantes Arriba */}
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, display: 'flex', gap: 8, flexDirection: 'column' }}>
        <button 
          onClick={centerMap}
          style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', color: 'white', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}
        >
          📍 Centrar Mapa
        </button>
        
        {/* Leyenda */}
        <div style={{ background: 'var(--color-bg-elevated)', padding: 12, borderRadius: 8, border: '1px solid var(--color-border)', fontSize: '0.85rem' }}>
          <div style={{ fontWeight: 'bold', marginBottom: 8 }}>Estado de Rutas</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><span style={{ color: '#22c55e' }}>●</span> Libre</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><span style={{ color: '#eab308' }}>●</span> En Riesgo</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ color: '#ef4444' }}>●</span> Bloqueada</div>
        </div>
      </div>

      {/* Información de Ruta Flotante Abajo (Solo si hay una orden seleccionada) */}
      {order && (
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, zIndex: 10 }}>
          <div style={{ background: 'var(--color-bg-elevated)', padding: 16, borderRadius: 12, border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{order.product}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>📍 {order.origin} → 🏁 {order.destination}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {routeInfo && (
                  <>
                    <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '4px 12px', borderRadius: 16, fontSize: '0.85rem', fontWeight: 'bold' }}>
                      🛣️ {fmtDist(routeInfo.distance)}
                    </span>
                    <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '4px 12px', borderRadius: 16, fontSize: '0.85rem', fontWeight: 'bold' }}>
                      ⏱️ {fmtDur(routeInfo.duration)}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            {order.routeStatus === 'bloqueada' && (
              <div style={{ marginTop: 12, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '8px 12px', borderRadius: 8, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🚨</span> Ruta principal bloqueada. <strong>Alternativa sugerida:</strong> Desvío por vía regional sur (+45 min).
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
