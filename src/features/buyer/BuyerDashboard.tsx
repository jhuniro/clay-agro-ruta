import { ShoppingBag, PackageSearch } from 'lucide-react'
import { useState } from 'react'
import DashboardHeader from '../../components/DashboardHeader'
import AlertBanner from '../../components/AlertBanner'
import BottomNav from '../../components/BottomNav'
import DashboardCard from '../../components/DashboardCard'
import BuyerRouteView from '../routes/BuyerRouteView'

const cosechas = [
  { id: '1', producto: 'Papas', cantidad: '50 kg', precio: 'S/ 80.00', ubicacion: 'Huánuco' },
  { id: '2', producto: 'Zanahorias', cantidad: '30 kg', precio: 'S/ 45.00', ubicacion: 'Amarilis' },
  { id: '3', producto: 'Maíz', cantidad: '100 kg', precio: 'S/ 120.00', ubicacion: 'Pillco Marca' },
]

export default function BuyerDashboard() {
  const [alerta] = useState<'ok' | 'alerta'>('ok')

  return (
    <div className="min-h-dvh bg-[#050b06] text-[#e8f5e9] flex flex-col pb-24">
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-6 pb-6 space-y-5 max-w-7xl mx-auto w-full">
        <div className="space-y-4">
          <DashboardHeader name="María" role="Compradora" />
          <AlertBanner status={alerta} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          <div className="lg:col-span-2">
            <BuyerRouteView />
          </div>

          <div>
            <DashboardCard
              title="Cosechas disponibles"
              badge={
                <span className="text-[10px] font-bold text-[#00e676] bg-[#00e676]/10 px-2.5 py-0.5 rounded-full border border-[#00e676]/20">
                  {cosechas.length} ofertas
                </span>
              }
            >
              <div className="space-y-2.5 mt-2">
                {cosechas.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 bg-[#112216] border border-[rgba(0,230,118,0.06)] rounded-xl px-4 py-3 hover:border-[rgba(0,230,118,0.15)] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[rgba(0,230,118,0.08)] flex items-center justify-center shrink-0">
                      <ShoppingBag size={18} className="text-[#00e676]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{c.producto}</p>
                      <p className="text-xs font-medium text-[#b2dfdb] mt-0.5">{c.cantidad} · {c.ubicacion}</p>
                    </div>
                    <span className="text-sm font-extrabold text-[#ffab00] shrink-0">{c.precio}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="w-full mt-4 py-3 rounded-xl border border-[rgba(0,230,118,0.1)] bg-[rgba(0,230,118,0.04)] text-sm font-bold text-[#81c784] hover:bg-[rgba(0,230,118,0.08)] hover:border-[rgba(0,230,118,0.2)] transition-all flex items-center justify-center gap-2"
              >
                <PackageSearch size={16} />
                Explorar catálogo completo
              </button>
            </DashboardCard>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
