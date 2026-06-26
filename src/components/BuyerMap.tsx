import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Order } from '../types'

const OSRM_BASE = 'https://router.project-osrm.org'

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
  order: Order
  onClose: () => void
}

export default function BuyerMap({ order, onClose }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [routeInfo, setRouteInfo] = useState<{ distance: number; duration: number } | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [order.originCoord.lng, order.originCoord.lat],
      zoom: 9,
    })

    mapRef.current = map
    map.addControl(new maplibregl.NavigationControl(), 'top-right')

    const originMarker = new maplibregl.Marker({ color: '#2d7a3a' })
      .setLngLat([order.originCoord.lng, order.originCoord.lat])
      .setPopup(new maplibregl.Popup().setHTML(`<b>Origen:</b> ${order.origin}<br>${order.farmerName}`))
      .addTo(map)

    const destMarker = new maplibregl.Marker({ color: '#1a6b9a' })
      .setLngLat([order.destinationCoord.lng, order.destinationCoord.lat])
      .setPopup(new maplibregl.Popup().setHTML(`<b>Destino:</b> ${order.destination}`))
      .addTo(map)

    map.on('load', () => {
      // Start with empty source, will be filled by OSRM
      map.addSource('route', {
        type: 'geojson',
        data: { type: 'Feature', geometry: { type: 'LineString', coordinates: [] }, properties: {} },
      })

      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': order.routeStatus === 'libre' ? '#2d7a3a' : order.routeStatus === 'riesgo' ? '#f5a623' : '#dc3545',
          'line-width': 4,
          'line-opacity': 0.8,
        },
      })

      if (order.truckCoord) {
        new maplibregl.Marker({ color: '#f5a623' })
          .setLngLat([order.truckCoord.lng, order.truckCoord.lat])
          .setPopup(new maplibregl.Popup().setHTML(`<b>🚚 Camión:</b> ${order.truckPlate}`))
          .addTo(map)
      }

      // Fetch OSRM road route
      fetchOsrmGeometry(order.originCoord, order.destinationCoord).then((result) => {
        if (!result) {
          // Fallback: straight line
          const src = map.getSource('route') as maplibregl.GeoJSONSource
          if (src) {
            src.setData({
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: [
                  [order.originCoord.lng, order.originCoord.lat],
                  [order.destinationCoord.lng, order.destinationCoord.lat],
                ],
              },
              properties: {},
            })
          }
          return
        }

        setRouteInfo({ distance: result.distance, duration: result.duration })

        const src = map.getSource('route') as maplibregl.GeoJSONSource
        if (src) {
          src.setData({
            type: 'Feature',
            geometry: { type: 'LineString', coordinates: result.coordinates },
            properties: {},
          })
        }

        // Fit to route
        const bounds = new maplibregl.LngLatBounds()
        result.coordinates.forEach((c) => bounds.extend(c))
        if (order.truckCoord) bounds.extend([order.truckCoord.lng, order.truckCoord.lat])
        map.fitBounds(bounds, { padding: 60 })
      })
    })

    return () => {
      originMarker.remove()
      destMarker.remove()
      map.remove()
    }
  }, [order])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="map-card" onClick={e => e.stopPropagation()}>
        <div className="map-card__header">
          <h3>🗺️ Tracking de Pedido</h3>
          <button className="map-card__close" onClick={onClose} type="button">✕</button>
        </div>

        <div ref={mapContainer} className="map-container" />

        <div className="map-card__info">
          <p><strong>{order.emoji} {order.product}</strong> — {order.quantity} {order.unit}</p>
          <p>📍 {order.origin} → 🏁 {order.destination}</p>
          {routeInfo ? (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
              <span className="route-badge route-badge--libre">🛣️ {fmtDist(routeInfo.distance)}</span>
              <span className="route-badge" style={{ background: 'rgba(37,99,235,0.2)', color: '#90caf9' }}>⏱️ {fmtDur(routeInfo.duration)}</span>
            </div>
          ) : (
            <p>📏 {order.distanceKm} km (estimado)</p>
          )}
          {order.truckPlate && <p>🚚 Placa: {order.truckPlate}</p>}
          <span className={`route-badge route-badge--${order.routeStatus}`}>● Ruta {order.routeStatus}</span>
        </div>
      </div>
    </div>
  )
}
