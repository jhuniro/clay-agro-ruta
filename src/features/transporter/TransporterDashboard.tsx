import { useState } from 'react'
import { Truck, Route } from 'lucide-react'
import DriverRouteView from '../routes/DriverRouteView'
import DashboardHeader from '../../components/DashboardHeader'
import AlertBanner from '../../components/AlertBanner'
import BottomNav from '../../components/BottomNav'
import DashboardCard from '../../components/DashboardCard'

export default function TransporterDashboard() {
  const [alerta] = useState<'ok' | 'alerta'>('ok')

  return (
    <div className="min-h-dvh bg-[#050b06] text-[#e8f5e9] flex flex-col pb-20">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4 space-y-4">
        <DashboardHeader name="Carlos" role="Transportista" />
        <AlertBanner status={alerta} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <DriverRouteView />
          </div>

          <div className="space-y-4">
            <DashboardCard
              title="Resumen del día"
              icon={<Route size={16} className="text-[#66bb6a]" />}
              badge={
                <span className="text-[10px] font-bold text-[#00e676] bg-[#00e676]/10 px-2.5 py-1 rounded-full">
                  2 rutas
                </span>
              }
            >
              <p className="text-sm text-[#b2dfdb] leading-relaxed">
                Recoge en Huánuco y entrega en el Mercado de Productores
              </p>
            </DashboardCard>

            <DashboardCard>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(187,68,255,0.12)] flex items-center justify-center shrink-0">
                  <Truck size={20} className="text-[#bb44ff]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-[#ce93d8]">Ganancia estimada del día</p>
                  <p className="text-xl font-extrabold text-white tracking-tight">S/ 120.00</p>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
