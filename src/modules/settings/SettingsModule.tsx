import { useState } from 'react'
import { Bell, Moon, Globe, ChevronRight } from 'lucide-react'
import DashboardCard from '../../components/DashboardCard'

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        enabled ? 'bg-[#00e676]' : 'bg-[rgba(0,230,118,0.15)]'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          enabled ? 'translate-x-5' : ''
        }`}
      />
    </button>
  )
}

export default function SettingsModule() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [locationSharing, setLocationSharing] = useState(false)

  return (
    <div className="px-5 sm:px-8 lg:px-10 pt-6 pb-8 space-y-6">
      <h2 className="text-lg font-extrabold text-white">⚙ Configuración</h2>

      <DashboardCard title="Preferencias" icon={<Bell size={14} className="text-[#81c784]" />}>
        <div className="space-y-4 mt-1">
          {[
            { icon: Bell, label: 'Notificaciones push', desc: 'Alertas de rutas e incidentes', enabled: notifications, onToggle: () => setNotifications(!notifications) },
            { icon: Moon, label: 'Modo oscuro', desc: 'Tema de la aplicación', enabled: darkMode, onToggle: () => setDarkMode(!darkMode) },
            { icon: Globe, label: 'Compartir ubicación', desc: 'Para seguimiento de rutas', enabled: locationSharing, onToggle: () => setLocationSharing(!locationSharing) },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[rgba(0,230,118,0.06)] flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#81c784]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-[11px] text-[#5a9e6f]">{item.desc}</p>
                </div>
                <Toggle enabled={item.enabled} onToggle={item.onToggle} />
              </div>
            )
          })}
        </div>
      </DashboardCard>

      <DashboardCard>
        <div className="space-y-0">
          {['Acerca de AgroRuta', 'Términos y condiciones', 'Política de privacidad', 'Cerrar sesión'].map((item) => (
            <button
              key={item}
              type="button"
              className={`w-full flex items-center justify-between py-3 text-left hover:bg-[rgba(0,230,118,0.04)] -mx-4 px-4 rounded-xl transition-colors ${
                item === 'Cerrar sesión' ? 'text-[#ff3355]' : ''
              }`}
            >
              <span className="text-sm font-semibold">{item}</span>
              <ChevronRight size={16} className="text-[#5a9e6f]" />
            </button>
          ))}
        </div>
      </DashboardCard>
    </div>
  )
}
