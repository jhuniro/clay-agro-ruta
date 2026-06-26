import { useState } from 'react'
import { Truck } from 'lucide-react'
import DriverRouteView from '../routes/DriverRouteView'
import DashboardHeader from '../../components/DashboardHeader'
import AlertBanner from '../../components/AlertBanner'
import BottomNav from '../../components/BottomNav'

export default function TransporterDashboard() {
  const [alerta] = useState<'ok' | 'alerta'>('ok')

  return (
    <div className="min-h-dvh bg-[#050b06] text-[#e8f5e9] flex flex-col pb-20">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4 space-y-5">
        <DashboardHeader name="Carlos" role="Transportista" />
        <AlertBanner status={alerta} />

        <div className="rounded-xl bg-gradient-to-br from-[rgba(12,26,14,0.6)] to-[rgba(5,11,6,0.4)] border border-[rgba(0,230,118,0.06)] p-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#80cbc4]">Resumen del día</span>
            <span className="text-[10px] font-semibold text-[#00e676] bg-[#00e676]/10 px-2.5 py-1 rounded-full">
              2 rutas
            </span>
          </div>
          <p className="text-xs text-[#3d6b4f] leading-relaxed">
            Recoge en Huánuco y entrega en el Mercado de Productores
          </p>
        </div>

        <DriverRouteView />

        <section className="rounded-xl bg-gradient-to-br from-[rgba(12,26,14,0.6)] to-[rgba(5,11,6,0.4)] border border-[rgba(0,230,118,0.06)] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(123,63,160,0.12)] flex items-center justify-center shrink-0">
              <Truck size={20} className="text-[#bb44ff]" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-[#bb44ff]">Ganancia estimada del día</p>
              <p className="text-xl font-extrabold text-[#e8f5e9] tracking-tight">S/ 120.00</p>
            </div>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  )
}
