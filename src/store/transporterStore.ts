import { create } from 'zustand'

export type TabId = 'dashboard' | 'rutas' | 'envios' | 'alertas' | 'historial' | 'perfil' | 'config'
export type DriverStatus = 'en_ruta' | 'disponible' | 'fuera_servicio'
export type TripState = 'NOT_STARTED' | 'EN_RUTA' | 'VIAJE_PAUSADO' | 'FINISHED'

export interface MockAlert {
  id: string
  type: 'HUAICO' | 'DERRUMBE' | 'LLUVIA' | 'ACCIDENTE' | 'BLOQUEO_VIAL'
  route: string
  description: string
  timeElapsed: string
  severity: 'GRAVE' | 'MODERADO'
  coord: [number, number]
}

export interface MockShipment {
  id: string
  product: string
  weight: number
  farmer: string
  buyer: string
  status: 'PENDIENTE_CARGA' | 'EN_TRANSITO' | 'ENTREGADO' | 'CON_INCIDENTE' | 'LLEGANDO'
  routeStatus: 'libre' | 'riesgo' | 'bloqueada'
  eta?: string
  farmerLoaded?: boolean
  price: number
  origin: string
  destination: string
  date: string
}

interface TransporterState {
  activeTab: TabId
  setActiveTab: (tab: TabId) => void

  driverStatus: DriverStatus
  setDriverStatus: (status: DriverStatus) => void

  alerts: MockAlert[]
  unreadAlertsCount: number
  markAlertsRead: () => void
  addAlert: (alert: MockAlert) => void

  shipments: MockShipment[]
  updateShipmentStatus: (id: string, status: MockShipment['status']) => void
  setFarmerLoaded: (id: string, loaded: boolean) => void

  incidentModalOpen: boolean
  setIncidentModalOpen: (open: boolean) => void

  routeBlocked: boolean
  setRouteBlocked: (blocked: boolean) => void

  // --- Gamificación ---
  points: number
  addPoints: (pts: number) => void

  // --- Lógica de Viaje Realista ---
  tripProgress: number // 0 to 100
  tripState: TripState
  setTripProgress: (progress: number) => void
  setTripState: (state: TripState) => void
  
  // --- Simulación PWA Offline ---
  isOffline: boolean
  setIsOffline: (offline: boolean) => void

  // Demo actions
  simulateFarmerLoaded: () => void
  simulateRouteBlock: () => void
}

const INITIAL_ALERTS: MockAlert[] = [
  {
    id: 'a1',
    type: 'HUAICO',
    route: 'Ruta Ambo - Huánuco',
    description: 'Deslizamiento de lodo obstruye 1 carril',
    timeElapsed: 'Hace 10 min',
    severity: 'GRAVE',
    coord: [-10.128, -76.205]
  },
  {
    id: 'a2',
    type: 'LLUVIA',
    route: 'Tingo María Sur',
    description: 'Lluvia intensa reduce visibilidad',
    timeElapsed: 'Hace 45 min',
    severity: 'MODERADO',
    coord: [-9.31, -76.01]
  }
]

// Cargas de la Bolsa
const INITIAL_SHIPMENTS: MockShipment[] = [
  {
    id: 'sh1',
    product: 'Papa Amarilla Tumbay',
    weight: 1500,
    farmer: 'Juan Pérez',
    buyer: 'Supermercados Metro',
    status: 'PENDIENTE_CARGA',
    routeStatus: 'libre',
    price: 350,
    origin: 'Ambo',
    destination: 'Mercado Mayorista Puelles',
    date: 'Hoy, 08:00 AM'
  },
  {
    id: 'sh2',
    product: 'Café Arábica Orgánico',
    weight: 500,
    farmer: 'Carlos Ramos',
    buyer: 'Exportaciones Andes',
    status: 'PENDIENTE_CARGA',
    routeStatus: 'riesgo',
    price: 180,
    origin: 'Chinchao',
    destination: 'Tingo María',
    date: 'Mañana, 09:00 AM',
    farmerLoaded: false
  },
  {
    id: 'sh3',
    product: 'Cacao Orgánico',
    weight: 2000,
    farmer: 'María López',
    buyer: 'Chocolates del Perú',
    status: 'PENDIENTE_CARGA',
    routeStatus: 'bloqueada',
    price: 600,
    origin: 'Leoncio Prado',
    destination: 'Huánuco',
    date: 'Hoy, 02:00 PM',
  }
]

export const useTransporterStore = create<TransporterState>((set) => ({
  activeTab: 'rutas',
  setActiveTab: (tab) => set({ activeTab: tab }),

  driverStatus: 'disponible',
  setDriverStatus: (status) => set({ driverStatus: status }),

  alerts: INITIAL_ALERTS,
  unreadAlertsCount: 2,
  markAlertsRead: () => set({ unreadAlertsCount: 0 }),
  addAlert: (alert) => set((state) => ({ 
    alerts: [alert, ...state.alerts],
    unreadAlertsCount: state.unreadAlertsCount + 1
  })),

  shipments: INITIAL_SHIPMENTS,
  updateShipmentStatus: (id, status) => set((state) => ({
    shipments: state.shipments.map(s => s.id === id ? { ...s, status } : s)
  })),
  setFarmerLoaded: (id, loaded) => set((state) => ({
    shipments: state.shipments.map(s => s.id === id ? { ...s, farmerLoaded: loaded } : s)
  })),

  incidentModalOpen: false,
  setIncidentModalOpen: (open) => set({ incidentModalOpen: open }),

  routeBlocked: false,
  setRouteBlocked: (blocked) => set({ routeBlocked: blocked }),

  points: 450,
  addPoints: (pts) => set((state) => ({ points: state.points + pts })),

  tripProgress: 0,
  tripState: 'NOT_STARTED',
  setTripProgress: (progress) => set({ tripProgress: Math.min(100, Math.max(0, progress)) }),
  setTripState: (tripState) => set({ tripState }),

  isOffline: false,
  setIsOffline: (isOffline) => set({ isOffline }),

  simulateFarmerLoaded: () => {
    set((state) => {
      const sh = state.shipments.find(s => s.status === 'PENDIENTE_CARGA' && !s.farmerLoaded)
      if (sh) {
        return {
          shipments: state.shipments.map(s => s.id === sh.id ? { ...s, farmerLoaded: true } : s)
        }
      }
      return {}
    })
  },
  
  simulateRouteBlock: () => {
    set((state) => ({ routeBlocked: !state.routeBlocked }))
  }
}))

