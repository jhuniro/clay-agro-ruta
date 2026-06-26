import { Shipment } from '../types/shipmentTypes';

export const mockPendingShipment: Shipment = {
  id: 'shipment_pending_01',
  orderId: 'order_product_02',
  farmerId: 'user_farmer_huanuco_01',
  buyerId: 'user_buyer_huanuco_01',
  productName: 'Granadilla Orgánica',
  quantity: 150,
  unit: 'CAJAS',
  origin: {
    lat: -9.7548,
    lng: -76.0658,
    district: 'Chinchao',
    address: 'Chacra Higueras',
    reference: 'Frente a la Capilla del centro poblado'
  },
  destination: {
    lat: -9.9306,
    lng: -76.2422,
    district: 'Huánuco',
    address: 'Mercado Mayorista de Huánuco Stand B-12',
    reference: 'Puerta de ingreso principal'
  },
  status: 'PENDIENTE_TRANSPORTE',
  routeStatus: 'LIBRE',
  createdAt: '2026-06-25T15:05:00Z',
  updatedAt: '2026-06-25T15:05:00Z'
};

export const mockInRouteShipment: Shipment = {
  id: 'shipment_in_route_01',
  orderId: 'order_product_03', // Representing another mock transaction
  farmerId: 'user_farmer_huanuco_01',
  buyerId: 'user_buyer_huanuco_01',
  driverId: 'user_driver_huanuco_01',
  productName: 'Papa Amarilla de Tingo María',
  quantity: 3,
  unit: 'TON',
  origin: {
    lat: -9.3004,
    lng: -76.0022,
    district: 'Rupa-Rupa',
    address: 'Fundo San Juan Alto',
    reference: 'Entrando por el km 5 de la carretera a Monzón'
  },
  destination: {
    lat: -9.9306,
    lng: -76.2422,
    district: 'Huánuco',
    address: 'Almacén Central AgroFlor S.A.C.',
    reference: 'Al costado de la Comisaría de Huánuco'
  },
  status: 'EN_RUTA_ENTREGA',
  routeStatus: 'RIESGO',
  estimatedTime: '2 horas 30 mins',
  driverLocation: {
    lat: -9.6200,
    lng: -76.1200,
    district: 'Chinchao',
    reference: 'En ruta cerca al túnel Carpish'
  },
  createdAt: '2026-06-26T08:00:00Z',
  updatedAt: '2026-06-26T10:30:00Z'
};

export const mockShipments: Shipment[] = [mockPendingShipment, mockInRouteShipment];
