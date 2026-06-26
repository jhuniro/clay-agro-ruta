import { mockRoutes } from './routeMockData'
import { getRouteForBuyer } from './routeService'
import RouteStatusBadge from './RouteStatusBadge'
import MapView from './MapView'

export default function BuyerRouteView() {
  const route = getRouteForBuyer(mockRoutes)
  if (!route) return null

  return (
    <div className="bg-[#0c1a0e] border border-[rgba(0,230,118,0.06)] rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#e8f5e9]">Ruta de recepción</h3>
        <RouteStatusBadge status={route.status} />
      </div>

      <MapView route={route} height={200} />

      <div className="flex gap-4 text-xs">
        <div>
          <span className="text-[#3d6b4f] font-semibold">Origen</span>
          <p className="font-bold text-[#e8f5e9]">{route.origin}</p>
        </div>
        <div>
          <span className="text-[#3d6b4f] font-semibold">Destino</span>
          <p className="font-bold text-[#e8f5e9]">{route.destination}</p>
        </div>
      </div>

      {route.recommendation && (
        <p className="text-xs text-[#ffab00] bg-[rgba(255,171,0,0.04)] border border-[rgba(255,171,0,0.08)] rounded-lg px-3 py-2">
          {route.recommendation}
        </p>
      )}
    </div>
  )
}
