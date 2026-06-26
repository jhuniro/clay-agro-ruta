export type RouteStatus = 'libre' | 'riesgo' | 'bloqueada'

export interface Coordinate {
  lat: number
  lng: number
}

export type OrderStatus =
  | 'AVAILABLE'
  | 'VENDIDO_ESPERANDO_TRANSPORTE'
  | 'EN_RUTA'
  | 'ENTREGADO'

export interface Order {
  id: string
  product: string
  emoji: string
  quantity: number
  unit: string
  price: number
  pricePerKg: number
  origin: string
  originCoord: Coordinate
  destination: string
  destinationCoord: Coordinate
  routeStatus: RouteStatus
  status: OrderStatus
  farmerName: string
  farmerPhone: string
  truckPlate?: string
  truckCoord?: Coordinate
  distanceKm: number
}

export interface WeatherData {
  city: string
  temp: number
  condition: string
  icon: string
  high: number
  low: number
}

export type AlertSeverity = 'info' | 'warning' | 'danger'

export interface RoadAlert {
  id: string
  zone: string
  message: string
  severity: AlertSeverity
}

export interface Category {
  id: string
  name: string
  emoji: string
}
