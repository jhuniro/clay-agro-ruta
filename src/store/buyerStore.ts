import { create } from 'zustand'
import { BUYER_CONFIG, BUYER_NOTIFICATIONS, MY_ORDERS } from '../data/mockData'
import type { BuyerConfig, AppNotification, Order } from '../types'

export type BuyerTab = 'dashboard' | 'marketplace' | 'purchases' | 'profile' | 'config'

interface BuyerState {
  activeTab: BuyerTab
  config: BuyerConfig
  notifications: AppNotification[]
  buyHistory: Order[]
  favoriteProducts: string[]
  setActiveTab: (tab: BuyerTab) => void
  toggleNotification: (id: string) => void
  updateConfig: (key: keyof BuyerConfig, value: any) => void
  addPurchase: (order: Order) => void
  ratePurchase: (orderId: string, rating: number, comment: string) => void
}

export const useBuyerStore = create<BuyerState>((set) => ({
  activeTab: 'dashboard',
  config: BUYER_CONFIG,
  notifications: BUYER_NOTIFICATIONS,
  buyHistory: MY_ORDERS,
  favoriteProducts: ['Papa', 'Café', 'Maíz'],
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  toggleNotification: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, read: !n.read } : n
    )
  })),
  
  updateConfig: (key, value) => set((state) => ({
    config: { ...state.config, [key]: value }
  })),
  
  addPurchase: (order) => set((state) => ({
    buyHistory: [order, ...state.buyHistory]
  })),
  
  ratePurchase: (orderId, rating, comment) => set((state) => ({
    buyHistory: state.buyHistory.map(o => 
      o.id === orderId ? { ...o, rating, ratingComment: comment } : o
    )
  }))
}))
