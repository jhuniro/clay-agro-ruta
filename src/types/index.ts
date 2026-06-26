// src/types/index.ts

export type Role = 'FARMER' | 'BUYER' | 'DRIVER';
export type ShipmentStatus = 'AVAILABLE' | 'RESERVED' | 'IN_TRANSIT' | 'DELIVERED' | 'BLOCKED';
export type IncidentType = 'HUAICO' | 'ACCIDENT' | 'BLOCK' | 'WEATHER' | 'TRAFFIC';
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH';

export interface LocationPoint {
    lat: number;
    lng: number;
}

export interface User {
    uid: string;
    name: string;
    phone: string;
    role: Role;
    createdAt: number; // Guardaremos el timestamp como milisegundos para mayor facilidad
}

export interface Shipment {
    id: string;
    farmerId: string;
    buyerId?: string;
    driverId?: string;
    origin: LocationPoint;
    destination: LocationPoint;
    pickupPoint: LocationPoint;
    status: ShipmentStatus;
    price: number;
    product: string;
    weight: number;
    createdAt: number;
}

export interface DriverTracking {
    driverId: string;
    shipmentId: string;
    location: LocationPoint;
    updatedAt: number;
}

export interface Incident {
    id: string;
    routeId: string; // Puede ser un identificador general de la zona o ruta
    type: IncidentType;
    severity: Severity;
    description: string;
    location: LocationPoint;
    createdAt: number;
}