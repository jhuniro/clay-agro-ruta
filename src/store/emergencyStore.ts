import { create } from 'zustand'

// ─── Types ───────────────────────────────────────────────────────────────────
export type EmergencyType = 'huaico' | 'derrumbe' | 'bloqueo' | 'lluvia'

export interface EmergencyImpact {
  kgProtegidos: number
  perdidaEvitada: number
  tiempoAhorradoMin: number
  rutasReprogramadas: number
  alertasAtendidas: number
}

interface EmergencyState {
  isEmergency: boolean
  emergencyType: EmergencyType | null
  emergencyMessage: string
  blockedRouteId: string | null
  alternativeRouteActive: boolean
  impacto: EmergencyImpact

  triggerEmergency: (type?: EmergencyType) => void
  activateAlternativeRoute: () => void
  resetEmergency: () => void
}

// ─── Demo data per emergency type ────────────────────────────────────────────
const EMERGENCY_MESSAGES: Record<EmergencyType, string> = {
  huaico:
    '🚨 Huaico detectado en la ruta Huánuco – Tingo María (km 42). Se recomienda tomar ruta alterna por Llacuabamba.',
  derrumbe:
    '🚨 Derrumbe reportado en la vía Ambo – Huánuco. Carril parcialmente bloqueado.',
  bloqueo:
    '🚨 Bloqueo de ruta activo entre Lauricocha y Huánuco centro. Busque desvío.',
  lluvia:
    '🚨 Lluvia intensa en zona Leoncio Prado. Riesgo de deslizamiento en carretera.',
}

const EMERGENCY_IMPACTS: Record<EmergencyType, EmergencyImpact> = {
  huaico: {
    kgProtegidos: 500,
    perdidaEvitada: 180,
    tiempoAhorradoMin: 80,
    rutasReprogramadas: 1,
    alertasAtendidas: 1,
  },
  derrumbe: {
    kgProtegidos: 300,
    perdidaEvitada: 120,
    tiempoAhorradoMin: 45,
    rutasReprogramadas: 1,
    alertasAtendidas: 1,
  },
  bloqueo: {
    kgProtegidos: 800,
    perdidaEvitada: 250,
    tiempoAhorradoMin: 120,
    rutasReprogramadas: 2,
    alertasAtendidas: 2,
  },
  lluvia: {
    kgProtegidos: 200,
    perdidaEvitada: 90,
    tiempoAhorradoMin: 30,
    rutasReprogramadas: 1,
    alertasAtendidas: 1,
  },
}

const INITIAL_IMPACT: EmergencyImpact = {
  kgProtegidos: 0,
  perdidaEvitada: 0,
  tiempoAhorradoMin: 0,
  rutasReprogramadas: 0,
  alertasAtendidas: 0,
}

// ─── Store ───────────────────────────────────────────────────────────────────
export const useEmergencyStore = create<EmergencyState>()((set) => ({
  isEmergency: false,
  emergencyType: null,
  emergencyMessage: '',
  blockedRouteId: null,
  alternativeRouteActive: false,
  impacto: { ...INITIAL_IMPACT },

  triggerEmergency: (type: EmergencyType = 'huaico') =>
    set({
      isEmergency: true,
      emergencyType: type,
      emergencyMessage: EMERGENCY_MESSAGES[type],
      blockedRouteId: 'a1',
      alternativeRouteActive: false,
      impacto: { ...EMERGENCY_IMPACTS[type] },
    }),

  activateAlternativeRoute: () =>
    set((state) => ({
      alternativeRouteActive: true,
      impacto: {
        ...state.impacto,
        rutasReprogramadas: state.impacto.rutasReprogramadas + 1,
      },
    })),

  resetEmergency: () =>
    set({
      isEmergency: false,
      emergencyType: null,
      emergencyMessage: '',
      blockedRouteId: null,
      alternativeRouteActive: false,
      impacto: { ...INITIAL_IMPACT },
    }),
}))
