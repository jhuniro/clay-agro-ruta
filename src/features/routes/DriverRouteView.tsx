import { useState, useEffect, useCallback } from 'react'
import { mockRoutes } from './routeMockData'
import { getRoutesForDriver } from './routeService'
import { generateArc, animateMarker } from './trackingService'
import RouteStatusBadge from './RouteStatusBadge'
import MapView from './MapView'
import type { Coordinate } from './routeTypes'

export default function DriverRouteView() {
  const { pickup, delivery } = getRoutesForDriver(mockRoutes)
  const [activeRoute, setActiveRoute] = useState<'pickup' | 'delivery'>('pickup')
  const [truckPos, setTruckPos] = useState<Coordinate | undefined>()
  const [isMoving, setIsMoving] = useState(false)

  const currentRoute = activeRoute === 'pickup' ? pickup : delivery

  const startTracking = useCallback(() => {
    if (!currentRoute.coordinates) return

    const arc = generateArc(
      currentRoute.coordinates.origin,
      currentRoute.coordinates.destination,
      150
    )

    setIsMoving(true)
    const stop = animateMarker(arc, (pos) => {
      setTruckPos(pos)
    }, 30)

    setTimeout(() => {
      setIsMoving(false)
      stop()
    }, 150 * 30)

    return stop
  }, [currentRoute])

  useEffect(() => {
    return () => {
      setIsMoving(false)
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => { setActiveRoute('pickup'); setTruckPos(undefined); setIsMoving(false) }}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            activeRoute === 'pickup'
              ? 'bg-[#00e676]/15 text-[#00e676] border border-[#00e676]/25'
              : 'bg-[rgba(255,255,255,0.03)] text-[#3d6b4f] border border-transparent'
          }`}
        >
          🚜 Recogida
        </button>
        <button
          onClick={() => { setActiveRoute('delivery'); setTruckPos(undefined); setIsMoving(false) }}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            activeRoute === 'delivery'
              ? 'bg-[#0088ff]/15 text-[#0088ff] border border-[#0088ff]/25'
              : 'bg-[rgba(255,255,255,0.03)] text-[#3d6b4f] border border-transparent'
          }`}
        >
          📦 Entrega
        </button>
      </div>

      <div className="bg-[#0c1a0e] border border-[rgba(0,230,118,0.06)] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#e8f5e9]">
            {activeRoute === 'pickup' ? 'Ruta de recogida' : 'Ruta de entrega'}
          </h3>
          <RouteStatusBadge status={currentRoute.status} />
        </div>

        <MapView
          route={currentRoute}
          showTruck
          truckPosition={truckPos}
          height={220}
        />

        <button
          onClick={startTracking}
          disabled={isMoving}
          className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${
            isMoving
              ? 'bg-[rgba(255,187,0,0.1)] text-[#ffbb00] border border-[rgba(255,187,0,0.2)] cursor-not-allowed'
              : 'bg-gradient-to-b from-[#00e676] to-[#00a84d] text-[#050b06] shadow-lg shadow-[#00e676]/20 active:scale-[0.97]'
          }`}
        >
          {isMoving ? '🚛 En ruta...' : '▶ Iniciar ruta'}
        </button>

        <div className="flex gap-4 text-xs">
          <div>
            <span className="text-[#3d6b4f] font-semibold">Distancia</span>
            <p className="font-bold text-[#e8f5e9]">{currentRoute.distance}</p>
          </div>
          <div>
            <span className="text-[#3d6b4f] font-semibold">Tiempo</span>
            <p className="font-bold text-[#e8f5e9]">{currentRoute.estimatedTime}</p>
          </div>
        </div>

        {currentRoute.recommendation && (
          <p className="text-xs text-[#ffab00] bg-[rgba(255,171,0,0.04)] border border-[rgba(255,171,0,0.08)] rounded-lg px-3 py-2">
            {currentRoute.recommendation}
          </p>
        )}
      </div>
    </div>
  )
}
