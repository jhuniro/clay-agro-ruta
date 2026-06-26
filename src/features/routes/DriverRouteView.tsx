import { useState, useEffect, useCallback } from 'react'
import { mockRoutes, mockIncidents } from './routeMockData'
import { getRoutesForDriver, getIncidentsForRoute } from './routeService'
import { generateArc, animateMarker } from './trackingService'
import RouteStatusBadge from './RouteStatusBadge'
import RouteSelector from './RouteSelector'
import ReplanificationModal from './ReplanificationModal'
import MapView from './MapView'
import type { Coordinate } from './routeTypes'

export default function DriverRouteView() {
  const { pickup, delivery } = getRoutesForDriver(mockRoutes)
  const [activeRoute, setActiveRoute] = useState<'pickup' | 'delivery'>('pickup')
  const [selectedRouteId, setSelectedRouteId] = useState<string>(pickup.id)
  const [truckPos, setTruckPos] = useState<Coordinate | undefined>()
  const [isMoving, setIsMoving] = useState(false)
  const [showReplanification, setShowReplanification] = useState(false)

  const currentRoute = activeRoute === 'pickup' ? pickup : delivery
  const routeIncidents = getIncidentsForRoute(mockIncidents, currentRoute.id)

  useEffect(() => {
    setSelectedRouteId(currentRoute.id)
    if (currentRoute.status === 'BLOQUEADA' && currentRoute.alternativeRoutes.length > 0) {
      setShowReplanification(true)
    }
  }, [currentRoute.id])

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
    }, 30, () => setIsMoving(false))

    return stop
  }, [currentRoute])

  useEffect(() => {
    return () => {
      setIsMoving(false)
    }
  }, [])

  return (
    <div className="bg-[#0c1a0e] border border-[rgba(0,230,118,0.08)] rounded-2xl overflow-hidden shadow-lg shadow-black/20">
      <div className="px-4 md:px-5 pt-5 pb-0">
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => { setActiveRoute('pickup'); setTruckPos(undefined); setIsMoving(false) }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeRoute === 'pickup'
                ? 'bg-[#00e676]/15 text-white border border-[#00e676]/25'
                : 'bg-[rgba(255,255,255,0.04)] text-[#66bb6a] border border-transparent hover:bg-[rgba(255,255,255,0.06)]'
            }`}
          >
            Recogida
          </button>
          <button
            onClick={() => { setActiveRoute('delivery'); setTruckPos(undefined); setIsMoving(false) }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeRoute === 'delivery'
                ? 'bg-[#0088ff]/15 text-white border border-[#0088ff]/25'
                : 'bg-[rgba(255,255,255,0.04)] text-[#66bb6a] border border-transparent hover:bg-[rgba(255,255,255,0.06)]'
            }`}
          >
            Entrega
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#66bb6a]">
              Navegación GPS
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              {activeRoute === 'pickup' ? 'Ruta de recogida' : 'Ruta de entrega'}
            </h3>
          </div>
          <RouteStatusBadge status={currentRoute.status} />
        </div>
      </div>

      <div className="px-4 md:px-5 pt-3">
        <MapView
          route={currentRoute}
          incidents={routeIncidents}
          showAlternatives
          selectedAlternativeId={selectedRouteId}
          showTruck
          truckPosition={truckPos}
          height={300}
          onAlternativeSelect={setSelectedRouteId}
        />
      </div>

      <div className="px-4 md:px-5 pt-4 space-y-3">
        <RouteSelector
          route={currentRoute}
          selectedId={selectedRouteId}
          onSelect={setSelectedRouteId}
        />

        <button
          onClick={startTracking}
          disabled={isMoving}
          className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all ${
            isMoving
              ? 'bg-[rgba(255,187,0,0.1)] text-[#ffbb00] border border-[rgba(255,187,0,0.2)] cursor-not-allowed'
              : 'bg-gradient-to-b from-[#00e676] to-[#00a84d] text-[#050b06] shadow-lg shadow-[#00e676]/20 active:scale-[0.97]'
          }`}
        >
          {isMoving ? 'En ruta...' : 'Iniciar ruta'}
        </button>

        <div className="flex gap-3 bg-[#112216] p-3 rounded-xl border border-[rgba(0,230,118,0.06)]">
          <div className="min-w-0 flex-1">
            <span className="text-xs uppercase font-bold tracking-wider text-[#81c784]">Distancia</span>
            <p className="text-sm font-bold text-white mt-0.5">{currentRoute.distance}</p>
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs uppercase font-bold tracking-wider text-[#81c784]">Tiempo</span>
            <p className="text-sm font-bold text-white mt-0.5">{currentRoute.estimatedTime}</p>
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs uppercase font-bold tracking-wider text-[#81c784]">Ganancia</span>
            <p className="text-sm font-extrabold text-[#ffab00] mt-0.5">S/ 120.00</p>
          </div>
        </div>

        {currentRoute.recommendation && (
          <p className="text-sm text-[#a5d6a7] bg-[rgba(255,171,0,0.04)] border border-[rgba(255,171,0,0.08)] rounded-xl px-4 py-2.5 leading-relaxed">
            <span className="font-bold text-[#ffab00]">Indicación:</span> {currentRoute.recommendation}
          </p>
        )}
      </div>

      <div className="pb-5" />

      {showReplanification && currentRoute.status === 'BLOQUEADA' && (
        <ReplanificationModal
          route={currentRoute}
          onAccept={(altId) => {
            setSelectedRouteId(altId)
            setShowReplanification(false)
          }}
          onDismiss={() => setShowReplanification(false)}
        />
      )}
    </div>
  )
}
