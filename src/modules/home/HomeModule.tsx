import { useState } from 'react'
import { Route, Wheat, Package, AlertTriangle, ShoppingBag, Truck } from 'lucide-react'
import DashboardHeader from '../../components/DashboardHeader'
import AlertBanner from '../../components/AlertBanner'
import DashboardCard from '../../components/DashboardCard'
import { useApp } from '../../context/AppContext'
import { ROLE_LABELS, type UserRole } from '../../context/permissions'

const STATS: Record<UserRole, { icon: typeof Route; iconColor: string; value: string; label: string }[]> = {
  farmer: [
    { icon: Route, iconColor: 'text-[#00e676]', value: '3', label: 'Rutas activas' },
    { icon: AlertTriangle, iconColor: 'text-[#ffab00]', value: '2', label: 'Incidentes' },
    { icon: Package, iconColor: 'text-[#00e676]', value: '12', label: 'Entregas' },
    { icon: Wheat, iconColor: 'text-[#81c784]', value: '3', label: 'Cosechas' },
  ],
  buyer: [
    { icon: ShoppingBag, iconColor: 'text-[#00e676]', value: '3', label: 'Ofertas' },
    { icon: Route, iconColor: 'text-[#00e676]', value: '2', label: 'Rutas' },
    { icon: Package, iconColor: 'text-[#ffab00]', value: '8', label: 'Compras' },
    { icon: AlertTriangle, iconColor: 'text-[#ffab00]', value: '1', label: 'Alertas' },
  ],
  transporter: [
    { icon: Truck, iconColor: 'text-[#00e676]', value: '2', label: 'Rutas hoy' },
    { icon: AlertTriangle, iconColor: 'text-[#ffab00]', value: '1', label: 'Incidentes' },
    { icon: Package, iconColor: 'text-[#00e676]', value: '5', label: 'Entregas' },
    { icon: Route, iconColor: 'text-[#81c784]', value: 'S/ 120', label: 'Ganancia' },
  ],
}

const ACTIVITY: Record<UserRole, { text: string; time: string; color: string }[]> = {
  farmer: [
    { text: 'Papas enviadas a Mercado Central', time: 'Hace 2h', color: 'text-[#00e676]' },
    { text: 'Huaico reportado en Ruta 3', time: 'Hace 4h', color: 'text-[#ff3355]' },
    { text: 'Zanahorias publicadas en marketplace', time: 'Ayer', color: 'text-[#81c784]' },
  ],
  buyer: [
    { text: 'Compra de Papas Huayro completada', time: 'Hace 2h', color: 'text-[#00e676]' },
    { text: 'Ruta de entrega monitoreada', time: 'Hace 5h', color: 'text-[#81c784]' },
    { text: 'Nueva oferta de Maíz disponible', time: 'Ayer', color: 'text-[#ffab00]' },
  ],
  transporter: [
    { text: 'Entrega completada en Amarilis', time: 'Hace 1h', color: 'text-[#00e676]' },
    { text: 'Restricción por lluvia en Carretera Central', time: 'Hace 3h', color: 'text-[#ff3355]' },
    { text: 'Nuevo viaje asignado a Pillco Marca', time: 'Hoy', color: 'text-[#81c784]' },
  ],
}

export default function HomeModule() {
  const { role } = useApp()
  const [alerta] = useState<'ok' | 'alerta'>(role === 'transporter' ? 'alerta' : 'ok')
  const roleLabel = role ? ROLE_LABELS[role] : ''
  const userName = role === 'farmer' ? 'Juan' : role === 'buyer' ? 'María' : 'Mariano'
  const stats = role ? STATS[role] : STATS.farmer
  const activity = role ? ACTIVITY[role] : ACTIVITY.farmer

  return (
    <div className="px-5 sm:px-8 lg:px-10 pt-6 pb-8 space-y-6 md:space-y-8">
      <div className="space-y-4">
        <DashboardHeader name={userName} role={roleLabel} />
        <AlertBanner
          status={alerta}
          message={role === 'transporter' ? 'Alerta: Restricción por lluvia pesada en la Carretera Central' : undefined}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <DashboardCard key={s.label}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[rgba(0,230,118,0.08)] flex items-center justify-center shrink-0">
                  <Icon size={18} className={s.iconColor} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">{s.value}</p>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#81c784]">{s.label}</p>
                </div>
              </div>
            </DashboardCard>
          )
        })}
      </div>

      <DashboardCard title="Actividad reciente">
        <div className="space-y-3 mt-1">
          {activity.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-white font-semibold">{item.text}</span>
              <span className={item.color}>{item.time}</span>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  )
}
