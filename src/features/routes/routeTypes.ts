export type Coordinate = [number, number]

export type RouteStatus = 'LIBRE' | 'RIESGO' | 'BLOQUEADA'

export type IncidentType =
  | 'HUAICO'
  | 'DERRUMBE'
  | 'BLOQUEO'
  | 'LLUVIA'
  | 'ACCIDENTE'
  | 'VIA_LENTA'
  | 'OTRO'

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH'

export interface RouteCoordinates {
  origin: Coordinate
  destination: Coordinate
}

export interface AlternativeRoute {
  id: string
  name: string
  distance: string
  estimatedTime: string
  status: RouteStatus
  waypoints: Coordinate[]
  recommendation?: string
}

export interface Route {
  id: string
  name: string
  origin: string
  destination: string
  status: RouteStatus
  estimatedTime: string
  distance: string
  incidentType?: IncidentType
  recommendation: string
  coordinates: RouteCoordinates
  waypoints: Coordinate[]
  alternativeRoutes: AlternativeRoute[]
}

export interface Incident {
  id: string
  routeId: string
  routeName: string
  type: IncidentType
  severity: Severity
  description: string
  reportedAt: string
  recommendation: string
  coordinate: Coordinate
}

export interface RouteTip {
  tip: string
}

export interface RouteFAQ {
  question: string
  answer: string
}
