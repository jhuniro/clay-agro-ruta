// src/services/orderService.ts
import { db, isFirebaseConfigured } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Agregamos unit y routeStatus a la interfaz para que TypeScript no chille
export interface Order {
  id: string;
  farmerId: string;
  buyerId?: string;
  productName: string;
  quantity: number;
  unit: string;         // <-- Propiedad agregada
  origin: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
  routeStatus: string;  // <-- Propiedad agregada
  createdAt: string;
}

// Obtener detalles de una orden por ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  if (isFirebaseConfigured && db) {
    try {
      const docSnap = await getDoc(doc(db, 'orders', orderId));
      return docSnap.exists() ? (docSnap.data() as Order) : null;
    } catch (e) {
      console.error('Error al obtener orden:', e);
    }
  }
  return null;
};

// Sincronizar el estado de la orden con el del transporte
export const updateOrderStatus = async (orderId: string, status: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        routeStatus: status,
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      console.error('Error al actualizar estado de la orden:', e);
    }
  }
};