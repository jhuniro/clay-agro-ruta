import { LocationPoint } from './userTypes';

export type RouteStatus = 'LIBRE' | 'RIESGO' | 'BLOQUEADA';

export type IncidentType =
  | 'HUAICO'
  | 'DERRUMBE'
  | 'BLOQUEO'
  | 'LLUVIA'
  | 'ACCIDENTE'
  | 'VIA_LENTA'
  | 'OTRO';

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RoadReport {
  id: string;
  reportedBy: string; // User uid
  type: IncidentType;
  description: string;
  severity: Severity;
  location: LocationPoint;
  routeName?: string; // name of highway or local road
  status: 'ACTIVE' | 'RESOLVED';
  createdAt: string;
}
