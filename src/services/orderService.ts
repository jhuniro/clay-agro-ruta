import { db, isFirebaseConfigured } from '../lib/firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { ProductOrder, OrderStatus } from '../types/orderTypes';
import { mockOrders } from '../data/mockOrders';

const STORAGE_KEY = 'agroruta_orders';

// Inicializar base de datos simulada en localStorage
const getSimulatedOrders = (): ProductOrder[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockOrders));
    return mockOrders;
  }
  return JSON.parse(data);
};

const saveSimulatedOrders = (orders: ProductOrder[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

// Obtener una orden por ID
export const getOrderById = async (orderId: string): Promise<ProductOrder | null> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'orders', orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as ProductOrder;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener orden en Firestore:', error);
    }
  }

  // Fallback simulado
  const orders = getSimulatedOrders();
  return orders.find((o) => o.id === orderId) || null;
};

// Obtener todas las órdenes disponibles
export const getAvailableOrders = async (): Promise<ProductOrder[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'orders'), where('status', '==', 'DISPONIBLE'));
      const querySnapshot = await getDocs(q);
      const orders: ProductOrder[] = [];
      querySnapshot.forEach((docSnap) => {
        orders.push(docSnap.data() as ProductOrder);
      });
      return orders;
    } catch (error) {
      console.error('Error al obtener órdenes disponibles en Firestore:', error);
    }
  }

  // Fallback simulado
  const orders = getSimulatedOrders();
  return orders.filter((o) => o.status === 'DISPONIBLE');
};

// Crear una publicación de orden de cosecha
export const createOrder = async (order: ProductOrder): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'orders', order.id);
      await setDoc(docRef, order);
      return;
    } catch (error) {
      console.error('Error al crear orden en Firestore:', error);
    }
  }

  // Fallback simulado
  const orders = getSimulatedOrders();
  orders.push(order);
  saveSimulatedOrders(orders);
};

// Comprar un lote agrícola (Actualiza estado a VENDIDO_ESPERANDO_TRANSPORTE y gatilla la creación de envío)
export const buyOrder = async (orderId: string, buyerId: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'orders', orderId);
      await updateDoc(docRef, {
        status: 'VENDIDO_ESPERANDO_TRANSPORTE',
        buyerId: buyerId
      });
    } catch (error) {
      console.error('Error al comprar orden en Firestore:', error);
      throw error;
    }
  } else {
    // Fallback simulado
    const orders = getSimulatedOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index === -1) throw new Error('Orden no encontrada');
    if (orders[index].status !== 'DISPONIBLE') throw new Error('La orden ya no está disponible');
    
    orders[index].status = 'VENDIDO_ESPERANDO_TRANSPORTE';
    orders[index].buyerId = buyerId;
    saveSimulatedOrders(orders);
  }

  // Gatillar creación del envío (Importación dinámica para evitar dependencia circular con shipmentService)
  try {
    const { createShipmentFromOrder } = await import('./shipmentService');
    await createShipmentFromOrder(orderId);
  } catch (err) {
    console.error('Error al inicializar el envío de la orden comprada:', err);
  }
};

// Actualizar el estado general de una orden
export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'orders', orderId);
      await updateDoc(docRef, { status });
      return;
    } catch (error) {
      console.error('Error al actualizar estado de orden en Firestore:', error);
    }
  }

  // Fallback simulado
  const orders = getSimulatedOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index !== -1) {
    orders[index].status = status;
    saveSimulatedOrders(orders);
  }
};
