import { Menu } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Sidebar from '../components/sidebar/Sidebar'
import MobileSidebar from '../components/sidebar/MobileSidebar'

interface Props {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  const { toggleSidebar, isSidebarCollapsed, toggleSidebarCollapsed } = useApp()

  return (
    <div className="min-h-dvh bg-[#050b06] text-[#e8f5e9] flex">
      {/* Sidebar desktop */}
      <Sidebar collapsed={isSidebarCollapsed} onToggleCollapse={toggleSidebarCollapsed} />

      {/* Sidebar mobile drawer */}
      <MobileSidebar />

      {/* Área principal */}
      <div className="flex-1 flex flex-col min-h-dvh min-w-0">
        {/* Top bar mobile */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[rgba(0,230,118,0.08)] bg-[#080f09]/80 backdrop-blur-md sticky top-0 z-30">
          <button
            type="button"
            onClick={toggleSidebar}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-[#81c784] hover:text-white hover:bg-[rgba(0,230,118,0.06)] transition-colors"
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="text-sm font-extrabold text-white tracking-tight">AgroRuta</span>
          </div>
        </header>

        {/* Contenido del módulo */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
