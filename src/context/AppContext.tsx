import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { UserRole, ModuleId } from './permissions'
import { ROLE_USERS, ROLE_LABELS } from './permissions'

interface AppState {
  role: UserRole | null
  activeModule: ModuleId
  isSidebarOpen: boolean
  isSidebarCollapsed: boolean
}

interface AppContextValue extends AppState {
  setRole: (role: UserRole) => void
  setModule: (module: ModuleId) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebarCollapsed: () => void
  goBack: () => void
  userName: string
  userRole: string
  userSubtitle: string
}

const AppContext = createContext<AppContextValue | null>(null)

const DEFAULT_MODULE: ModuleId = 'home'

function getInitialSidebarState(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem('agroruta-sidebar-collapsed') === 'true'
  } catch {
    return false
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole | null>(null)
  const [activeModule, setActiveModule] = useState<ModuleId>(DEFAULT_MODULE)
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(getInitialSidebarState)

  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole)
    setActiveModule(DEFAULT_MODULE)
    setSidebarOpen(false)
  }, [])

  const setModule = useCallback((module: ModuleId) => {
    setActiveModule(module)
    setSidebarOpen(false)
  }, [])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  const toggleSidebarCollapsed = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem('agroruta-sidebar-collapsed', String(next))
      } catch { /* ignore */ }
      return next
    })
  }, [])

  const goBack = useCallback(() => {
    setRoleState(null)
    setActiveModule(DEFAULT_MODULE)
    setSidebarOpen(false)
  }, [])

  const userName = role ? ROLE_USERS[role].name : ''
  const userRole = role ? ROLE_LABELS[role] : ''
  const userSubtitle = role ? ROLE_USERS[role].subtitle : ''

  const value: AppContextValue = {
    role,
    activeModule,
    isSidebarOpen,
    isSidebarCollapsed,
    setRole,
    setModule,
    toggleSidebar,
    setSidebarOpen,
    toggleSidebarCollapsed,
    goBack,
    userName,
    userRole,
    userSubtitle,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
