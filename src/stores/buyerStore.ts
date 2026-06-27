import { create } from 'zustand'

export type BuyerTab = 'inicio' | 'mercado' | 'compras' | 'perfil' | 'config'

interface BuyerState {
  tab: BuyerTab
  setTab: (tab: string) => void
}

export const useBuyerStore = create<BuyerState>((set) => ({
  tab: 'inicio',
  setTab: (tab) => set({ tab: (tab as BuyerTab) || 'inicio' }),
}))
