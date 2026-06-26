import { useRef, useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import type { Route, Coordinate } from './routeTypes'
import { getRouteColor, getCenter, getZoomForRoute } from './routeService'

const TILE_STYLE = 'https://tiles.openfreemap.org/styles/bright'

interface Props {
  route: Route
  showTruck?: boolean
  truckPosition?: Coordinate
  height?: number
}

export default function MapView({ route, showTruck, truckPosition, height = 220 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const truckMarkerRef = useRef<maplibregl.Marker | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const coords = route.coordinates
    if (!coords) return

    const center = getCenter(coords.origin, coords.destination)
    const zoom = getZoomForRoute(coords.origin, coords.destination)
    const color = getRouteColor(route.status)

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: TILE_STYLE,
      center,
      zoom,
      interactive: true,
      attributionControl: false,
    })

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')

    map.on('load', () => {
      // Línea de ruta
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [coords.origin, coords.destination],
              },
            },
          ],
        },
      })

      // Sombra
      map.addLayer({
        id: 'route-outline',
        type: 'line',
        source: 'route',
        paint: {
          'line-width': 6,
          'line-color': '#000000',
          'line-opacity': 0.3,
        },
      })

      // Línea principal
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        paint: {
          'line-width': 3,
          'line-color': color,
        },
      })

      // Marcador origen
      const originEl = document.createElement('div')
      originEl.style.cssText = `
        width: 20px; height: 20px; border-radius: 50%;
        background: ${color}; border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      `
      const originMarker = new maplibregl.Marker({ element: originEl })
        .setLngLat(coords.origin)
        .setPopup(new maplibregl.Popup().setText(route.origin))
        .addTo(map)
      markersRef.current.push(originMarker)

      // Marcador destino
      const destEl = document.createElement('div')
      destEl.style.cssText = `
        width: 20px; height: 20px; border-radius: 50%;
        background: #3b82f6; border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      `
      const destMarker = new maplibregl.Marker({ element: destEl })
        .setLngLat(coords.destination)
        .setPopup(new maplibregl.Popup().setText(route.destination))
        .addTo(map)
      markersRef.current.push(destMarker)

      // Marcador camión
      if (showTruck) {
        const truckEl = document.createElement('div')
        truckEl.style.cssText = `
          width: 30px; height: 30px; border-radius: 50%;
          background: #f97316; border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        `
        truckEl.textContent = '🚛'

        truckMarkerRef.current = new maplibregl.Marker({ element: truckEl })
          .setLngLat(coords.origin)
          .addTo(map)
      }
    })

    mapRef.current = map

    return () => {
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []
      truckMarkerRef.current?.remove()
      truckMarkerRef.current = null
      map.remove()
      mapRef.current = null
    }
  }, [route, showTruck])

  useEffect(() => {
    if (truckPosition && truckMarkerRef.current) {
      truckMarkerRef.current.setLngLat(truckPosition)
    }
  }, [truckPosition])

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl overflow-hidden border border-[rgba(0,230,118,0.08)]"
      style={{ height }}
    />
  )
}
