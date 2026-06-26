import { AlertTriangle, ArrowRight, X } from 'lucide-react'
import type { Route, AlternativeRoute } from './routeTypes'

interface Props {
  route: Route
  onAccept: (alternativeId: string) => void
  onDismiss: () => void
}

export default function ReplanificationModal({ route, onAccept, onDismiss }: Props) {
  const bestAlternative = route.alternativeRoutes.find(
    (alt: AlternativeRoute) => alt.status !== 'BLOQUEADA'
  )

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-gradient-to-b from-[#1a0a0a] to-[#0f0808] border border-[rgba(255,51,85,0.15)] rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl animate-[slideUp_0.3s_cubic-bezier(0.34,1.56,0.64,1)]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[rgba(255,51,85,0.15)] flex items-center justify-center">
              <AlertTriangle size={20} className="text-[#ff3355]" />
            </div>
            <h2 className="text-base font-bold text-white">Ruta bloqueada</h2>
          </div>
          <button
            onClick={onDismiss}
            className="p-2 rounded-full bg-[rgba(255,255,255,0.04)] text-[#b2dfdb] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="bg-[rgba(255,51,85,0.06)] border border-[rgba(255,51,85,0.12)] rounded-xl p-4 mb-5">
          <p className="text-sm text-[#e8f5e9] leading-relaxed">
            Tu ruta actual <span className="font-bold text-white">{route.name}</span> ha sido bloqueada.
          </p>
          {route.incidentType && (
            <p className="text-xs text-[#ff8a80] mt-2">
              Motivo: {route.incidentType.replace('_', ' ').toLowerCase()}
            </p>
          )}
        </div>

        {bestAlternative ? (
          <>
            <p className="text-sm text-[#b2dfdb] mb-4">
              ¿Deseas cambiar a una ruta alternativa disponible?
            </p>

            <div className="bg-[rgba(0,230,118,0.04)] border border-[rgba(0,230,118,0.1)] rounded-xl p-4 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">{bestAlternative.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[#b2dfdb]">{bestAlternative.distance}</span>
                    <span className="text-xs text-[#b2dfdb]">·</span>
                    <span className="text-xs text-[#b2dfdb]">{bestAlternative.estimatedTime}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-[rgba(0,230,118,0.1)] text-[#00e676] border border-[rgba(0,230,118,0.2)]">
                  Disponible
                </span>
              </div>
              {bestAlternative.recommendation && (
                <p className="text-xs text-[#81c784] mt-2 leading-relaxed">
                  {bestAlternative.recommendation}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onDismiss}
                className="flex-1 py-3 rounded-xl text-sm font-bold bg-[rgba(255,255,255,0.04)] text-[#b2dfdb] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)] transition-all"
              >
                Mantener ruta
              </button>
              <button
                onClick={() => onAccept(bestAlternative.id)}
                className="flex-1 py-3 rounded-xl text-sm font-bold bg-gradient-to-b from-[#00e676] to-[#00a84d] text-[#050b06] shadow-lg shadow-[#00e676]/20 active:scale-[0.97] transition-all flex items-center justify-center gap-2"
              >
                Cambiar ruta
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-[#b2dfdb]">
              No hay rutas alternativas disponibles en este momento.
            </p>
            <button
              onClick={onDismiss}
              className="mt-4 px-6 py-2.5 rounded-xl text-sm font-bold bg-[rgba(255,255,255,0.04)] text-[#b2dfdb] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)] transition-all"
            >
              Entendido
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
