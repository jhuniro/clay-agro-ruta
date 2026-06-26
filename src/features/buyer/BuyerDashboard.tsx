import { ShoppingBag, PackageSearch } from 'lucide-react'
import { useState } from 'react'
import DashboardHeader from '../../components/DashboardHeader'
import AlertBanner from '../../components/AlertBanner'
import BottomNav from '../../components/BottomNav'
import BuyerRouteView from '../routes/BuyerRouteView'

const cosechas = [
  { id: '1', producto: 'Papas', cantidad: '50 kg', precio: 'S/ 80.00', ubicacion: 'Huánuco' },
  { id: '2', producto: 'Zanahorias', cantidad: '30 kg', precio: 'S/ 45.00', ubicacion: 'Amarilis' },
  { id: '3', producto: 'Maíz', cantidad: '100 kg', precio: 'S/ 120.00', ubicacion: 'Pillco Marca' },
]

export default function BuyerDashboard() {
  const [alerta] = useState<'ok' | 'alerta'>('ok')

  return (
    <div className="min-h-dvh bg-[#050b06] text-[#e8f5e9] flex flex-col pb-20">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4 space-y-5">
        <DashboardHeader name="María" role="Compradora" />
        <AlertBanner status={alerta} />

        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#80cbc4]">Ruta de recepción</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[rgba(0,230,118,0.08)] to-transparent" />
          </div>
          <BuyerRouteView />
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#e8f5e9]">Cosechas disponibles</h2>
            <span className="text-[10px] font-semibold text-[#00e676] bg-[#00e676]/10 px-2.5 py-1 rounded-full">
              {cosechas.length} ofertas
            </span>
          </div>

          <div className="space-y-2">
            {cosechas.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 bg-gradient-to-br from-[rgba(12,26,14,0.6)] to-[rgba(5,11,6,0.4)] border border-[rgba(0,230,118,0.06)] rounded-xl px-4 py-3 hover:border-[rgba(0,230,118,0.15)] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[rgba(0,230,118,0.08)] flex items-center justify-center shrink-0">
                  <ShoppingBag size={18} className="text-[#00e676]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#e8f5e9] truncate">{c.producto}</p>
                  <p className="text-xs font-medium text-[#80cbc4]">{c.cantidad} · {c.ubicacion}</p>
                </div>
                <span className="text-sm font-extrabold text-[#ffab00] shrink-0">{c.precio}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="w-full mt-3 py-3 rounded-xl border border-dashed border-[rgba(0,230,118,0.1)] text-sm font-semibold text-[#80cbc4] hover:bg-[rgba(0,230,118,0.03)] hover:border-[rgba(0,230,118,0.15)] transition-all flex items-center justify-center gap-2"
          >
            <PackageSearch size={16} />
            Ver más cosechas
          </button>
        </section>
      </div>

      <BottomNav />
    </div>
  )
}
