import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MY_ORDERS } from '../data/mockData';
import './BuyerScreen.css';

// ─── Fix Leaflet default marker icon path for Vite ────────────────────────────
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// ─── OSRM Helpers ────────────────────────────────────────────────────────────
const WAYPOINTS: L.LatLngTuple[] = [
  [-9.975, -76.218],
  [-9.965, -76.225],
  [-9.955, -76.230],
  [-9.945, -76.238],
  [-9.938, -76.245],
];
const OSRM_BASE = 'https://router.project-osrm.org';

async function fetchOsrmRoute(
  origin: L.LatLngTuple,
  dest: L.LatLngTuple,
  waypoints: L.LatLngTuple[],
) {
  try {
    const allPts = [origin, ...waypoints, dest];
    const coordsStr = allPts.map(pt => `${pt[1]},${pt[0]}`).join(';');
    const url = `${OSRM_BASE}/route/v1/driving/${coordsStr}?overview=full&geometries=geojson&steps=false`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();
    if (data.code !== 'Ok' || !data.routes?.length) return null;

    const route = data.routes[0];
    return {
      geometry: route.geometry.coordinates,
      distance: route.distance,
      duration: route.duration,
    };
  } catch {
    return null;
  }
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  if (hrs > 0) return `${hrs}h ${mins}min`;
  return `${mins} min`;
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
  });
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
      ">🚚</div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  });
}

// ─── Local Mock Services ──────────────────────────────────────────────────────

function subscribeToShipment(shipmentId: string, callback: (shipment: any) => void): () => void {
  let status = 'EN_RUTA';
  const localOrder = MY_ORDERS.find((o) => o.id === shipmentId) || MY_ORDERS[0];
  
  const emitUpdate = () => {
    callback({
      id: shipmentId,
      orderId: shipmentId,
      productName: localOrder.product,
      quantity: localOrder.quantity,
      unit: localOrder.unit,
      origin: { lat: localOrder.originCoord.lat, lng: localOrder.originCoord.lng },
      destination: { lat: localOrder.destinationCoord.lat, lng: localOrder.destinationCoord.lng },
      status: status,
      driverId: 'driver_test_999',
      truckPlate: localOrder.truckPlate || 'W12-345'
    });
  };

  emitUpdate();

  return () => {};
}

function subscribeToDriverTracking(driverId: string, originCoord: any, destCoord: any, routeGeometry: [number, number][], callback: (tracking: any) => void): () => void {
  let step = 0;
  // If we have a real route, follow it, otherwise interpolate
  const maxSteps = routeGeometry.length > 0 ? routeGeometry.length - 1 : 20;

  const emitTracking = () => {
    let currentLat, currentLng;
    if (routeGeometry.length > 0) {
      currentLat = routeGeometry[step][0];
      currentLng = routeGeometry[step][1];
    } else {
      const ratio = step / maxSteps;
      currentLat = originCoord.lat + (destCoord.lat - originCoord.lat) * ratio;
      currentLng = originCoord.lng + (destCoord.lng - originCoord.lng) * ratio;
    }

    callback({
      driverId: driverId,
      location: { lat: currentLat, lng: currentLng },
      updatedAt: new Date().toISOString()
    });
  };

  emitTracking();

  const interval = setInterval(() => {
    if (step < maxSteps) {
      step++;
      emitTracking();
    }
  }, 1000);

  return () => clearInterval(interval);
}

interface Props {
  shipmentId: string;
  onBack: () => void;
}

// ─── TrackingView Component ───────────────────────────────────────────────────

export default function TrackingView({ shipmentId, onBack }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const truckMarkerRef = useRef<L.Marker | null>(null);

  const [shipmentInfo, setShipmentInfo] = useState<any>(null);
  const [driverLocation, setDriverLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isDelivered, setIsDelivered] = useState(false);
  
  const [routeInfo, setRouteInfo] = useState<{ distance: number; duration: number } | null>(null);
  const [routeLoading, setRouteLoading] = useState(true);
  const [routeGeometry, setRouteGeometry] = useState<[number, number][]>([]);

  // 1. Obtener información base
  useEffect(() => {
    const unsubscribeShipment = subscribeToShipment(shipmentId, (shipment: any) => {
      if (!shipment) return;
      setShipmentInfo(shipment);

      if (shipment.status === 'ENTREGADO' || shipment.status === 'DELIVERED') {
        setIsDelivered(true);
      }
    });

    return () => {
      unsubscribeShipment();
    };
  }, [shipmentId]);

  // 2. Load Route info
  useEffect(() => {
    if (!shipmentInfo) return;
    const origin: L.LatLngTuple = [shipmentInfo.origin.lat, shipmentInfo.origin.lng];
    const dest: L.LatLngTuple = [shipmentInfo.destination.lat, shipmentInfo.destination.lng];
    
    fetchOsrmRoute(origin, dest, WAYPOINTS).then((route) => {
      setRouteLoading(false);
      if (route) {
        setRouteInfo({ distance: route.distance, duration: route.duration });
        const latLngs = route.geometry.map((pt: any[]) => [pt[1], pt[0]] as [number, number]);
        setRouteGeometry(latLngs);
      }
    });
  }, [shipmentInfo]);

  // 3. Driver tracking based on loaded route
  useEffect(() => {
    if (!shipmentInfo || isDelivered || routeLoading) return;
    const driverId = shipmentInfo.driverId || 'driver_test_999';
    
    const unsub = subscribeToDriverTracking(driverId, shipmentInfo.origin, shipmentInfo.destination, routeGeometry, (tracking: any) => {
      if (tracking && tracking.location) {
        setDriverLocation(tracking.location);
      }
    });
    return () => unsub();
  }, [shipmentInfo, isDelivered, routeLoading, routeGeometry]);

  // 4. Map rendering
  useEffect(() => {
    if (!mapContainer.current || !shipmentInfo || isDelivered) return;
    if (mapInstance.current) return;

    const origin: L.LatLngTuple = [shipmentInfo.origin.lat, shipmentInfo.origin.lng];
    const dest: L.LatLngTuple = [shipmentInfo.destination.lat, shipmentInfo.destination.lng];

    const map = L.map(mapContainer.current, {
      center: origin,
      zoom: 13,
      zoomControl: false,
    });
    mapInstance.current = map;

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    L.marker(origin, { icon: createMarkerIcon('#2d7a3a', '🌱') })
      .bindPopup('<b>Origen</b>')
      .addTo(map);

    L.marker(dest, { icon: createMarkerIcon('#f5a623', '🛒') })
      .bindPopup('<b>Destino</b>')
      .addTo(map);

    const truck = L.marker(origin, { icon: createTruckIcon() })
      .bindPopup('<b>📍 En Ruta</b>')
      .addTo(map);
    truckMarkerRef.current = truck;

    if (routeGeometry.length > 0) {
      const road = L.polyline(routeGeometry, {
        color: '#2d7a3a',
        weight: 5,
        opacity: 0.75,
        lineJoin: 'round',
        lineCap: 'round',
      }).addTo(map);
      map.fitBounds(road.getBounds(), { padding: [40, 40] });
    } else {
      map.fitBounds(L.latLngBounds([origin, dest]), { padding: [40, 40] });
    }

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [shipmentInfo, isDelivered, routeGeometry]);

  // 5. Update Truck Marker
  useEffect(() => {
    if (!mapInstance.current || !truckMarkerRef.current || !driverLocation) return;
    const pos: L.LatLngTuple = [driverLocation.lat, driverLocation.lng];
    truckMarkerRef.current.setLatLng(pos);
    mapInstance.current.panTo(pos);
  }, [driverLocation]);

  return (
    <div className="role-screen" style={{ padding: 'var(--space-md)', paddingBottom: '90px' }}>
      <div className="role-topbar">
        <button className="role-topbar__back" onClick={onBack} type="button">
          ← Volver
        </button>
        <span className="role-topbar__title" style={{ color: '#90caf9' }}>📍 Rastrear Pedido</span>
      </div>

      <div className="tracking-info-header" style={{ marginBottom: 'var(--space-md)' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          {shipmentInfo ? `Rastreando: ${shipmentInfo.productName || shipmentInfo.product}` : 'Cargando datos...'}
        </h2>
        {shipmentInfo && (
          <p className="role-subtitle" style={{ margin: 0, marginTop: '4px' }}>
            Placa del camión: {shipmentInfo.truckPlate || 'W12-345'}
          </p>
        )}
      </div>

      {isDelivered ? (
        <div className="empty-state" style={{ background: 'rgba(45, 122, 58, 0.1)', border: '1px solid rgba(45, 122, 58, 0.3)', borderRadius: 'var(--radius-md)', padding: 'var(--space-xl)' }}>
          <div className="empty-state__icon" style={{ opacity: 1, color: '#a8e6b0' }}>🎉</div>
          <h3 style={{ color: '#a8e6b0', fontWeight: '800', fontSize: '1.2rem', marginBottom: 'var(--space-xs)' }}>Entrega Exitosa</h3>
          <p className="empty-state__text" style={{ color: '#fff' }}>¡Tu pedido ha sido recibido y entregado exitosamente!</p>
          <button className="action-btn action-btn--primary" style={{ marginTop: 'var(--space-md)', width: 'auto', display: 'inline-flex' }} onClick={onBack}>
            Regresar a Compras
          </button>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div 
            ref={mapContainer} 
            className="map-container" 
            style={{ 
              flex: 1, 
              minHeight: '350px', 
              borderRadius: 'var(--radius-md)', 
              border: '2px solid rgba(255,255,255,0.1)',
              position: 'relative'
            }} 
          />
          
          <div style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            flexWrap: 'wrap',
            background: 'var(--color-bg-elevated)',
            padding: '12px',
            borderRadius: 'var(--radius-md)'
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
              </>
            ) : null}
          </div>

          {driverLocation && (
            <div className="item-card" style={{ margin: 0 }}>
              <p style={{ margin: 0, fontSize: '0.82rem' }}>
                🟢 <strong>Ubicación en tiempo real recibida</strong>
              </p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Coordenadas actuales: {driverLocation.lat.toFixed(5)}, {driverLocation.lng.toFixed(5)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

