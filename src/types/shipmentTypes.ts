import { LocationPoint } from './userTypes';
import { RouteStatus } from './routeTypes';

export type ShipmentStatus =
  | 'PENDIENTE_TRANSPORTE'
  | 'TRANSPORTISTA_ASIGNADO'
  | 'EN_RUTA_RECOJO'
  | 'CARGA_RECOGIDA'
  | 'EN_RUTA_ENTREGA'
  | 'ALERTA_RUTA'
  | 'ENTREGADO'
  | 'CANCELADO';

export interface Shipment {
  id: string;
  orderId: string;
  farmerId: string;
  buyerId: string;
  driverId?: string;
  productName: string;
  quantity: number;
  unit: 'KG' | 'TON' | 'SACOS' | 'CAJAS';
  origin: LocationPoint;
  destination: LocationPoint;
  status: ShipmentStatus;
  routeStatus: RouteStatus;
  estimatedTime?: string;
  driverLocation?: LocationPoint;
  createdAt: string;
  updatedAt: string;
}
