import { Package } from 'lucide-react'

export default function ShipmentsSection() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-sm font-bold text-[#e8f5e9]">Mis Envíos Activos</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[rgba(0,230,118,0.08)] to-transparent" />
      </div>
      <div className="rounded-xl border border-dashed border-[rgba(0,230,118,0.08)] p-6 text-center">
        <Package size={28} className="mx-auto mb-2 text-[#3d6b4f]" />
        <p className="text-sm font-medium text-[#3d6b4f]">Tus envíos aparecerán aquí</p>
      </div>
    </section>
  )
}
