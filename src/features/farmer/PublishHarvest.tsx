import { useState } from 'react'
import { Plus, X, Package, Wheat, MapPin } from 'lucide-react'

export default function PublishHarvest() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative w-full py-3.5 rounded-xl bg-gradient-to-b from-[#00e676] to-[#00a84d] text-[#050b06] font-bold text-sm shadow-lg shadow-[#00e676]/20 active:scale-[0.97] transition-all duration-150 flex items-center justify-center gap-2"
      >
        <Plus size={18} strokeWidth={3} />
        Publicar Cosecha
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gradient-to-b from-[#0f1f10] to-[#0a150b] border border-[rgba(0,230,118,0.08)] rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl animate-[slideUp_0.3s_cubic-bezier(0.34,1.56,0.64,1)]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-white">Publicar cosecha</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full bg-[rgba(255,255,255,0.04)] text-[#b2dfdb] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-[#81c784] mb-1.5">
                  <Package size={14} /> Producto
                </label>
                <input
                  type="text"
                  placeholder="Ej: Papas, Zanahorias, Maíz..."
                  className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(0,230,118,0.08)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#66bb6a] outline-none focus:border-[#00e676]/30 focus:shadow-[0_0_12px_rgba(230,118,0,0.06)] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-[#81c784] mb-1.5">
                    <Wheat size={14} /> Cantidad
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 50 kg"
                    className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(0,230,118,0.08)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#66bb6a] outline-none focus:border-[#00e676]/30 focus:shadow-[0_0_12px_rgba(230,118,0,0.06)] transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-[#81c784] mb-1.5">
                    S/ Precio
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 80.00"
                    className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(0,230,118,0.08)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#66bb6a] outline-none focus:border-[#00e676]/30 focus:shadow-[0_0_12px_rgba(230,118,0,0.06)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-[#81c784] mb-1.5">
                  <MapPin size={14} /> Ubicación
                </label>
                <input
                  type="text"
                  placeholder="Ej: Parcela Los Olivos, Huánuco"
                  className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(0,230,118,0.08)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#66bb6a] outline-none focus:border-[#00e676]/30 focus:shadow-[0_0_12px_rgba(230,118,0,0.06)] transition-all"
                />
              </div>

              <button
                type="button"
                className="w-full py-4 rounded-xl bg-gradient-to-b from-[#00e676] to-[#00a84d] text-[#050b06] font-bold text-sm active:scale-[0.97] transition-all duration-150 shadow-lg shadow-[#00e676]/20 hover:shadow-xl hover:shadow-[#00e676]/30"
              >
                Publicar cosecha
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
