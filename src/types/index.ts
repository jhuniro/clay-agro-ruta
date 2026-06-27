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
  categoryId?: string
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
  reports?: { time: string; msg: string }[]
  rating?: number
  ratingComment?: string
  images?: string[]
  deliverySchedule?: string
  paymentMethods?: string[]
  reviews?: Review[]
  description?: string
  driverName?: string
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

export interface BuyerProfile {
  id: string
  name: string
  avatar: string
  memberSince: string
  totalPurchases: number
  totalSpent: number
  activeSuppliers: number
  avgPurchase: number
  topProduct: string
  email: string
  type: string
  favoriteProducts: string[]
  preferredZone: string
}

export interface BuyerConfig {
  notifications: boolean
  darkMode: boolean
  language: 'es' | 'en'
  currency: 'PEN' | 'USD'
  units: 'kg' | 'lb'
}

export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface AppNotification {
  id: string
  title: string
  message: string
  date: string
  read: boolean
  type: 'info' | 'success' | 'warning' | 'error'
}

export type UserRole = 'farmer' | 'buyer' | 'transporter'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  address: string
  birthDate: string
  role: UserRole
  password?: string
}

export interface AuthState {
  user: User | null
  selectedRole: UserRole | null
  isAuthenticated: boolean
  loginError: string | null
  registerError: string | null
  registerSuccess: string | null
  setSelectedRole: (role: UserRole | null) => void
  login: (email: string, pass: string) => boolean
  register: (userData: Omit<User, 'id'>) => boolean
  logout: () => void
  clearErrors: () => void
  clearRegisterSuccess: () => void
}
