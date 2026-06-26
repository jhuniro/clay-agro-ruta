import { MapPin, Phone, Mail, Shield, ChevronRight } from 'lucide-react'
import DashboardCard from '../../components/DashboardCard'
import { useApp } from '../../context/AppContext'
import { ROLE_LABELS, ROLE_USERS } from '../../context/permissions'

export default function ProfileModule() {
  const { role } = useApp()
  const roleLabel = role ? ROLE_LABELS[role] : ''
  const userData = role ? ROLE_USERS[role] : { name: '', subtitle: '' }

  return (
    <div className="px-5 sm:px-8 lg:px-10 pt-6 pb-8 space-y-6">
      <h2 className="text-lg font-extrabold text-white">👤 Perfil</h2>

      <DashboardCard>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-[rgba(0,230,118,0.1)] border border-[rgba(0,230,118,0.15)] flex items-center justify-center">
            <span className="text-2xl font-extrabold text-[#00e676]">
              {userData.name.split(' ').map((n) => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="text-base font-extrabold text-white">{userData.name}</p>
            <p className="text-xs text-[#81c784] mt-0.5">{roleLabel} · Huánuco</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: MapPin, label: 'Ubicación', value: 'Huánuco, Perú' },
            { icon: Phone, label: 'Teléfono', value: '+51 999 888 777' },
            { icon: Mail, label: 'Email', value: 'usuario@agroruta.pe' },
            { icon: Shield, label: 'Rol', value: roleLabel },
          ].map((field) => {
            const Icon = field.icon
            return (
              <div key={field.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[rgba(0,230,118,0.06)] flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#81c784]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#5a9e6f]">{field.label}</p>
                  <p className="text-sm font-semibold text-white">{field.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </DashboardCard>

      <DashboardCard>
        <div className="space-y-0">
          {['Editar perfil', 'Cambiar contraseña', 'Configuración de privacidad'].map((item) => (
            <button
              key={item}
              type="button"
              className="w-full flex items-center justify-between py-3 text-left hover:bg-[rgba(0,230,118,0.04)] -mx-4 px-4 rounded-xl transition-colors"
            >
              <span className="text-sm font-semibold text-white">{item}</span>
              <ChevronRight size={16} className="text-[#5a9e6f]" />
            </button>
          ))}
        </div>
      </DashboardCard>
    </div>
  )
}
