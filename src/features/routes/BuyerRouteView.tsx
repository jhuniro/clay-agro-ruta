import { mockRoutes, mockIncidents } from './routeMockData'
import { getRouteForBuyer, getIncidentsForRoute } from './routeService'
import RouteStatusBadge from './RouteStatusBadge'
import MapView from './MapView'

export default function BuyerRouteView() {
  const route = getRouteForBuyer(mockRoutes)
  if (!route) return null

  const routeIncidents = getIncidentsForRoute(mockIncidents, route.id)

  return (
    <div className="bg-[#0c1a0e] border border-[rgba(0,230,118,0.08)] rounded-2xl overflow-hidden shadow-lg shadow-black/20">
      <div className="flex items-center justify-between px-4 md:px-5 pt-5 pb-0">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#66bb6a]">
            Monitoreo en Tiempo Real
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            Ruta de recepción
          </h3>
        </div>
        <RouteStatusBadge status={route.status} />
      </div>

      <div className="px-4 md:px-5 pt-3">
        <MapView route={route} incidents={routeIncidents} height={300} />
      </div>

      <div className="px-4 md:px-5 pt-4 pb-5 space-y-3">
        <div className="flex gap-3 bg-[#112216] p-3 rounded-xl border border-[rgba(0,230,118,0.06)]">
          <div className="min-w-0 flex-1">
            <span className="text-xs uppercase font-bold tracking-wider text-[#81c784]">Origen</span>
            <p className="text-sm font-bold text-white truncate mt-0.5">{route.origin}</p>
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs uppercase font-bold tracking-wider text-[#81c784]">Destino</span>
            <p className="text-sm font-bold text-[#00e676] truncate mt-0.5">{route.destination}</p>
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs uppercase font-bold tracking-wider text-[#81c784]">Estado</span>
            <p className="text-sm font-bold text-white truncate mt-0.5">{route.status}</p>
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
