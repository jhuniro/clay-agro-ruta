import { useState } from 'react'
import { Truck, Route, DollarSign } from 'lucide-react'
import DashboardHeader from '../../components/DashboardHeader'
import AlertBanner from '../../components/AlertBanner'
import BottomNav from '../../components/BottomNav'
import DashboardCard from '../../components/DashboardCard'
import DriverRouteView from '../routes/DriverRouteView'
import RouteAlerts from '../routes/RouteAlerts'

export default function TransporterDashboard() {
  const [alerta] = useState<'ok' | 'alerta'>('alerta')

  return (
    <div className="min-h-dvh bg-[#050b06] text-[#e8f5e9] flex flex-col pb-24">
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Columna izquierda — contenido principal */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 lg:px-10 pt-6 pb-6 space-y-6 md:space-y-8">
          <div className="space-y-4">
            <DashboardHeader name="Mariano" role="Transportista" />
            <AlertBanner
              status={alerta}
              message="Alerta: Restricción por lluvia pesada en la Carretera Central"
            />
          </div>

          <RouteAlerts />

          <DriverRouteView />

          <DashboardCard title="Reportar Incidente">
            <p className="text-sm text-[#b2dfdb] mb-3">
              ¿Encontraste un bloqueo o huaico nuevo? Avísale a la comunidad.
            </p>
            <button className="w-full py-3 bg-[#ff3355]/15 text-[#ff3355] border border-[#ff3355]/25 rounded-xl text-sm font-bold hover:bg-[#ff3355]/25 transition-all">
              Reportar Bloqueo en Vivo
            </button>
          </DashboardCard>
        </div>

        {/* Columna derecha — panel informativo */}
        <aside className="hidden lg:flex lg:w-[320px] xl:w-[360px] flex-col border-l border-[rgba(0,230,118,0.08)] bg-[#080f09] px-6 py-8 shrink-0 overflow-y-auto">
          <div className="mb-6">
            <span className="text-2xl">🌿</span>
            <h2 className="text-lg font-bold text-white mt-2">AgroRuta</h2>
            <p className="text-xs text-[#81c784]">Huánuco · Perú</p>
          </div>

          <div className="h-px bg-[rgba(0,230,118,0.08)] mb-6" />

          <div className="space-y-5">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#81c784]">Rutas del día</p>
              <p className="text-2xl font-extrabold text-white mt-1">2</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#81c784]">Incidentes en ruta</p>
              <p className="text-2xl font-extrabold text-[#ffab00] mt-1">1</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#81c784]">Ganancia estimada</p>
              <p className="text-2xl font-extrabold text-[#00e676] mt-1">S/ 120</p>
            </div>
          </div>

          <div className="h-px bg-[rgba(0,230,118,0.08)] my-6" />

          <DashboardCard title="Resumen del día" icon={<Route size={14} className="text-[#81c784]" />}>
            <div className="space-y-3 mt-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[rgba(0,230,118,0.08)] flex items-center justify-center shrink-0">
                  <Truck size={14} className="text-[#00e676]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Recogida</p>
                  <p className="text-[11px] text-[#b2dfdb]">Huánuco → Amarilis</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[rgba(0,136,255,0.08)] flex items-center justify-center shrink-0">
                  <DollarSign size={14} className="text-[#0088ff]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Entrega</p>
                  <p className="text-[11px] text-[#b2dfdb]">Amarilis → Mercado</p>
                </div>
              </div>
            </div>
          </DashboardCard>

          <div className="mt-auto pt-6">
            <div className="h-px bg-[rgba(0,230,118,0.08)] mb-6" />
            <p className="text-sm font-bold text-white">Mariano García</p>
            <p className="text-xs text-[#81c784]">Transportista · Huánuco</p>
          </div>
        </aside>
      </div>

      <BottomNav />
    </div>
  )
}
