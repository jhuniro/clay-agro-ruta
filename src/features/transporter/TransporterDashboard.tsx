import { useState } from 'react'
import { Truck, Route } from 'lucide-react'
import DashboardHeader from '../../components/DashboardHeader'
import AlertBanner from '../../components/AlertBanner'
import BottomNav from '../../components/BottomNav'
import DashboardCard from '../../components/DashboardCard'
import DriverRouteView from '../routes/DriverRouteView'

export default function TransporterDashboard() {
  const [alerta] = useState<'ok' | 'alerta'>('alerta')

  return (
    <div className="min-h-dvh bg-[#050b06] text-[#e8f5e9] flex flex-col pb-24">
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-6 pb-6 space-y-5 max-w-7xl mx-auto w-full">
        <div className="space-y-4">
          <DashboardHeader name="Mariano" role="Transportista" />
          <AlertBanner
            status={alerta}
            message="Alerta: Restricción por lluvia pesada en la Carretera Central"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          <div className="lg:col-span-2">
            <DriverRouteView />
          </div>

          <div className="space-y-5">
            <DashboardCard title="Resumen del día" icon={<Route size={16} className="text-[#66bb6a]" />}>
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

            <DashboardCard title="Reportar Incidente">
              <p className="text-sm text-[#b2dfdb] mb-3">
                ¿Encontraste un bloqueo o huaico nuevo? Avísale a la comunidad.
              </p>
              <button className="w-full py-3 bg-[#ff3355]/15 text-[#ff3355] border border-[#ff3355]/25 rounded-xl text-sm font-bold hover:bg-[#ff3355]/25 transition-all">
                Reportar Bloqueo en Vivo
              </button>
            </DashboardCard>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
