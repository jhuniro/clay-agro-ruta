import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Order } from '../types'

interface Props {
  order: Order
  onClose: () => void
}

export default function BuyerMap({ order, onClose }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

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
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [order.originCoord.lng, order.originCoord.lat],
              [order.destinationCoord.lng, order.destinationCoord.lat],
            ],
          },
          properties: {},
        },
      })

      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': order.routeStatus === 'libre' ? '#2d7a3a' : order.routeStatus === 'riesgo' ? '#f5a623' : '#dc3545',
          'line-width': 3,
          'line-dasharray': [2, 1],
        },
      })

      if (order.truckCoord) {
        new maplibregl.Marker({ color: '#f5a623' })
          .setLngLat([order.truckCoord.lng, order.truckCoord.lat])
          .setPopup(new maplibregl.Popup().setHTML(`<b>🚚 Camión:</b> ${order.truckPlate}`))
          .addTo(map)
      }

      const bounds = new maplibregl.LngLatBounds()
        .extend([order.originCoord.lng, order.originCoord.lat])
        .extend([order.destinationCoord.lng, order.destinationCoord.lat])
      if (order.truckCoord) {
        bounds.extend([order.truckCoord.lng, order.truckCoord.lat])
      }
      map.fitBounds(bounds, { padding: 60 })
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
          <p>📏 {order.distanceKm} km</p>
          {order.truckPlate && <p>🚚 Placa: {order.truckPlate}</p>}
          <span className={`route-badge route-badge--${order.routeStatus}`}>● Ruta {order.routeStatus}</span>
        </div>
      </div>
    </div>
  )
}
