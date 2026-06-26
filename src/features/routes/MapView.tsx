import { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import type { Route, Coordinate } from "./routeTypes";
import { getRouteColor, getCenter, getZoomForRoute } from "./routeService";

const TILE_STYLE = "https://tiles.openfreemap.org/styles/dark";

interface Props {
  route: Route;
  showTruck?: boolean;
  truckPosition?: Coordinate;
  height?: number;
}

// Incrementamos la altura base por defecto de 220 a 380 para solucionar el efecto aplastado
export default function MapView({
  route,
  showTruck,
  truckPosition,
  height = 380,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const truckMarkerRef = useRef<maplibregl.Marker | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const coords = route.coordinates;
    if (!coords) return;

    const center = getCenter(coords.origin, coords.destination);
    const zoom = getZoomForRoute(coords.origin, coords.destination);
    const color = getRouteColor(route.status);

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: TILE_STYLE,
      center,
      zoom,
      interactive: true,
      attributionControl: false,
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right",
    );

    map.on("load", () => {
      // Línea de ruta
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [coords.origin, coords.destination],
              },
            },
          ],
        },
      });

      // Sombra proyectada de la ruta
      map.addLayer({
        id: "route-outline",
        type: "line",
        source: "route",
        paint: {
          "line-width": 6,
          "line-color": "#000000",
          "line-opacity": 0.4,
        },
      });

      // Línea principal con mayor grosor para visibilidad en relieve
      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        paint: {
          "line-width": 4,
          "line-color": color,
        },
      });

      // Marcador origen estilizado
      const originEl = document.createElement("div");
      originEl.style.cssText = `
        width: 22px; height: 22px; border-radius: 50%;
        background: ${color}; border: 3px solid white;
        box-shadow: 0 3px 8px rgba(0,0,0,0.5);
      `;
      const originMarker = new maplibregl.Marker({ element: originEl })
        .setLngLat(coords.origin)
        .setPopup(new maplibregl.Popup({ offset: 10 }).setText(route.origin))
        .addTo(map);
      markersRef.current.push(originMarker);

      // Marcador destino estilizado
      const destEl = document.createElement("div");
      destEl.style.cssText = `
        width: 22px; height: 22px; border-radius: 50%;
        background: #3b82f6; border: 3px solid white;
        box-shadow: 0 3px 8px rgba(0,0,0,0.5);
      `;
      const destMarker = new maplibregl.Marker({ element: destEl })
        .setLngLat(coords.destination)
        .setPopup(
          new maplibregl.Popup({ offset: 10 }).setText(route.destination),
        )
        .addTo(map);
      markersRef.current.push(destMarker);

      // Marcador de camión (Rastreo GPS en tiempo real)
      if (showTruck) {
        const truckEl = document.createElement("div");
        truckEl.style.cssText = `
          width: 34px; height: 34px; border-radius: 50%;
          background: #f97316; border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; cursor: pointer;
        `;
        truckEl.textContent = "🚛";

        truckMarkerRef.current = new maplibregl.Marker({ element: truckEl })
          .setLngLat(coords.origin)
          .addTo(map);
      }
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      truckMarkerRef.current?.remove();
      truckMarkerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, [route, showTruck]);

  useEffect(() => {
    if (truckPosition && truckMarkerRef.current) {
      truckMarkerRef.current.setLngLat(truckPosition);
    }
  }, [truckPosition]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden border border-[#1b351e] shadow-2xl transition-all duration-300 hover:border-[#2e5c33]"
      style={{ height }}
    />
  );
}
