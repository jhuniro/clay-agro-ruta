import { X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useNavigation } from '../../hooks/useNavigation'
import SidebarSection from './SidebarSection'
import SidebarItem from './SidebarItem'
import SidebarFooter from './SidebarFooter'
import type { ModuleId } from '../../context/permissions'

const NAV_SECTIONS: { label: string; modules: ModuleId[] }[] = [
  { label: '', modules: ['home'] },
  { label: 'Gestión', modules: ['cosechas', 'marketplace', 'routes', 'shipments'] },
  { label: 'Monitoreo', modules: ['alerts', 'history'] },
  { label: 'Cuenta', modules: ['profile', 'settings'] },
]

export default function MobileSidebar() {
  const { isSidebarOpen, setSidebarOpen } = useApp()
  const { modules, activeModule, setModule } = useNavigation()

  if (!isSidebarOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden"
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className="fixed inset-y-0 left-0 z-50 w-[320px] flex flex-col lg:hidden animate-slide-in-left shadow-[4px_0_40px_rgba(0,0,0,0.5)]"
        style={{
          background: 'linear-gradient(180deg, #0a120b 0%, #080f09 40%, #060d07 100%)',
          borderRight: '1px solid rgba(0,230,118,0.06)',
        }}
      >
        <div className="flex items-center justify-between px-6 pt-7 pb-5">
          <div className="flex items-center gap-4 pl-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[rgba(0,230,118,0.18)] to-[rgba(0,230,118,0.06)] border border-[rgba(0,230,118,0.2)] flex items-center justify-center shadow-[0_0_28px_rgba(0,230,118,0.14)]">
              <span className="text-[24px]">🌿</span>
            </div>
            <div>
              <h1 className="text-[18px] font-extrabold text-white tracking-tight leading-none">
                AgroRuta
              </h1>
              <p className="text-[10px] font-semibold text-[#5a9e6f] tracking-[0.2em] uppercase mt-1.5">
                Huánuco
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-[#5a9e6f] hover:text-white hover:bg-[rgba(0,230,118,0.06)] transition-all duration-150 active:scale-90"
            aria-label="Cerrar menú"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {NAV_SECTIONS.map((section, idx) => {
            const available = modules.filter((m) => (section.modules as string[]).includes(m.id))
            if (available.length === 0) return null
            return (
              <SidebarSection
                key={section.label}
                label={section.label}
                isLast={idx === NAV_SECTIONS.length - 1}
              >
                {available.map((m) => (
                  <SidebarItem
                    key={m.id}
                    module={m}
                    isActive={activeModule === m.id}
                    onClick={() => setModule(m.id)}
                  />
                ))}
              </SidebarSection>
            )
          })}
        </div>

        <SidebarFooter />
      </aside>
    </>
  )
}
