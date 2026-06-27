import { create } from 'zustand'

export type TabId = 'dashboard' | 'rutas' | 'envios' | 'alertas' | 'historial' | 'perfil' | 'config'
export type DriverStatus = 'en_ruta' | 'disponible' | 'fuera_servicio'

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
  eta?: string
  farmerLoaded?: boolean
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

const INITIAL_SHIPMENTS: MockShipment[] = [
  {
    id: 'sh1',
    product: 'Papa Amarilla Tumbay',
    weight: 1500,
    farmer: 'Juan Pérez',
    buyer: 'Supermercados Metro',
    status: 'EN_TRANSITO',
    eta: '2h 15m'
  },
  {
    id: 'sh2',
    product: 'Café Arábica Orgánico',
    weight: 500,
    farmer: 'Carlos Ramos',
    buyer: 'Exportaciones Andes',
    status: 'PENDIENTE_CARGA',
    farmerLoaded: false
  }
]

export const useTransporterStore = create<TransporterState>((set) => ({
  activeTab: 'dashboard',
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

  simulateFarmerLoaded: () => {
    set((state) => {
      // Find the first pending shipment and mark it as loaded by farmer
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
