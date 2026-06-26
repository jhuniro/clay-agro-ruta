// src/services/incidentService.ts
import { db, isFirebaseConfigured } from '../lib/firebase';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';

export interface Incident {
    id: string;
    type: 'HUAICO' | 'ACCIDENT' | 'BLOCK' | 'WEATHER' | 'TRAFFIC';
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    description: string;
    location: { lat: number; lng: number };
    createdAt: string;
}

// Crear un reporte de bloqueo o huaico en la carretera
export const createIncident = async (incident: Incident): Promise<void> => {
    if (isFirebaseConfigured && db) {
        try {
            await setDoc(doc(db, 'incidents', incident.id), incident);
        } catch (e) {
            console.error('Error al reportar incidencia:', e);
        }
    }
};

// Escuchar alertas viales en tiempo real para pintarlas en Mapbox
export const subscribeToActiveIncidents = (callback: (incidents: Incident[]) => void) => {
    if (isFirebaseConfigured && db) {
        return onSnapshot(collection(db, 'incidents'), (snapshot) => {
            const incidents = snapshot.docs.map(doc => doc.data() as Incident);
            callback(incidents);
        });
    }
    callback([]);
    return () => { };
};