import { mockIncidents } from './routeMockData'
import RouteIncidentCard from './RouteIncidentCard'

export default function RouteAlerts() {
  const activeAlerts = mockIncidents.filter((i) => i.severity !== 'LOW')

  if (activeAlerts.length === 0) return null

  return (
    <section className="bg-[#0c1a0e] border border-[rgba(0,230,118,0.08)] rounded-2xl overflow-hidden shadow-lg shadow-black/20">
      <div className="flex items-center justify-between px-4 md:px-5 pt-4 pb-3">
        <h2 className="text-sm font-bold text-[#ffab00]">Alertas viales</h2>
        <span className="text-[10px] font-bold text-[#ffab00] bg-[rgba(255,171,0,0.1)] border border-[rgba(255,171,0,0.15)] px-2.5 py-0.5 rounded-full">
          {activeAlerts.length} activa(s)
        </span>
      </div>
      <div className="px-4 md:px-5 pb-4 space-y-2">
        {activeAlerts.map((incident) => (
          <RouteIncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    </section>
  )
}
