import { useState } from 'react'
import { Plus, X, CloudSun, Package, MapPin, Wheat } from 'lucide-react'
import { mockRoutes } from '../routes/routeMockData'
import { getFarmerRoutes } from '../routes/roleRouteData'
import RouteMap from '../routes/RouteMap'
import BottomNav from '../../components/BottomNav'

export default function FarmerDashboard() {
  const [alerta] = useState<'ok' | 'alerta'>('ok')
  const [modalOpen, setModalOpen] = useState(false)
  const routes = getFarmerRoutes(mockRoutes)

  return (
    <div className="min-h-dvh bg-[#050b06] text-[#e8f5e9] flex flex-col pb-20">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4 space-y-5">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#e8f5e9]">Hola, Juan</h1>
            <p className="text-xs text-[#80cbc4]">Agricultor</p>
          </div>
          <div className="flex items-center gap-2 bg-[#0c1a0e] border border-[rgba(0,230,118,0.08)] rounded-full px-4 py-2">
            <CloudSun size={20} className="text-[#ffab00]" />
            <span className="text-sm font-bold text-[#e8f5e9]">18°C</span>
          </div>
        </header>

        <div
          className={`rounded-xl px-4 py-3 flex items-center gap-3 text-sm font-semibold ${
            alerta === 'alerta'
              ? 'bg-red-600/20 border border-red-500/30 text-red-400'
              : 'bg-[#00e676]/10 border border-[#00e676]/20 text-[#00e676]'
          }`}
        >
          <span className="text-lg">{alerta === 'alerta' ? '⚠️' : '✅'}</span>
          {alerta === 'alerta'
            ? 'Alerta: Huaico reportado en ruta cercana'
            : 'No hay alertas activas en tu zona'}
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="relative w-full py-5 rounded-2xl bg-gradient-to-b from-[#00e676] to-[#00a84d] text-[#050b06] font-extrabold text-lg shadow-lg shadow-[#00e676]/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-3"
        >
          <Plus size={24} strokeWidth={3} />
          Publicar Cosecha
        </button>

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#0c1a0e] border border-[rgba(0,230,118,0.1)] rounded-t-2xl sm:rounded-2xl p-6 animate-[slideUp_0.3s_ease]">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold">Publicar cosecha</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-full bg-[rgba(255,255,255,0.05)] text-[#80cbc4]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-[#80cbc4] mb-1.5">
                    <Package size={14} /> Producto
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Papas, Zanahorias, Maíz..."
                    className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(0,230,118,0.1)] rounded-xl px-4 py-3 text-sm text-[#e8f5e9] placeholder-[#3d6b4f] outline-none focus:border-[#00e676]/40 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#80cbc4] mb-1.5">
                      <Wheat size={14} /> Cantidad
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 50 kg"
                      className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(0,230,118,0.1)] rounded-xl px-4 py-3 text-sm text-[#e8f5e9] placeholder-[#3d6b4f] outline-none focus:border-[#00e676]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#80cbc4] mb-1.5">
                      S/ Precio
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 80.00"
                      className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(0,230,118,0.1)] rounded-xl px-4 py-3 text-sm text-[#e8f5e9] placeholder-[#3d6b4f] outline-none focus:border-[#00e676]/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-[#80cbc4] mb-1.5">
                    <MapPin size={14} /> Ubicación
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Parcela Los Olivos, Huánuco"
                    className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(0,230,118,0.1)] rounded-xl px-4 py-3 text-sm text-[#e8f5e9] placeholder-[#3d6b4f] outline-none focus:border-[#00e676]/40 transition-colors"
                  />
                </div>

                <button
                  type="button"
                  className="w-full py-4 rounded-xl bg-gradient-to-b from-[#00e676] to-[#00a84d] text-[#050b06] font-bold text-sm active:scale-[0.98] transition-transform shadow-lg shadow-[#00e676]/20"
                >
                  Publicar cosecha
                </button>
              </div>
            </div>
          </div>
        )}

        {routes.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#80cbc4]">Tu ruta activa</span>
              <div className="flex-1 h-px bg-[rgba(0,230,118,0.06)]" />
            </div>
            <RouteMap route={routes[0].route} />
          </section>
        )}

        <section>
          <h2 className="text-sm font-bold text-[#e8f5e9] mb-3">Mis Envíos Activos</h2>
          <div className="rounded-xl border border-dashed border-[rgba(0,230,118,0.1)] p-6 text-center">
            <Package size={32} className="mx-auto mb-2 text-[#3d6b4f]" />
            <p className="text-sm text-[#3d6b4f]">Tus envíos aparecerán aquí</p>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  )
}
