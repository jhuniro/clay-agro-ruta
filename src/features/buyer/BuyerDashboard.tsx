import { ShoppingBag, PackageSearch } from 'lucide-react'
import { useState } from 'react'
import DashboardHeader from '../../components/DashboardHeader'
import AlertBanner from '../../components/AlertBanner'
import BottomNav from '../../components/BottomNav'
import DashboardCard from '../../components/DashboardCard'
import BuyerRouteView from '../routes/BuyerRouteView'
import RouteAlerts from '../routes/RouteAlerts'

const cosechas = [
  { id: '1', producto: 'Papas', cantidad: '50 kg', precio: 'S/ 80.00', ubicacion: 'Huánuco' },
  { id: '2', producto: 'Zanahorias', cantidad: '30 kg', precio: 'S/ 45.00', ubicacion: 'Amarilis' },
  { id: '3', producto: 'Maíz', cantidad: '100 kg', precio: 'S/ 120.00', ubicacion: 'Pillco Marca' },
]

export default function BuyerDashboard() {
  const [alerta] = useState<'ok' | 'alerta'>('ok')

  return (
    <div className="min-h-dvh bg-[#050b06] text-[#e8f5e9] flex flex-col pb-24">
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Columna izquierda — contenido principal */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 lg:px-10 pt-6 pb-6 space-y-6 md:space-y-8">
          <div className="space-y-4">
            <DashboardHeader name="María" role="Compradora" />
            <AlertBanner status={alerta} />
          </div>

          <RouteAlerts />

          <BuyerRouteView />

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
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#81c784]">Ofertas disponibles</p>
              <p className="text-2xl font-extrabold text-white mt-1">3</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#81c784]">Rutas monitoreadas</p>
              <p className="text-2xl font-extrabold text-[#00e676] mt-1">2</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#81c784]">Compras realizadas</p>
              <p className="text-2xl font-extrabold text-[#ffab00] mt-1">8</p>
            </div>
          </div>

          <div className="h-px bg-[rgba(0,230,118,0.08)] my-6" />

          <DashboardCard title="Última compra">
            <div className="space-y-2 mt-1">
              <div className="flex justify-between text-xs">
                <span className="text-white font-semibold">Papas Huayro</span>
                <span className="text-[#ffab00] font-bold">S/ 80.00</span>
              </div>
              <p className="text-[11px] text-[#b2dfdb]">50 kg · Huánuco</p>
              <p className="text-[10px] text-[#81c784]">Hace 2 días</p>
            </div>
          </DashboardCard>

          <div className="mt-auto pt-6">
            <div className="h-px bg-[rgba(0,230,118,0.08)] mb-6" />
            <p className="text-sm font-bold text-white">María López</p>
            <p className="text-xs text-[#81c784]">Compradora · Huánuco</p>
          </div>
        </aside>
      </div>

      <BottomNav />
    </div>
  )
}
