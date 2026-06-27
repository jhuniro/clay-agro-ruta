import { create } from 'zustand'

export type FarmerTab = 'inicio' | 'mapa'

interface FarmerState {
  tab: FarmerTab
  setTab: (tab: string) => void
}

export const useFarmerStore = create<FarmerState>((set) => ({
  tab: 'inicio',
  setTab: (tab) => set({ tab: (tab as FarmerTab) || 'inicio' }),
}))
