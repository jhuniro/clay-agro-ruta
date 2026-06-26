import type { Incident } from './routeTypes'

const SEVERITY_LABEL: Record<string, string> = {
  LOW: 'Leve',
  MEDIUM: 'Moderada',
  HIGH: 'Grave',
}

const INCIDENT_ICON: Record<string, string> = {
  HUAICO: '🌊',
  DERRUMBE: '⛰️',
  BLOQUEO: '🚧',
  LLUVIA: '🌧️',
  ACCIDENTE: '⚠️',
  VIA_LENTA: '🐢',
  OTRO: '🔔',
}

interface Props {
  incident: Incident
}

export default function RouteIncidentCard({ incident }: Props) {
  return (
    <article className="incident-card">
      <header className="incident-card__header">
        <span className="incident-card__icon">{INCIDENT_ICON[incident.type] ?? '🔔'}</span>
        <div>
          <h3 className="incident-card__type">{incident.type.replace('_', ' ')}</h3>
          <span className="incident-card__route">{incident.routeName}</span>
        </div>
        <span className={`incident-card__severity severity--${incident.severity.toLowerCase()}`}>
          {SEVERITY_LABEL[incident.severity]}
        </span>
      </header>
      <p className="incident-card__description">{incident.description}</p>
      <footer className="incident-card__footer">
        <span className="incident-card__time">{incident.reportedAt}</span>
        <span className="incident-card__rec">{incident.recommendation}</span>
      </footer>
    </article>
  )
}
