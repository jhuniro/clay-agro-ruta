import { RoadReport } from '../types/routeTypes';

export const mockHuaicoReport: RoadReport = {
  id: 'report_incident_01',
  reportedBy: 'user_driver_huanuco_01',
  type: 'HUAICO',
  description: 'Desprendimiento de lodo de gran magnitud bloquea ambos carriles en la subida a Carpish.',
  severity: 'HIGH',
  location: {
    lat: -9.6978,
    lng: -76.0983,
    district: 'Chinchao',
    reference: 'Km 58 de la Carretera Central, cerca del Túnel de Carpish'
  },
  routeName: 'Carretera Central (Tramo Huánuco - Tingo María)',
  status: 'ACTIVE',
  createdAt: '2026-06-26T11:00:00Z'
};

export const mockDerrumbeReport: RoadReport = {
  id: 'report_incident_02',
  reportedBy: 'user_farmer_huanuco_01',
  type: 'DERRUMBE',
  description: 'Piedras y rocas caídas en media vía. Paso restringido a un solo carril de manera alternada.',
  severity: 'MEDIUM',
  location: {
    lat: -9.8450,
    lng: -76.0220,
    district: 'Umari',
    reference: 'Carretera Rancho - Panao Km 12'
  },
  routeName: 'Vía Rancho - Panao - Chaglla',
  status: 'ACTIVE',
  createdAt: '2026-06-26T12:15:00Z'
};

export const mockLluviaReport: RoadReport = {
  id: 'report_incident_03',
  reportedBy: 'user_driver_huanuco_01',
  type: 'LLUVIA',
  description: 'Lluvia persistente dificulta la visibilidad, asfalto resbaloso. Se recomienda transitar a velocidad baja.',
  severity: 'LOW',
  location: {
    lat: -9.3245,
    lng: -75.9890,
    district: 'Rupa-Rupa',
    reference: 'Entrada sur de Tingo María'
  },
  routeName: 'Carretera Central (Sector Las Palmas)',
  status: 'ACTIVE',
  createdAt: '2026-06-26T13:00:00Z'
};

export const mockResolvedReport: RoadReport = {
  id: 'report_incident_04',
  reportedBy: 'user_farmer_huanuco_01',
  type: 'BLOQUEO',
  description: 'Pobladores locales realizan paro preventivo obstaculizando el paso con neumáticos.',
  severity: 'HIGH',
  location: {
    lat: -10.0620,
    lng: -76.2088,
    district: 'Ambo',
    reference: 'Puente de Huancachupa'
  },
  routeName: 'Carretera Central (Tramo Huánuco - Cerro de Pasco)',
  status: 'RESOLVED',
  createdAt: '2026-06-25T07:00:00Z'
};

export const mockRoadReports: RoadReport[] = [
  mockHuaicoReport,
  mockDerrumbeReport,
  mockLluviaReport,
  mockResolvedReport
];
