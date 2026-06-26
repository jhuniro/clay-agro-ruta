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
    <div className="min-h-dvh bg-[#050b06] text-[#e8f5e9] flex flex-col pb-20">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4 space-y-4">
        <DashboardHeader name="Juan" role="Agricultor" />
        <AlertBanner status={alerta} />
        <PublishHarvest />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <FarmerRouteView />
          </div>

          <div>
            <DashboardCard title="Mis Envíos" icon={<Package size={16} className="text-[#66bb6a]" />}>
              <div className="rounded-xl border border-dashed border-[rgba(0,230,118,0.12)] p-6 text-center">
                <Package size={28} className="mx-auto mb-2 text-[#66bb6a]" />
                <p className="text-sm font-medium text-[#81c784]">Tus envíos aparecerán aquí</p>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
