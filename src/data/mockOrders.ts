import { ProductOrder, PurchaseRequest } from '../types/orderTypes';

export const mockAvailableOrder: ProductOrder = {
  id: 'order_product_01',
  farmerId: 'user_farmer_huanuco_01',
  productName: 'Papa Amarilla de Tingo María',
  quantity: 5,
  unit: 'TON',
  price: 1800, // S/. 1800 por tonelada
  origin: {
    lat: -9.3004,
    lng: -76.0022,
    district: 'Rupa-Rupa',
    address: 'Fundo San Juan Alto',
    reference: 'Entrando por el km 5 de la carretera a Monzón'
  },
  status: 'DISPONIBLE',
  routeStatus: 'LIBRE',
  createdAt: '2026-06-25T14:20:00Z'
};

export const mockSoldOrderWaitingTransport: ProductOrder = {
  id: 'order_product_02',
  farmerId: 'user_farmer_huanuco_01',
  buyerId: 'user_buyer_huanuco_01',
  productName: 'Granadilla Orgánica',
  quantity: 150,
  unit: 'CAJAS',
  price: 45, // S/. 45 por caja
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
  status: 'VENDIDO_ESPERANDO_TRANSPORTE',
  routeStatus: 'RIESGO',
  createdAt: '2026-06-25T15:00:00Z'
};

export const mockPurchaseRequest: PurchaseRequest = {
  id: 'request_buyer_01',
  buyerId: 'user_buyer_huanuco_01',
  productName: 'Hortensias y Granos Andinos',
  quantity: 2000,
  unit: 'KG',
  priceOffered: 3.5, // S/. 3.5 por KG
  destination: {
    lat: -9.9306,
    lng: -76.2422,
    district: 'Huánuco',
    address: 'Almacén Central AgroFlor S.A.C.',
    reference: 'Al costado de la Comisaría de Huánuco'
  },
  deadline: '2026-07-05',
  status: 'BUSCANDO_AGRICULTOR',
  createdAt: '2026-06-26T09:15:00Z'
};

export const mockOrders: ProductOrder[] = [mockAvailableOrder, mockSoldOrderWaitingTransport];
export const mockPurchaseRequests: PurchaseRequest[] = [mockPurchaseRequest];
