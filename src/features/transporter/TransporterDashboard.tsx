import { CloudSun, Truck } from 'lucide-react'
import { mockRoutes } from '../routes/routeMockData'
import { getTransporterRoutes } from '../routes/roleRouteData'
import RouteMap from '../routes/RouteMap'
import RouteStatusBadge from '../routes/RouteStatusBadge'
import BottomNav from '../../components/BottomNav'

export default function TransporterDashboard() {
  const routes = getTransporterRoutes(mockRoutes)

  return (
    <div className="min-h-dvh bg-[#050b06] text-[#e8f5e9] flex flex-col pb-20">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4 space-y-5">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#e8f5e9]">Hola, Carlos</h1>
            <p className="text-xs text-[#80cbc4]">Transportista</p>
          </div>
          <div className="flex items-center gap-2 bg-[#0c1a0e] border border-[rgba(0,230,118,0.08)] rounded-full px-4 py-2">
            <CloudSun size={20} className="text-[#ffab00]" />
            <span className="text-sm font-bold text-[#e8f5e9]">18°C</span>
          </div>
        </header>

        <div className="rounded-xl bg-[#0c1a0e] border border-[rgba(0,230,118,0.06)] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#80cbc4]">Resumen del día</span>
            <span className="text-[10px] font-semibold text-[#00e676] bg-[#00e676]/10 px-2.5 py-1 rounded-full">
              {routes.length} rutas asignadas
            </span>
          </div>
          <p className="text-xs text-[#3d6b4f]">
            Recoge en Huánuco y entrega en el Mercado de Productores
          </p>
        </div>

        {routes.length > 0 && (
          <section className="space-y-4">
            {routes.map((r, index) => (
              <div key={r.id}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#80cbc4]">
                    Ruta {index + 1}: {r.label}
                  </span>
                  <div className="flex-1 h-px bg-[rgba(0,230,118,0.06)]" />
                  <RouteStatusBadge status={r.route.status} />
                </div>
                <RouteMap route={r.route} />
              </div>
            ))}
          </section>
        )}

        <section className="rounded-xl bg-[#0c1a0e] border border-[rgba(0,230,118,0.06)] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(123,63,160,0.12)] flex items-center justify-center">
              <Truck size={20} className="text-[#bb44ff]" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-[#bb44ff]">Ganancia estimada del día</p>
              <p className="text-lg font-extrabold text-[#e8f5e9]">S/ 120.00</p>
            </div>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  )
}
