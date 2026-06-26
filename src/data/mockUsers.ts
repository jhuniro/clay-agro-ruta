import { AgroUser } from '../types/userTypes';

export const mockFarmer: AgroUser = {
  uid: 'user_farmer_huanuco_01',
  phoneNumber: '+51987654321',
  role: 'FARMER',
  name: 'Juan Quispe Tarazona',
  district: 'Chinchao',
  createdAt: '2026-06-20T10:00:00Z',
  farmName: 'Fundo La Esperanza',
  pickupLocation: {
    lat: -9.7548,
    lng: -76.0658,
    district: 'Chinchao',
    address: 'Carretera Central Km 42',
    reference: 'Frente al grifo El Agricultor'
  }
};

export const mockBuyer: AgroUser = {
  uid: 'user_buyer_huanuco_01',
  phoneNumber: '+51912345678',
  role: 'BUYER',
  name: 'María Flores Martel',
  district: 'Huánuco',
  createdAt: '2026-06-21T08:30:00Z',
  businessName: 'Distribuidora AgroFlor',
  buyerType: 'ACOPIADOR'
};

export const mockDriver: AgroUser = {
  uid: 'user_driver_huanuco_01',
  phoneNumber: '+51956789012',
  role: 'DRIVER',
  name: 'Carlos Martel Cabrera',
  district: 'Amarilis',
  createdAt: '2026-06-22T06:00:00Z',
  vehicleType: 'CAMION',
  plate: 'W4N-920',
  capacity: '8 TON',
  available: true
};

export const mockUsers: AgroUser[] = [mockFarmer, mockBuyer, mockDriver];
