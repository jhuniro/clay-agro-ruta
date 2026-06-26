import { mockRoutes } from './routeMockData'
import { getRouteForBuyer } from './routeService'
import RouteStatusBadge from './RouteStatusBadge'
import MapView from './MapView'

export default function BuyerRouteView() {
  const route = getRouteForBuyer(mockRoutes)
  if (!route) return null

  return (
    <div className="bg-[#0c1a0e] border border-[rgba(0,230,118,0.08)] rounded-2xl overflow-hidden shadow-lg shadow-black/20">
      <div className="flex items-center justify-between px-5 pt-5 pb-0">
        <h3 className="text-base font-bold text-white">Ruta de recepción</h3>
        <RouteStatusBadge status={route.status} />
      </div>

      <div className="px-5 pt-3">
        <MapView route={route} height={300} />
      </div>

      <div className="px-5 pt-4 pb-5 space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <span className="text-xs font-semibold text-[#66bb6a]">Origen</span>
            <p className="text-sm font-bold text-white">{route.origin}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-[#66bb6a]">Destino</span>
            <p className="text-sm font-bold text-white">{route.destination}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-[#66bb6a]">Estado</span>
            <p className="text-sm font-bold text-white">{route.status}</p>
          </div>
        </div>

        {route.recommendation && (
          <p className="text-sm text-[#a5d6a7] bg-[rgba(255,171,0,0.04)] border border-[rgba(255,171,0,0.08)] rounded-xl px-4 py-2.5 leading-relaxed">
            {route.recommendation}
          </p>
        )}
      </div>
    </div>
  )
}
