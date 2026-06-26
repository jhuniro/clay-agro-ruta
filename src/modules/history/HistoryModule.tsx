import { useState } from 'react'
import { Calendar, Package, Truck, AlertTriangle } from 'lucide-react'
import DashboardCard from '../../components/DashboardCard'
import { useApp } from '../../context/AppContext'

type Tab = 'all' | 'compras' | 'ventas' | 'envios' | 'reportes'

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'compras', label: 'Compras' },
  { id: 'ventas', label: 'Ventas' },
  { id: 'envios', label: 'Envíos' },
  { id: 'reportes', label: 'Reportes' },
]

interface HistoryItem {
  id: string
  type: 'compra' | 'venta' | 'envio' | 'reporte'
  title: string
  detail: string
  amount?: string
  date: string
  icon: typeof Package
  iconColor: string
}

const HISTORY_DATA: Record<string, HistoryItem[]> = {
  farmer: [
    { id: '1', type: 'venta', title: 'Papas Huayro', detail: 'Vendido a María López', amount: 'S/ 80.00', date: '26 Jun', icon: Package, iconColor: 'text-[#00e676]' },
    { id: '2', type: 'venta', title: 'Zanahorias', detail: 'Vendido a CompraLocal', amount: 'S/ 45.00', date: '25 Jun', icon: Package, iconColor: 'text-[#00e676]' },
    { id: '3', type: 'envio', title: 'Envío a Mercado Central', detail: 'Completado', date: '25 Jun', icon: Truck, iconColor: 'text-[#0088ff]' },
    { id: '4', type: 'reporte', title: 'Huaico Ruta 3', detail: 'Bloqueo reportado', date: '24 Jun', icon: AlertTriangle, iconColor: 'text-[#ff3355]' },
  ],
  buyer: [
    { id: '1', type: 'compra', title: 'Papas Huayro', detail: 'Compra de Juan Pérez', amount: 'S/ 80.00', date: '26 Jun', icon: Package, iconColor: 'text-[#ffab00]' },
    { id: '2', type: 'compra', title: 'Maíz', detail: 'Compra de Pillco Marca', amount: 'S/ 120.00', date: '24 Jun', icon: Package, iconColor: 'text-[#ffab00]' },
    { id: '3', type: 'envio', title: 'Recepción en Amarilis', detail: 'Entregado', date: '25 Jun', icon: Truck, iconColor: 'text-[#0088ff]' },
  ],
  transporter: [
    { id: '1', type: 'envio', title: 'Huánuco → Amarilis', detail: '50 kg Papas · Completado', amount: 'S/ 40.00', date: '26 Jun', icon: Truck, iconColor: 'text-[#00e676]' },
    { id: '2', type: 'envio', title: 'Amarilis → Mercado', detail: 'Entrega completada', amount: 'S/ 60.00', date: '25 Jun', icon: Truck, iconColor: 'text-[#00e676]' },
    { id: '3', type: 'reporte', title: 'Lluvia Carretera Central', detail: 'Restricción reportada', date: '25 Jun', icon: AlertTriangle, iconColor: 'text-[#ff3355]' },
  ],
}

export default function HistoryModule() {
  const { role } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const items = role ? HISTORY_DATA[role] ?? [] : []
  const filtered = activeTab === 'all' ? items : items.filter((i) => {
    const singular = activeTab.endsWith('s') ? activeTab.slice(0, -1) : activeTab
    return i.type === singular
  })

  return (
    <div className="px-5 sm:px-8 lg:px-10 pt-6 pb-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-white">📊 Historial</h2>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#81c784] bg-[rgba(0,230,118,0.06)] px-2.5 py-1 rounded-full border border-[rgba(0,230,118,0.1)]">
          <Calendar size={12} />
          Últimos 7 días
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#00e676] text-[#050b06]'
                : 'bg-[rgba(0,230,118,0.06)] text-[#81c784] hover:bg-[rgba(0,230,118,0.1)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <DashboardCard>
        <div className="space-y-3 mt-1">
          {filtered.length === 0 && (
            <p className="text-xs text-[#81c784] text-center py-4">Sin registros</p>
          )}
          {filtered.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.id} className="flex items-center gap-3 bg-[#112216] border border-[rgba(0,230,118,0.06)] rounded-xl px-4 py-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(0,230,118,0.08)] flex items-center justify-center shrink-0">
                  <Icon size={18} className={item.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{item.title}</p>
                  <p className="text-xs text-[#b2dfdb] mt-0.5">{item.detail}</p>
                </div>
                <div className="text-right shrink-0">
                  {item.amount && <p className="text-sm font-extrabold text-[#ffab00]">{item.amount}</p>}
                  <p className="text-[10px] text-[#81c784]">{item.date}</p>
                </div>
              </div>
            )
          })}
        </div>
      </DashboardCard>
    </div>
  )
}
