import { Check } from 'lucide-react'
import type { Route, AlternativeRoute } from './routeTypes'
import { getRouteColor } from './routeService'

interface RouteOption {
  id: string
  name: string
  distance: string
  estimatedTime: string
  status: string
  isMain?: boolean
}

interface Props {
  route: Route
  selectedId: string
  onSelect: (id: string) => void
}

export default function RouteSelector({ route, selectedId, onSelect }: Props) {
  const options: RouteOption[] = [
    {
      id: route.id,
      name: 'Ruta principal',
      distance: route.distance,
      estimatedTime: route.estimatedTime,
      status: route.status,
      isMain: true,
    },
    ...route.alternativeRoutes.map((alt: AlternativeRoute) => ({
      id: alt.id,
      name: alt.name,
      distance: alt.distance,
      estimatedTime: alt.estimatedTime,
      status: alt.status,
    })),
  ]

  if (options.length <= 1) return null

  return (
    <div className="bg-[#0c1a0e] border border-[rgba(0,230,118,0.08)] rounded-2xl overflow-hidden shadow-lg shadow-black/20">
      <div className="px-4 md:px-5 pt-4 pb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#81c784]">
          Seleccionar ruta
        </h4>
      </div>

      <div className="px-4 md:px-5 pb-4 space-y-2">
        {options.map((opt) => {
          const isSelected = opt.id === selectedId
          const color = getRouteColor(opt.status as 'LIBRE' | 'RIESGO' | 'BLOQUEADA')

          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              type="button"
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                isSelected
                  ? 'bg-[rgba(0,230,118,0.08)] border-[rgba(0,230,118,0.25)]'
                  : 'bg-[rgba(255,255,255,0.02)] border-transparent hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.06)]'
              }`}
            >
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                style={{
                  borderColor: isSelected ? color : 'rgba(255,255,255,0.15)',
                  background: isSelected ? `${color}20` : 'transparent',
                }}
              >
                {isSelected && <Check size={12} style={{ color }} />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white truncate">{opt.name}</span>
                  {opt.isMain && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.06)] text-[#81c784]">
                      Principal
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-[#b2dfdb]">{opt.distance}</span>
                  <span className="text-xs text-[#b2dfdb]">·</span>
                  <span className="text-xs text-[#b2dfdb]">{opt.estimatedTime}</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{
                    color,
                    background: `${color}15`,
                    border: `1px solid ${color}25`,
                  }}>
                    {opt.status}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
