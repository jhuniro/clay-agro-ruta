export type UserRole = 'FARMER' | 'BUYER' | 'DRIVER';

export interface LocationPoint {
  lat: number;
  lng: number;
  district?: string;
  address?: string;
  reference?: string;
}

export interface AgroUser {
  uid: string;
  phoneNumber: string;
  role: UserRole;
  name: string;
  district?: string;
  createdAt: string;
  // Farmer fields
  farmName?: string;
  pickupLocation?: LocationPoint;
  // Buyer fields
  businessName?: string;
  buyerType?: 'MERCADO' | 'RESTAURANTE' | 'ACOPIADOR' | 'TIENDA' | 'EMPRESA' | 'OTRO';
  // Driver fields
  vehicleType?: 'CAMION' | 'CAMIONETA' | 'MOTOCARGA' | 'FURGON' | 'OTRO';
  plate?: string;
  capacity?: string; // e.g., "5 TON", "800 KG"
  available?: boolean;
}
