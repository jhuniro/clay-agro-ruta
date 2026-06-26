export type UserRole = 'farmer' | 'buyer' | 'transporter'

export type ModuleId =
  | 'home'
  | 'cosechas'
  | 'marketplace'
  | 'routes'
  | 'shipments'
  | 'alerts'
  | 'history'
  | 'profile'
  | 'settings'

export interface ModuleDef {
  id: ModuleId
  label: string
  icon: string
}

export const ALL_MODULES: ModuleDef[] = [
  { id: 'home', label: 'Inicio', icon: '🏠' },
  { id: 'cosechas', label: 'Mis Cosechas', icon: '🌾' },
  { id: 'marketplace', label: 'Marketplace', icon: '🛒' },
  { id: 'routes', label: 'Rutas', icon: '🛣' },
  { id: 'shipments', label: 'Mis Envíos', icon: '📦' },
  { id: 'alerts', label: 'Alertas', icon: '⚠' },
  { id: 'history', label: 'Historial', icon: '📊' },
  { id: 'profile', label: 'Perfil', icon: '👤' },
  { id: 'settings', label: 'Configuración', icon: '⚙' },
]

export const ROLE_PERMISSIONS: Record<UserRole, ModuleId[]> = {
  farmer: ['home', 'cosechas', 'marketplace', 'routes', 'alerts', 'history', 'profile', 'settings'],
  buyer: ['home', 'marketplace', 'routes', 'shipments', 'alerts', 'history', 'profile', 'settings'],
  transporter: ['home', 'routes', 'shipments', 'alerts', 'history', 'profile', 'settings'],
}

export const ROLE_LABELS: Record<UserRole, string> = {
  farmer: 'Agricultor',
  buyer: 'Compradora',
  transporter: 'Transportista',
}

export const ROLE_USERS: Record<UserRole, { name: string; subtitle: string }> = {
  farmer: { name: 'Juan Pérez', subtitle: 'Agricultor · Huánuco' },
  buyer: { name: 'María López', subtitle: 'Compradora · Huánuco' },
  transporter: { name: 'Mariano García', subtitle: 'Transportista · Huánuco' },
}

export function getModulesForRole(role: UserRole): ModuleDef[] {
  const allowed = ROLE_PERMISSIONS[role]
  return ALL_MODULES.filter((m) => allowed.includes(m.id))
}

export function canAccessModule(role: UserRole, moduleId: ModuleId): boolean {
  return ROLE_PERMISSIONS[role].includes(moduleId)
}
