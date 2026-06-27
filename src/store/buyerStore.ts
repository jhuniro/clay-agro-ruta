import { create } from 'zustand'

export type BuyerTab = 'dashboard' | 'marketplace' | 'purchases' | 'profile' | 'config'

interface BuyerState {
  activeTab: BuyerTab
  setActiveTab: (tab: BuyerTab) => void
}

export const useBuyerStore = create<BuyerState>((set) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
}))
