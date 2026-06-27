import { create } from 'zustand'

export type TransporterState = 'disponible' | 'revisando_carga' | 'carga_aceptada' | 'carga_confirmada' | 'en_ruta' | 'ruta_bloqueada' | 'ruta_alterna' | 'entregado' | 'finalizado' | 'viaje_pausado'

export interface Carga {
  id: string
  producto: string
  kg: number
  pago: number
  agricultor: string
  telefonoAgricultor: string
  origen: string
  destino: string
  distanciaKm: number
  duracionEstimadaMin: number
  horaRecojo: string
  horaEntregaMaxima: string
  estadoRuta: 'libre' | 'riesgo' | 'bloqueada'
  riesgo: 'BAJO' | 'MEDIO' | 'GRAVE'
  prioridad: 'URGENTE' | 'RETRASADO' | 'DISPONIBLE'
  requiereFrio: boolean
  coordenadasOrigen: [number, number]
  coordenadasDestino: [number, number]
  motivoBloqueo: string | null
}

export const cargasDisponiblesIniciales: Carga[] = [
  {
    id: 'carga-maiz-001',
    producto: 'Maíz amarillo',
    kg: 300,
    pago: 600,
    agricultor: 'Pedro Salazar',
    telefonoAgricultor: '987 654 321',
    origen: 'Lauricocha',
    destino: 'Huánuco centro',
    distanciaKm: 78,
    duracionEstimadaMin: 135,
    horaRecojo: '15:30',
    horaEntregaMaxima: '18:30',
    estadoRuta: 'riesgo',
    riesgo: 'MEDIO',
    prioridad: 'URGENTE',
    requiereFrio: false,
    coordenadasOrigen: [-10.073, -76.632],
    coordenadasDestino: [-9.9306, -76.2401],
    motivoBloqueo: null,
  },
  {
    id: 'carga-cafe-001',
    producto: 'Café',
    kg: 200,
    pago: 450,
    agricultor: 'María Torres',
    telefonoAgricultor: '976 111 222',
    origen: 'Leoncio Prado',
    destino: 'Aucayacu',
    distanciaKm: 64,
    duracionEstimadaMin: 110,
    horaRecojo: '15:00',
    horaEntregaMaxima: '17:00',
    estadoRuta: 'bloqueada',
    riesgo: 'GRAVE',
    prioridad: 'RETRASADO',
    requiereFrio: false,
    coordenadasOrigen: [-9.295, -75.995],
    coordenadasDestino: [-8.931, -76.113],
    motivoBloqueo: 'Ruta bloqueada por derrumbe reportado',
  },
  {
    id: 'carga-aguacate-001',
    producto: 'Aguacate',
    kg: 150,
    pago: 380,
    agricultor: 'Rosa Huamán',
    telefonoAgricultor: '965 333 444',
    origen: 'Marañón',
    destino: 'Huánuco centro',
    distanciaKm: 42,
    duracionEstimadaMin: 75,
    horaRecojo: '16:00',
    horaEntregaMaxima: '19:00',
    estadoRuta: 'libre',
    riesgo: 'BAJO',
    prioridad: 'DISPONIBLE',
    requiereFrio: false,
    coordenadasOrigen: [-9.827, -76.109],
    coordenadasDestino: [-9.9306, -76.2401],
    motivoBloqueo: null,
  },
  {
    id: 'carga-cacao-001',
    producto: 'Cacao Orgánico',
    kg: 500,
    pago: 850,
    agricultor: 'Carlos Ruiz',
    telefonoAgricultor: '945 123 456',
    origen: 'Tingo María',
    destino: 'Huánuco centro',
    distanciaKm: 120,
    duracionEstimadaMin: 180,
    horaRecojo: '14:00',
    horaEntregaMaxima: '19:00',
    estadoRuta: 'libre',
    riesgo: 'BAJO',
    prioridad: 'DISPONIBLE',
    requiereFrio: false,
    coordenadasOrigen: [-9.300, -76.000],
    coordenadasDestino: [-9.9306, -76.2401],
    motivoBloqueo: null,
  },
  {
    id: 'carga-limon-001',
    producto: 'Limón Tahití',
    kg: 1000,
    pago: 1200,
    agricultor: 'Ana Silva',
    telefonoAgricultor: '934 987 654',
    origen: 'Ambo',
    destino: 'Huánuco centro',
    distanciaKm: 25,
    duracionEstimadaMin: 45,
    horaRecojo: '17:00',
    horaEntregaMaxima: '18:30',
    estadoRuta: 'riesgo',
    riesgo: 'MEDIO',
    prioridad: 'URGENTE',
    requiereFrio: false,
    coordenadasOrigen: [-10.123, -76.200],
    coordenadasDestino: [-9.9306, -76.2401],
    motivoBloqueo: null,
  },
  {
    id: 'carga-trigo-001',
    producto: 'Trigo',
    kg: 2500,
    pago: 1800,
    agricultor: 'Juan Perez',
    telefonoAgricultor: '999 888 777',
    origen: 'Pachitea',
    destino: 'Huánuco centro',
    distanciaKm: 60,
    duracionEstimadaMin: 120,
    horaRecojo: '13:00',
    horaEntregaMaxima: '17:00',
    estadoRuta: 'libre',
    riesgo: 'BAJO',
    prioridad: 'DISPONIBLE',
    requiereFrio: false,
    coordenadasOrigen: [-9.900, -75.900],
    coordenadasDestino: [-9.9306, -76.2401],
    motivoBloqueo: null,
  }
]

export interface Transportista {
  id: string
  nombre: string
  vehiculo: string
  placa: string
  capacidadKg: number
  ubicacionActual: string
  lat: number
  lng: number
  disponible: boolean
  rating: number
  horaDisponibleDesde: string
  puntos: number
}

const transportistaDemoInicial: Transportista = {
  id: 't1',
  nombre: 'Luis Ramos',
  vehiculo: 'Camión 2 toneladas',
  placa: 'W2A-345',
  capacidadKg: 2000,
  ubicacionActual: 'Huánuco centro',
  lat: -9.9306,
  lng: -76.2401,
  disponible: true,
  rating: 4.8,
  horaDisponibleDesde: '14:30',
  puntos: 450,
}

interface TransporterStoreState {
  transportista: Transportista
  estadoViaje: TransporterState
  cargasDisponibles: Carga[]
  viajeActivo: Carga | null
  progresoViaje: number // 0 a 100
  intervaloViaje: ReturnType<typeof setInterval> | null
  
  // Compatibility variables for Jeferson's code
  tripProgress: number
  tripState: string

  // Actions
  aceptarFlete: (carga: Carga) => void
  confirmarCarga: () => void
  iniciarRuta: () => void
  activarRutaAlterna: () => void
  confirmarEntrega: () => void
  finalizarViaje: () => void
  actualizarProgreso: (p: number) => void
  setRutaBloqueada: () => void
  despejarRuta: () => void
  agregarPuntos: (pts: number) => void
}

export const useTransporterStore = create<TransporterStoreState>((set, get) => ({
  transportista: { ...transportistaDemoInicial },
  estadoViaje: 'disponible',
  cargasDisponibles: [...cargasDisponiblesIniciales],
  viajeActivo: null,
  progresoViaje: 0,
  intervaloViaje: null,
  tripProgress: 0,
  tripState: 'NOT_STARTED',

  aceptarFlete: (carga) => {
    set((state) => ({
      viajeActivo: carga,
      estadoViaje: 'carga_aceptada',
      tripState: 'NOT_STARTED',
      cargasDisponibles: state.cargasDisponibles.filter(c => c.id !== carga.id),
      transportista: { ...state.transportista, disponible: false }
    }))
  },

  confirmarCarga: () => set({ estadoViaje: 'carga_confirmada', tripState: 'NOT_STARTED' }),

  iniciarRuta: () => {
    set({ estadoViaje: 'en_ruta', tripState: 'EN_RUTA' })
    const interval = setInterval(() => {
      const state = get()
      if (state.progresoViaje >= 100) {
        clearInterval(interval)
      } else {
        const newProgress = Math.min(100, state.progresoViaje + 5)
        set({ progresoViaje: newProgress, tripProgress: newProgress })
      }
    }, 3000)
    set({ intervaloViaje: interval })
  },

  activarRutaAlterna: () => set({ estadoViaje: 'ruta_alterna', tripState: 'EN_RUTA' }),

  confirmarEntrega: () => {
    const { intervaloViaje } = get()
    if (intervaloViaje) clearInterval(intervaloViaje)
    set({ estadoViaje: 'entregado', progresoViaje: 100, tripProgress: 100, tripState: 'COMPLETED' })
  },

  finalizarViaje: () => set((state) => ({
    viajeActivo: null,
    estadoViaje: 'disponible',
    progresoViaje: 0,
    tripProgress: 0,
    tripState: 'NOT_STARTED',
    intervaloViaje: null,
    transportista: { ...state.transportista, disponible: true }
  })),

  actualizarProgreso: (p) => set({ progresoViaje: p, tripProgress: p }),
  
  setRutaBloqueada: () => {
    const { intervaloViaje } = get()
    if (intervaloViaje) clearInterval(intervaloViaje)
    set({ estadoViaje: 'ruta_bloqueada', tripState: 'VIAJE_PAUSADO', intervaloViaje: null })
  },

  despejarRuta: () => set({ estadoViaje: 'viaje_pausado', tripState: 'VIAJE_PAUSADO' }),
  
  agregarPuntos: (pts: number) => set((state) => ({
    transportista: { ...state.transportista, puntos: state.transportista.puntos + pts }
  }))
}))
