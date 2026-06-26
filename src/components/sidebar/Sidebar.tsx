import { useNavigation } from '../../hooks/useNavigation'
import SidebarHeader from './SidebarHeader'
import SidebarSection from './SidebarSection'
import SidebarItem from './SidebarItem'
import SidebarFooter from './SidebarFooter'
import type { ModuleId } from '../../context/permissions'

interface Props {
  collapsed?: boolean
  onToggleCollapse?: () => void
}

const NAV_SECTIONS: { label: string; modules: ModuleId[] }[] = [
  { label: '', modules: ['home'] },
  { label: 'Gestión', modules: ['cosechas', 'marketplace', 'routes', 'shipments'] },
  { label: 'Monitoreo', modules: ['alerts', 'history'] },
  { label: 'Cuenta', modules: ['profile', 'settings'] },
]

export default function Sidebar({ collapsed, onToggleCollapse }: Props) {
  const { modules, activeModule, setModule } = useNavigation()

  return (
    <aside
      className={`hidden lg:flex flex-col h-full shrink-0 transition-all duration-200 border-r border-[rgba(0,230,118,0.06)] ${
        collapsed ? 'w-[76px]' : 'w-[290px]'
      }`}
      style={{
        background: 'linear-gradient(180deg, #0a120b 0%, #080f09 40%, #060d07 100%)',
      }}
    >
      <div className={`flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(0,230,118,0.1)] scrollbar-track-transparent ${collapsed ? 'px-2.5 py-7' : 'px-5 py-7'}`}>
        <SidebarHeader collapsed={collapsed} onToggleCollapse={onToggleCollapse} />

        <nav className="space-y-0">
          {NAV_SECTIONS.map((section, idx) => {
            const available = modules.filter((m) => (section.modules as string[]).includes(m.id))
            if (available.length === 0) return null
            return (
              <SidebarSection
                key={section.label}
                label={section.label}
                collapsed={collapsed}
                isLast={idx === NAV_SECTIONS.length - 1}
              >
                {available.map((m) => (
                  <SidebarItem
                    key={m.id}
                    module={m}
                    isActive={activeModule === m.id}
                    onClick={() => setModule(m.id)}
                    collapsed={collapsed}
                  />
                ))}
              </SidebarSection>
            )
          })}
        </nav>
      </div>

      <SidebarFooter collapsed={collapsed} />
    </aside>
  )
}
