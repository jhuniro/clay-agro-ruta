import type { RouteStatus } from './routeTypes'

const STATUS_CONFIG: Record<RouteStatus, { label: string; className: string }> = {
  LIBRE: {
    label: 'Ruta libre',
    className: 'bg-[#00e676]/15 text-[#00e676] border border-[#00e676]/25',
  },
  RIESGO: {
    label: 'Ruta en riesgo',
    className: 'bg-[#ffab00]/15 text-[#ffab00] border border-[#ffab00]/25',
  },
  BLOQUEADA: {
    label: 'Ruta bloqueada',
    className: 'bg-[#ff3355]/15 text-[#ff3355] border border-[#ff3355]/25',
  },
}

interface Props {
  status: RouteStatus
}

export default function RouteStatusBadge({ status }: Props) {
  const config = STATUS_CONFIG[status]
  return (
    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${config.className}`}>
      {config.label}
    </span>
  )
}
