import { LocationPoint } from './userTypes';
import { RouteStatus } from './routeTypes';

export type OrderStatus =
  | 'DISPONIBLE'
  | 'VENDIDO_ESPERANDO_TRANSPORTE'
  | 'TRANSPORTISTA_ASIGNADO'
  | 'EN_RUTA'
  | 'ENTREGADO'
  | 'CANCELADO';

export interface ProductOrder {
  id: string;
  farmerId: string;
  buyerId?: string;
  productName: string;
  quantity: number;
  unit: 'KG' | 'TON' | 'SACOS' | 'CAJAS';
  price: number;
  origin: LocationPoint;
  destination?: LocationPoint;
  status: OrderStatus;
  routeStatus: RouteStatus;
  createdAt: string;
}

export type PurchaseRequestStatus =
  | 'BUSCANDO_AGRICULTOR'
  | 'AGRICULTOR_ASIGNADO'
  | 'VENDIDO_ESPERANDO_TRANSPORTE'
  | 'CANCELADO';

export interface PurchaseRequest {
  id: string;
  buyerId: string;
  productName: string;
  quantity: number;
  unit: 'KG' | 'TON' | 'SACOS' | 'CAJAS';
  priceOffered: number;
  destination: LocationPoint;
  deadline?: string;
  status: PurchaseRequestStatus;
  createdAt: string;
}
