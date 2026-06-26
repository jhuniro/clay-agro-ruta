import { useState } from 'react'
import { Package } from 'lucide-react'
import DashboardHeader from '../../components/DashboardHeader'
import AlertBanner from '../../components/AlertBanner'
import BottomNav from '../../components/BottomNav'
import DashboardCard from '../../components/DashboardCard'
import PublishHarvest from './PublishHarvest'
import FarmerRouteView from '../routes/FarmerRouteView'

export default function FarmerDashboard() {
  const [alerta] = useState<'ok' | 'alerta'>('ok')

  return (
    <div className="min-h-dvh bg-[#050b06] text-[#e8f5e9] flex flex-col pb-24">
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-6 pb-6 space-y-5 max-w-7xl mx-auto w-full">
        <div className="space-y-4">
          <DashboardHeader name="Juan" role="Agricultor" />
          <AlertBanner status={alerta} />
        </div>

        <PublishHarvest />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          <div className="lg:col-span-2">
            <FarmerRouteView />
          </div>

          <div>
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
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
