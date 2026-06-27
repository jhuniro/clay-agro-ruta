import { create } from 'zustand'

export type TransporterTab = 'inicio' | 'cargas' | 'rutas'

interface TransporterState {
  tab: TransporterTab
  setTab: (tab: string) => void
}

export const useTransporterStore = create<TransporterState>((set) => ({
  tab: 'inicio',
  setTab: (tab) => set({ tab: (tab as TransporterTab) || 'inicio' }),
}))
