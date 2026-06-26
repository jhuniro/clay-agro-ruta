import { db, isFirebaseConfigured } from '../lib/firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { RoadReport } from '../types/routeTypes';
import { mockRoadReports } from '../data/mockRoadReports';

const STORAGE_KEY = 'agroruta_road_reports';

// Inicializar base de datos simulada en localStorage
const getSimulatedReports = (): RoadReport[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockRoadReports));
    return mockRoadReports;
  }
  return JSON.parse(data);
};

const saveSimulatedReports = (reports: RoadReport[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
};

// Obtener un reporte vial por ID
export const getRoadReportById = async (reportId: string): Promise<RoadReport | null> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'road_reports', reportId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as RoadReport;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener reporte vial en Firestore:', error);
    }
  }

  // Fallback simulado
  const reports = getSimulatedReports();
  return reports.find((r) => r.id === reportId) || null;
};

// Obtener todas las alertas viales activas
export const getActiveRoadReports = async (): Promise<RoadReport[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'road_reports'), where('status', '==', 'ACTIVE'));
      const querySnapshot = await getDocs(q);
      const reports: RoadReport[] = [];
      querySnapshot.forEach((docSnap) => {
        reports.push(docSnap.data() as RoadReport);
      });
      return reports;
    } catch (error) {
      console.error('Error al obtener reportes viales activos en Firestore:', error);
    }
  }

  // Fallback simulado
  const reports = getSimulatedReports();
  return reports.filter((r) => r.status === 'ACTIVE');
};

// Registrar una nueva incidencia vial / reporte de ruta
export const createRoadReport = async (report: RoadReport): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'road_reports', report.id);
      await setDoc(docRef, report);
      return;
    } catch (error) {
      console.error('Error al guardar reporte vial en Firestore:', error);
    }
  }

  // Fallback simulado
  const reports = getSimulatedReports();
  reports.push(report);
  saveSimulatedReports(reports);
};

// Resolver/Cerrar una alerta vial
export const resolveRoadReport = async (reportId: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'road_reports', reportId);
      await updateDoc(docRef, { status: 'RESOLVED' });
      return;
    } catch (error) {
      console.error('Error al resolver reporte vial en Firestore:', error);
    }
  }

  // Fallback simulado
  const reports = getSimulatedReports();
  const index = reports.findIndex((r) => r.id === reportId);
  if (index !== -1) {
    reports[index].status = 'RESOLVED';
    saveSimulatedReports(reports);
  }
};
