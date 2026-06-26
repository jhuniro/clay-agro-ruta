import { useState } from 'react'
import DashboardHeader from '../../components/DashboardHeader'
import AlertBanner from '../../components/AlertBanner'
import BottomNav from '../../components/BottomNav'
import PublishHarvest from './PublishHarvest'
import ShipmentsSection from './ShipmentsSection'
import FarmerRouteView from '../routes/FarmerRouteView'

export default function FarmerDashboard() {
  const [alerta] = useState<'ok' | 'alerta'>('ok')

  return (
    <div className="min-h-dvh bg-[#050b06] text-[#e8f5e9] flex flex-col pb-20">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4 space-y-5">
        <DashboardHeader name="Juan" role="Agricultor" />
        <AlertBanner status={alerta} />
        <PublishHarvest />

        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#80cbc4]">Tu ruta activa</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[rgba(0,230,118,0.08)] to-transparent" />
          </div>
          <FarmerRouteView />
        </section>

        <ShipmentsSection />
      </div>

      <BottomNav />
    </div>
  )
}
