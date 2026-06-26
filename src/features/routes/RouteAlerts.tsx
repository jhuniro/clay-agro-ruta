import { mockIncidents } from './routeMockData'
import RouteIncidentCard from './RouteIncidentCard'

export default function RouteAlerts() {
  const activeAlerts = mockIncidents.filter((i) => i.severity !== 'LOW')

  return (
    <section className="route-alerts" aria-label="Alertas viales activas">
      <header className="route-alerts__header">
        <h2 className="route-alerts__title">Alertas viales</h2>
        <span className="route-alerts__count">{activeAlerts.length} activa(s)</span>
      </header>
      {activeAlerts.length === 0 ? (
        <p className="route-alerts__empty">No hay alertas activas en este momento.</p>
      ) : (
        <div className="route-alerts__list">
          {activeAlerts.map((incident) => (
            <RouteIncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      )}
    </section>
  )
}
