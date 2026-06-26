// src/services/shipmentService.ts

import { db, isFirebaseConfigured } from '../lib/firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';
import { Shipment, ShipmentStatus } from '../types/shipmentTypes';
import { mockShipments } from '../data/mockShipments';

const STORAGE_KEY = 'agroruta_shipments';

// Inicializar base de datos simulada en localStorage
const getSimulatedShipments = (): Shipment[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockShipments));
    return mockShipments;
  }
  return JSON.parse(data);
};

const saveSimulatedShipments = (shipments: Shipment[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(shipments));
};

// Obtener un envío por su ID
export const getShipmentById = async (shipmentId: string): Promise<Shipment | null> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'shipments', shipmentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Shipment;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener envío en Firestore:', error);
    }
  }

  // Fallback simulado
  const shipments = getSimulatedShipments();
  return shipments.find((s) => s.id === shipmentId) || null;
};

// Obtener envíos pendientes de transporte
export const getPendingShipments = async (): Promise<Shipment[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'shipments'), where('status', '==', 'PENDIENTE_TRANSPORTE'));
      const querySnapshot = await getDocs(q);
      const shipments: Shipment[] = [];
      querySnapshot.forEach((docSnap) => {
        shipments.push(docSnap.data() as Shipment);
      });
      return shipments;
    } catch (error) {
      console.error('Error al obtener envíos pendientes en Firestore:', error);
    }
  }

  // Fallback simulado
  const shipments = getSimulatedShipments();
  return shipments.filter((s) => s.status === 'PENDIENTE_TRANSPORTE');
};

// Crear un envío a partir de una orden ya comprada/vendida
export const createShipmentFromOrder = async (orderId: string): Promise<Shipment> => {
  // Obtener los detalles de la orden usando importación dinámica
  const { getOrderById } = await import('./orderService');
  const order = await getOrderById(orderId);
  if (!order) {
    throw new Error('No se pudo crear el envío: la orden no existe.');
  }
  if (!order.buyerId) {
    throw new Error('No se pudo crear el envío: la orden no tiene comprador asignado.');
  }

  const newShipment: Shipment = {
    id: `shipment_${Date.now()}`,
    orderId: order.id,
    farmerId: order.farmerId,
    buyerId: order.buyerId,
    productName: order.productName,
    quantity: order.quantity,
    unit: order.unit as 'KG' | 'TON' | 'SACOS' | 'CAJAS',
    origin: order.origin,
    destination: order.destination || order.origin, // Fallback en caso de que no tenga destino explícito
    status: 'PENDIENTE_TRANSPORTE',
    routeStatus: order.routeStatus as any,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'shipments', newShipment.id);
      await setDoc(docRef, newShipment);
    } catch (error) {
      console.error('Error al guardar nuevo envío en Firestore:', error);
    }
  } else {
    // Fallback simulado
    const shipments = getSimulatedShipments();
    shipments.push(newShipment);
    saveSimulatedShipments(shipments);
  }

  return newShipment;
};

// Asignar un transportista a un envío
export const assignDriverToShipment = async (shipmentId: string, driverId: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'shipments', shipmentId);
      await updateDoc(docRef, {
        driverId: driverId,
        status: 'TRANSPORTISTA_ASIGNADO',
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error al asignar transportista en Firestore:', error);
      throw error;
    }
  } else {
    // Fallback simulado
    const shipments = getSimulatedShipments();
    const index = shipments.findIndex((s) => s.id === shipmentId);
    if (index === -1) throw new Error('Envío no encontrado');

    shipments[index].driverId = driverId;
    shipments[index].status = 'TRANSPORTISTA_ASIGNADO';
    shipments[index].updatedAt = new Date().toISOString();
    saveSimulatedShipments(shipments);
  }

  // Sincronizar el estado en la orden
  const shipment = await getShipmentById(shipmentId);
  if (shipment) {
    const { updateOrderStatus } = await import('./orderService');
    await updateOrderStatus(shipment.orderId, 'TRANSPORTISTA_ASIGNADO');
  }
};

// Actualizar el estado de un envío (y sincronizar el estado de la orden correspondiente)
// Actualizar el estado de un envío (y sincronizar el estado de la orden correspondiente)
export const updateShipmentStatus = async (shipmentId: string, status: ShipmentStatus): Promise<void> => {
  let orderId: string | undefined;

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'shipments', shipmentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        orderId = docSnap.data().orderId;
      }
      await updateDoc(docRef, {
        status: status,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error al actualizar estado del envío en Firestore:', error);
    }
  } else {
    // Fallback simulado
    const shipments = getSimulatedShipments();
    const index = shipments.findIndex((s) => s.id === shipmentId);
    if (index !== -1) {
      shipments[index].status = status;
      shipments[index].updatedAt = new Date().toISOString();
      orderId = shipments[index].orderId;
      saveSimulatedShipments(shipments);
    }
  }

  // Mapeo e inicio de la sincronización con el estado de la orden
  if (orderId) {
    const orderService = await import('./orderService');
    if (status === 'TRANSPORTISTA_ASIGNADO') {
      await orderService.updateOrderStatus(orderId, 'TRANSPORTISTA_ASIGNADO');
    } else if (status === 'EN_RUTA_RECOJO' || status === 'CARGA_RECOGIDA' || status === 'EN_RUTA_ENTREGA' || status === 'ALERTA_RUTA') {
      await orderService.updateOrderStatus(orderId, 'EN_RUTA');
    } else if (status === 'ENTREGADO') {
      await orderService.updateOrderStatus(orderId, 'ENTREGADO');
    } else if (status === 'CANCELADO') {
      await orderService.updateOrderStatus(orderId, 'CANCELADO');
    }
  }
};

/**
 * PARTE 4: Escuchar cambios de un envío específico en tiempo real
 */
export const subscribeToShipment = (
  shipmentId: string,
  callback: (shipment: Shipment | null) => void
): (() => void) => {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'shipments', shipmentId);

    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as Shipment);
      } else {
        callback(null);
      }
    }, (error) => {
      console.error('Error en tiempo real en shipments:', error);
    });
  }

  // Fallback simulado
  const shipments = getSimulatedShipments();
  const found = shipments.find((s) => s.id === shipmentId) || null;
  callback(found);

  return () => console.log('[AgroRuta Mock] Desuscripción inactiva');
};

/**
 * PARTE 4 (Extra): Escuchar todos los envíos de un usuario en tiempo real (Para el Dashboard)
 */
export const subscribeToUserShipments = (
  userId: string,
  role: 'FARMER' | 'BUYER' | 'DRIVER',
  callback: (shipments: Shipment[]) => void
): (() => void) => {
  if (isFirebaseConfigured && db) {
    // Determinar qué campo buscar según el rol
    const fieldToQuery = role === 'FARMER' ? 'farmerId' : role === 'BUYER' ? 'buyerId' : 'driverId';
    const q = query(collection(db, 'shipments'), where(fieldToQuery, '==', userId));

    return onSnapshot(q, (snapshot) => {
      const userShipments = snapshot.docs.map(doc => doc.data() as Shipment);
      callback(userShipments);
    }, (error) => {
      console.error('Error en tiempo real (user shipments):', error);
    });
  }

  // Fallback simulado
  const allShipments = getSimulatedShipments();
  const field = role === 'FARMER' ? 'farmerId' : role === 'BUYER' ? 'buyerId' : 'driverId';
  const filtered = allShipments.filter(s => (s as any)[field] === userId);
  callback(filtered);

  return () => console.log('[AgroRuta Mock] Desuscripción de lista de envíos inactiva');
};