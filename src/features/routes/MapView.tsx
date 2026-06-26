import { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import type { Route, Coordinate, Incident } from "./routeTypes";
import { getRouteColor, getRouteBounds } from "./routeService";

const TILE_STYLE = "https://tiles.openfreemap.org/styles/dark";

const INCIDENT_ICONS: Record<string, string> = {
  HUAICO: "🌊",
  DERRUMBE: "🪨",
  BLOQUEO: "🚧",
  LLUVIA: "🌧️",
  ACCIDENTE: "⚠️",
  VIA_LENTA: "🐌",
  OTRO: "❗",
};

const SEVERITY_COLORS: Record<string, string> = {
  LOW: "#6b7280",
  MEDIUM: "#eab308",
  HIGH: "#ef4444",
};

interface Props {
  route: Route;
  incidents?: Incident[];
  showAlternatives?: boolean;
  selectedAlternativeId?: string;
  showTruck?: boolean;
  truckPosition?: Coordinate;
  height?: number;
  onAlternativeSelect?: (id: string) => void;
}

export default function MapView({
  route,
  incidents = [],
  showAlternatives = true,
  selectedAlternativeId,
  showTruck,
  truckPosition,
  height = 380,
  onAlternativeSelect,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const truckMarkerRef = useRef<maplibregl.Marker | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const waypoints = route.waypoints?.length > 0
      ? route.waypoints
      : [route.coordinates.origin, route.coordinates.destination];

    const { center, zoom } = getRouteBounds(waypoints);
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

    map.on("styleimagemissing", (e) => {
      if (!map.hasImage(e.id)) {
        map.addImage(e.id, { width: 0, height: 0, data: new Uint8Array(0) });
      }
    });

    map.on("load", () => {
      // ── Ruta principal ──
      map.addSource("route-main", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { status: route.status },
              geometry: {
                type: "LineString",
                coordinates: waypoints,
              },
            },
          ],
        },
      });

      // Sombra de la ruta principal
      map.addLayer({
        id: "route-main-outline",
        type: "line",
        source: "route-main",
        paint: {
          "line-width": 7,
          "line-color": "#000000",
          "line-opacity": 0.4,
        },
      });

      // Línea principal
      map.addLayer({
        id: "route-main-line",
        type: "line",
        source: "route-main",
        paint: {
          "line-width": 5,
          "line-color": color,
        },
      });

      // ── Rutas alternativas ──
      if (showAlternatives && route.alternativeRoutes.length > 0) {
        const altFeatures = route.alternativeRoutes.map((alt) => ({
          type: "Feature" as const,
          properties: { id: alt.id, status: alt.status },
          geometry: {
            type: "LineString" as const,
            coordinates: alt.waypoints,
          },
        }));

        map.addSource("route-alternatives", {
          type: "geojson",
          data: { type: "FeatureCollection", features: altFeatures },
        });

        map.addLayer({
          id: "route-alt-line",
          type: "line",
          source: "route-alternatives",
          paint: {
            "line-width": 3,
            "line-color": "#3b82f6",
            "line-dasharray": [4, 3],
            "line-opacity": 0.7,
          },
        });
      }

      // ── Marcador origen ──
      const originEl = document.createElement("div");
      originEl.style.cssText = `
        width: 24px; height: 24px; border-radius: 50%;
        background: ${color}; border: 3px solid white;
        box-shadow: 0 3px 8px rgba(0,0,0,0.5);
      `;
      const originMarker = new maplibregl.Marker({ element: originEl })
        .setLngLat(waypoints[0])
        .setPopup(new maplibregl.Popup({ offset: 10 }).setText(`Origen: ${route.origin}`))
        .addTo(map);
      markersRef.current.push(originMarker);

      // ── Marcador destino ──
      const destEl = document.createElement("div");
      destEl.style.cssText = `
        width: 24px; height: 24px; border-radius: 50%;
        background: #3b82f6; border: 3px solid white;
        box-shadow: 0 3px 8px rgba(0,0,0,0.5);
      `;
      const destMarker = new maplibregl.Marker({ element: destEl })
        .setLngLat(waypoints[waypoints.length - 1])
        .setPopup(new maplibregl.Popup({ offset: 10 }).setText(`Destino: ${route.destination}`))
        .addTo(map);
      markersRef.current.push(destMarker);

      // ── Marcadores de incidentes ──
      for (const inc of incidents) {
        const severityColor = SEVERITY_COLORS[inc.severity] || "#6b7280";
        const icon = INCIDENT_ICONS[inc.type] || "❗";

        const incEl = document.createElement("div");
        incEl.style.cssText = `
          width: 30px; height: 30px; border-radius: 50%;
          background: ${severityColor}; border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; cursor: pointer;
        `;
        incEl.textContent = icon;

        const popupHtml = `
          <div style="font-weight:700;font-size:13px;margin-bottom:4px">${inc.type.replace('_', ' ')}</div>
          <div style="font-size:11px;opacity:0.8;margin-bottom:4px">${inc.routeName}</div>
          <div style="font-size:12px;line-height:1.4">${inc.description}</div>
          <div style="font-size:10px;margin-top:6px;opacity:0.6">${inc.reportedAt}</div>
        `;

        const incMarker = new maplibregl.Marker({ element: incEl })
          .setLngLat(inc.coordinate)
          .setPopup(new maplibregl.Popup({ offset: 10 }).setHTML(popupHtml))
          .addTo(map);
        markersRef.current.push(incMarker);
      }

      // ── Marcador de camión ──
      if (showTruck) {
        const truckEl = document.createElement("div");
        truckEl.style.cssText = `
          width: 36px; height: 36px; border-radius: 50%;
          background: #f97316; border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; cursor: pointer;
        `;
        truckEl.textContent = "🚛";

        truckMarkerRef.current = new maplibregl.Marker({ element: truckEl })
          .setLngLat(waypoints[0])
          .addTo(map);
      }

      // ── Click en ruta alternativa ──
      if (showAlternatives && route.alternativeRoutes.length > 0) {
        map.on("click", "route-alt-line", (e) => {
          if (!e.features?.length) return;
          const feat = e.features[0];
          const altId = feat.properties?.id;
          if (altId && onAlternativeSelect) {
            onAlternativeSelect(altId);
          }
        });

        map.on("mouseenter", "route-alt-line", () => {
          if (map.getCanvas()) map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "route-alt-line", () => {
          if (map.getCanvas()) map.getCanvas().style.cursor = "";
        });
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
  }, [route, showTruck, showAlternatives, incidents, selectedAlternativeId]);

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
