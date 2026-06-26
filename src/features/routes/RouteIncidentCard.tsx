import type { Incident } from './routeTypes'

const SEVERITY_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  LOW: { label: 'Leve', color: '#6b7280', bg: 'rgba(107,114,128,0.12)', border: 'rgba(107,114,128,0.15)' },
  MEDIUM: { label: 'Moderada', color: '#ffbb00', bg: 'rgba(255,187,0,0.12)', border: 'rgba(255,187,0,0.15)' },
  HIGH: { label: 'Grave', color: '#ff3355', bg: 'rgba(255,51,85,0.12)', border: 'rgba(255,51,85,0.15)' },
}

const INCIDENT_ICON: Record<string, string> = {
  HUAICO: '🌊',
  DERRUMBE: '🪨',
  BLOQUEO: '🚧',
  LLUVIA: '🌧️',
  ACCIDENTE: '⚠️',
  VIA_LENTA: '🐌',
  OTRO: '❗',
}

interface Props {
  incident: Incident
}

export default function RouteIncidentCard({ incident }: Props) {
  const severity = SEVERITY_CONFIG[incident.severity] || SEVERITY_CONFIG.LOW

  return (
    <article
      className="bg-[#0c1a0e] border border-[rgba(0,230,118,0.06)] border-l-[3px] rounded-xl p-4 shadow-lg shadow-black/10"
      style={{ borderLeftColor: severity.color }}
    >
      <header className="flex items-center gap-2 mb-2">
        <span className="text-xl">{INCIDENT_ICON[incident.type] ?? '❗'}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white capitalize">{incident.type.replace('_', ' ')}</h3>
          <span className="text-xs text-[#b2dfdb]">{incident.routeName}</span>
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0"
          style={{ color: severity.color, background: severity.bg, border: `1px solid ${severity.border}` }}
        >
          {severity.label}
        </span>
      </header>
      <p className="text-xs text-[#b2dfdb] leading-relaxed mb-2">{incident.description}</p>
      <footer className="flex justify-between items-center gap-2 text-[11px]">
        <span className="text-[#81c784]">{incident.reportedAt}</span>
        <span className="text-[#ffab00] font-semibold text-right">{incident.recommendation}</span>
      </footer>
    </article>
  )
}
