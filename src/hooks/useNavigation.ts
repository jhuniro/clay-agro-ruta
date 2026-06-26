import { useApp } from '../context/AppContext'
import { getModulesForRole, canAccessModule, type ModuleId } from '../context/permissions'

export function useNavigation() {
  const {
    role,
    activeModule,
    isSidebarOpen,
    isSidebarCollapsed,
    setModule,
    toggleSidebar,
    setSidebarOpen,
    toggleSidebarCollapsed,
    goBack,
  } = useApp()

  const modules = role ? getModulesForRole(role) : []
  const canAccess = role ? (m: ModuleId) => canAccessModule(role, m) : () => false

  return {
    role,
    activeModule,
    modules,
    isSidebarOpen,
    isSidebarCollapsed,
    setModule,
    canAccess,
    toggleSidebar,
    setSidebarOpen,
    toggleSidebarCollapsed,
    goBack,
  }
}
