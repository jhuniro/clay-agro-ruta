import { create } from 'zustand'

export type FarmerTab = 'dashboard' | 'harvests' | 'search_transport' | 'reports' | 'sales'

export interface HarvestShipment {
  id: string
  product: string
  quantity: number
  unit: string
  status: 'DISPONIBLE' | 'BUSCANDO_TRANSPORTE' | 'EN_TRANSITO' | 'ENTREGADO' | 'RETRASADO'
  origin: string
  destination: string
  price: number
  driver?: string
  eta?: string
}

interface FarmerState {
  activeTab: FarmerTab
  setActiveTab: (tab: FarmerTab) => void
  
  shipments: HarvestShipment[]
  addShipment: (shipment: HarvestShipment) => void
}

const INITIAL_SHIPMENTS: HarvestShipment[] = [
  {
    id: 'f_sh1',
    product: 'Papa Huayro',
    quantity: 500,
    unit: 'kg',
    status: 'EN_TRANSITO',
    origin: 'Huamalíes',
    destination: 'Tingo María',
    price: 750,
    driver: 'Carlos M.',
    eta: '2h'
  },
  {
    id: 'f_sh2',
    product: 'Maíz amarillo',
    quantity: 300,
    unit: 'kg',
    status: 'BUSCANDO_TRANSPORTE',
    origin: 'Lauricocha',
    destination: 'Huánuco centro',
    price: 450
  },
  {
    id: 'f_sh3',
    product: 'Café',
    quantity: 200,
    unit: 'kg',
    status: 'RETRASADO',
    origin: 'Leoncio Prado',
    destination: 'Aucayacu',
    price: 2000,
    driver: 'Miguel C.',
    eta: '+4h retraso'
  }
]

export const useFarmerStore = create<FarmerState>((set) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  shipments: INITIAL_SHIPMENTS,
  addShipment: (shipment) => set((state) => ({ 
    shipments: [shipment, ...state.shipments] 
  }))
}))
