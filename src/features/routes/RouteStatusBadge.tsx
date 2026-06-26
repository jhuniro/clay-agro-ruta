import type { RouteStatus } from './routeTypes'

const STATUS_CONFIG: Record<RouteStatus, { label: string; className: string }> = {
  LIBRE: { label: 'Ruta libre', className: 'badge--libre' },
  RIESGO: { label: 'Ruta en riesgo', className: 'badge--riesgo' },
  BLOQUEADA: { label: 'Ruta bloqueada', className: 'badge--bloqueada' },
}

interface Props {
  status: RouteStatus
}

export default function RouteStatusBadge({ status }: Props) {
  const config = STATUS_CONFIG[status]
  return (
    <span className={`route-badge ${config.className}`}>
      {config.label}
    </span>
  )
}
