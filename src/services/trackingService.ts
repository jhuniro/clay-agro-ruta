// src/services/trackingService.ts
import { db, isFirebaseConfigured } from '../lib/firebase';
import { doc, setDoc, onSnapshot, getDoc } from 'firebase/firestore';

export interface DriverTracking {
    driverId: string;
    shipmentId: string;
    location: {
        lat: number;
        lng: number;
    };
    updatedAt: string;
}

const TRACKING_STORAGE_KEY = 'agroruta_driver_tracking';

const getSimulatedTracking = (): Record<string, DriverTracking> => {
    const data = localStorage.getItem(TRACKING_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
};

/**
 * Actualiza la ubicación del transportista (Solo si está IN_TRANSIT)
 */
export const updateDriverLocation = async (
    driverId: string,
    shipmentId: string,
    location: { lat: number; lng: number }
): Promise<void> => {
    const trackingData: DriverTracking = {
        driverId,
        shipmentId,
        location,
        updatedAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
        try {
            // Regla de negocio: Verificar que el envío esté realmente en ruta
            const shipmentRef = doc(db, 'shipments', shipmentId);
            const shipmentSnap = await getDoc(shipmentRef);

            if (shipmentSnap.exists() && shipmentSnap.data().status === 'IN_TRANSIT') {
                await setDoc(doc(db, 'driver_tracking', driverId), trackingData);
            }
        } catch (error) {
            console.error('Error al actualizar coordenadas de tracking:', error);
        }
        return;
    }

    // Fallback simulado local
    const trackingMap = getSimulatedTracking();
    trackingMap[driverId] = trackingData;
    localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(trackingMap));
};

/**
 * PARTE 4: Escucha activa de la ubicación de un transportista en tiempo real
 * Ideal para que el Comprador pinte el movimiento en Mapbox
 */
export const subscribeToDriverTracking = (
    driverId: string,
    callback: (tracking: DriverTracking | null) => void
): (() => void) => {
    if (isFirebaseConfigured && db) {
        const docRef = doc(db, 'driver_tracking', driverId);
        return onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                callback(docSnap.data() as DriverTracking);
            } else {
                callback(null);
            }
        });
    }

    // Fallback simulado local
    const trackingMap = getSimulatedTracking();
    callback(trackingMap[driverId] || null);
    return () => console.log('[AgroRuta Mock] Desuscripción de tracking inactiva');
};