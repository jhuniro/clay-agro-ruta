import { useState } from 'react'
import { Package, Wheat } from 'lucide-react'
import DashboardHeader from '../../components/DashboardHeader'
import AlertBanner from '../../components/AlertBanner'
import BottomNav from '../../components/BottomNav'
import DashboardCard from '../../components/DashboardCard'
import PublishHarvest from './PublishHarvest'
import FarmerRouteView from '../routes/FarmerRouteView'
import RouteAlerts from '../routes/RouteAlerts'

export default function FarmerDashboard() {
  const [alerta] = useState<'ok' | 'alerta'>('ok')

  return (
    <div className="min-h-dvh bg-[#050b06] text-[#e8f5e9] flex flex-col pb-24">
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Columna izquierda — contenido principal */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 lg:px-10 pt-6 pb-6 space-y-6 md:space-y-8">
          <div className="space-y-4">
            <DashboardHeader name="Juan" role="Agricultor" />
            <AlertBanner status={alerta} />
          </div>

          <div className="max-w-md">
            <PublishHarvest />
          </div>

          <RouteAlerts />

          <FarmerRouteView />

          <DashboardCard title="Mis Envíos" icon={<Package size={16} className="text-[#66bb6a]" />}>
            <div className="rounded-xl border border-dashed border-[rgba(0,230,118,0.12)] p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#00e676]/5 flex items-center justify-center mx-auto mb-3 border border-[#00e676]/10">
                <Package size={24} className="text-[#00e676]" />
              </div>
              <p className="text-sm font-semibold text-white">Sin envíos en tránsito</p>
              <p className="text-xs text-[#81c784] mt-1 max-w-[200px] mx-auto">
                Las actualizaciones de tus rutas aparecerán aquí.
              </p>
            </div>
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
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#81c784]">Rutas activas</p>
              <p className="text-2xl font-extrabold text-white mt-1">3</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#81c784]">Incidentes hoy</p>
              <p className="text-2xl font-extrabold text-[#ffab00] mt-1">2</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#81c784]">Entregas completadas</p>
              <p className="text-2xl font-extrabold text-[#00e676] mt-1">12</p>
            </div>
          </div>

          <div className="h-px bg-[rgba(0,230,118,0.08)] my-6" />

          <DashboardCard title="Cosechas publicadas" icon={<Wheat size={14} className="text-[#81c784]" />}>
            <div className="space-y-2.5 mt-1">
              {[
                { name: 'Papas', qty: '50 kg', price: 'S/ 80' },
                { name: 'Zanahorias', qty: '30 kg', price: 'S/ 45' },
                { name: 'Maíz', qty: '100 kg', price: 'S/ 120' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <span className="text-white font-semibold">{item.name}</span>
                  <span className="text-[#b2dfdb]">{item.qty} · {item.price}</span>
                </div>
              ))}
            </div>
          </DashboardCard>

          <div className="mt-auto pt-6">
            <div className="h-px bg-[rgba(0,230,118,0.08)] mb-6" />
            <p className="text-sm font-bold text-white">Juan Pérez</p>
            <p className="text-xs text-[#81c784]">Agricultor · Huánuco</p>
          </div>
        </aside>
      </div>

      <BottomNav />
    </div>
  )
}
