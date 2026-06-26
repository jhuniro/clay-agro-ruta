import { db, isFirebaseConfigured } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { mockOrders } from '../data/mockOrders';

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

const STORAGE_KEY = 'agroruta_orders';

const getSimulatedOrders = (): Order[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockOrders));
    return mockOrders as unknown as Order[];
  }
  return JSON.parse(data);
};

const saveSimulatedOrders = (orders: Order[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

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
  
  // Fallback simulado
  const orders = getSimulatedOrders();
  return orders.find((o) => o.id === orderId) || null;
};

// Sincronizar el estado de la orden con el del transporte
export const updateOrderStatus = async (orderId: string, status: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        routeStatus: status,
        updatedAt: new Date().toISOString()
      });
      return;
    } catch (e) {
      console.error('Error al actualizar estado de la orden:', e);
    }
  }

  // Fallback simulado
  const orders = getSimulatedOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index !== -1) {
    orders[index].routeStatus = status;
    saveSimulatedOrders(orders);
  }
};