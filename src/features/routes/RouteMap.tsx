import type { Route } from './routeTypes'
import RouteStatusBadge from './RouteStatusBadge'

interface Props {
  route: Route
}

export default function RouteMap({ route }: Props) {
  return (
    <section className="route-map" aria-label="Mapa de ruta">
      <header className="route-map__header">
        <h3 className="route-map__title">{route.name}</h3>
        <RouteStatusBadge status={route.status} />
      </header>

      <div className="route-map__canvas" role="img" aria-label={`Mapa de ${route.origin} a ${route.destination}`}>
        <div className="route-map__grid" aria-hidden="true" />

        <svg className="route-map__svg" viewBox="0 0 300 180" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <path
            className={`route-map__line route-map__line--${route.status.toLowerCase()}`}
            d="M30,150 Q100,30 180,80 T270,30"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <circle cx="30" cy="150" r="8" className="route-map__marker route-map__marker--origin" />
          <text x="30" y="168" textAnchor="middle" className="route-map__label">{route.origin}</text>

          <circle cx="270" cy="30" r="8" className="route-map__marker route-map__marker--dest" />
          <text x="270" y="18" textAnchor="middle" className="route-map__label">{route.destination}</text>

          {route.incidentType && (
            <>
              <rect
                x="130" y="55" width="20" height="20" rx="4"
                className="route-map__alert-icon"
              />
              <text x="140" y="69" textAnchor="middle" fontSize="12">!</text>
            </>
          )}
        </svg>

        {route.incidentType && (
          <div className="route-map__alert-legend">
            <span className="route-map__alert-dot" aria-hidden="true" />
            <span>{route.incidentType.replace('_', ' ')} reportado en esta ruta</span>
          </div>
        )}
      </div>

      <div className="route-map__info">
        <div className="route-map__stat">
          <span className="route-map__stat-label">Distancia</span>
          <span className="route-map__stat-value">{route.distance}</span>
        </div>
        <div className="route-map__stat">
          <span className="route-map__stat-label">Tiempo estimado</span>
          <span className="route-map__stat-value">{route.estimatedTime}</span>
        </div>
      </div>

      <p className="route-map__recommendation">{route.recommendation}</p>
    </section>
  )
}
