import { Package, Truck, Route, DollarSign } from 'lucide-react'
import DashboardCard from '../../components/DashboardCard'
import { useApp } from '../../context/AppContext'

export default function ShipmentsModule() {
  const { role } = useApp()

  if (role === 'transporter') {
    return (
      <div className="px-5 sm:px-8 lg:px-10 pt-6 pb-8 space-y-6">
        <h2 className="text-lg font-extrabold text-white">📦 Mis Envíos</h2>

        <DashboardCard title="Envíos activos" icon={<Truck size={16} className="text-[#00e676]" />}>
          <div className="space-y-3 mt-1">
            <div className="flex items-center gap-3 bg-[#112216] border border-[rgba(0,230,118,0.06)] rounded-xl px-4 py-3">
              <div className="w-10 h-10 rounded-lg bg-[rgba(0,230,118,0.08)] flex items-center justify-center shrink-0">
                <Truck size={18} className="text-[#00e676]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">Huánuco → Amarilis</p>
                <p className="text-xs font-medium text-[#b2dfdb] mt-0.5">50 kg Papas · En tránsito</p>
              </div>
              <span className="text-[10px] font-bold text-[#00e676] bg-[#00e676]/10 px-2 py-0.5 rounded-full">Activo</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Resumen del día" icon={<Route size={14} className="text-[#81c784]" />}>
          <div className="space-y-3 mt-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[rgba(0,230,118,0.08)] flex items-center justify-center shrink-0">
                <Truck size={14} className="text-[#00e676]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Recogida</p>
                <p className="text-[11px] text-[#b2dfdb]">Huánuco → Amarilis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[rgba(0,136,255,0.08)] flex items-center justify-center shrink-0">
                <DollarSign size={14} className="text-[#0088ff]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Entrega</p>
                <p className="text-[11px] text-[#b2dfdb]">Amarilis → Mercado</p>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Reportar Incidente">
          <p className="text-sm text-[#b2dfdb] mb-3">
            ¿Encontraste un bloqueo o huaico nuevo? Avísale a la comunidad.
          </p>
          <button className="w-full py-3 bg-[#ff3355]/15 text-[#ff3355] border border-[#ff3355]/25 rounded-xl text-sm font-bold hover:bg-[#ff3355]/25 transition-all">
            Reportar Bloqueo en Vivo
          </button>
        </DashboardCard>
      </div>
    )
  }

  return (
    <div className="px-5 sm:px-8 lg:px-10 pt-6 pb-8 space-y-6">
      <h2 className="text-lg font-extrabold text-white">📦 Mis Envíos</h2>
      <DashboardCard title="Envíos activos" icon={<Package size={16} className="text-[#66bb6a]" />}>
        <div className="rounded-xl border border-dashed border-[rgba(0,230,118,0.12)] p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#00e676]/5 flex items-center justify-center mx-auto mb-3 border border-[#00e676]/10">
            <Package size={24} className="text-[#00e676]" />
          </div>
          <p className="text-sm font-semibold text-white">Sin envíos en tránsito</p>
          <p className="text-xs text-[#81c784] mt-1 max-w-[200px] mx-auto">
            Las actualizaciones de tus rutas aparecerán aquí.
          </p>
        </div>
      </DashboardCard>
    </div>
  )
}
