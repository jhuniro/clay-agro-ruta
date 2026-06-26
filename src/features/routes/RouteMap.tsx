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

        <svg className="route-map__svg" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <path className="route-map__contour" d="M0,40 Q80,20 150,50 T300,30" />
          <path className="route-map__contour" d="M0,80 Q60,60 140,90 T300,70" />
          <path className="route-map__contour" d="M0,120 Q90,100 170,130 T300,110" />
          <path className="route-map__contour" d="M0,160 Q70,140 160,170 T300,150" />
          <path className="route-map__contour" d="M0,190 Q100,170 180,200 T300,180" />

          <path
            className={`route-map__line route-map__line--${route.status.toLowerCase()}`}
            d="M35,165 Q100,40 180,90 T265,35"
            fill="none"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          <g className="route-map__marker route-map__marker--origin">
            <ellipse cx="35" cy="172" rx="8" ry="3" fill="rgba(0,0,0,0.3)" />
            <path d="M35,155 L31,165 L39,165 Z" fill="currentColor" />
            <circle cx="35" cy="157" r="5" fill="#fff" />
          </g>
          <text x="35" y="184" textAnchor="middle" className="route-map__label">{route.origin}</text>

          <g className="route-map__marker route-map__marker--dest">
            <ellipse cx="265" cy="42" rx="8" ry="3" fill="rgba(0,0,0,0.3)" />
            <path d="M265,25 L261,35 L269,35 Z" fill="currentColor" />
            <circle cx="265" cy="27" r="5" fill="#fff" />
          </g>
          <text x="265" y="16" textAnchor="middle" className="route-map__label">{route.destination}</text>

          {route.incidentType && (
            <g className="route-map__alert-group">
              <ellipse cx="155" cy="105" rx="10" ry="4" fill="rgba(0,0,0,0.3)" transform="translate(0,4)" />
              <rect
                x="145" y="93" width="20" height="18" rx="3"
                className="route-map__alert-bg"
                transform="translate(0,-2)"
              />
              <text x="155" y="103" className="route-map__alert-exclam" transform="translate(0,-2)">!</text>
            </g>
          )}
        </svg>

        <div className="route-map__gps" aria-hidden="true">
          S 9°55'12" W 76°14'18"
        </div>

        <div className="route-map__compass" aria-hidden="true">🧭</div>

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
