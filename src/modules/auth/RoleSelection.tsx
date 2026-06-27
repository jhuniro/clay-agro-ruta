import { useAuthStore } from '../../stores/authStore'
import { UserRole } from '../../types'

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void
}

export default function RoleSelection({ onSelect }: RoleSelectionProps) {
  const { setSelectedRole } = useAuthStore()

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    onSelect(role)
  }

  return (
    <div className="role-selection slide-up-3d">
      <div className="auth-header">
        <h1 className="auth-title">Bienvenido a AgroRuta</h1>
        <p className="auth-subtitle">Selecciona tu rol para continuar</p>
      </div>
      
      <div className="role-buttons-grid">
        <button 
          className="role-btn role-btn--farmer" 
          onClick={() => handleRoleSelect('farmer')}
        >
          <div className="role-btn-shimmer"></div>
          <span className="role-icon">🌱</span>
          <span className="role-label">Agricultor</span>
          <span className="role-hint">Reporta bloqueos y gestiona cultivos</span>
        </button>

        <button 
          className="role-btn role-btn--buyer" 
          onClick={() => handleRoleSelect('buyer')}
        >
          <div className="role-btn-shimmer"></div>
          <span className="role-icon">🛒</span>
          <span className="role-label">Comprador</span>
          <span className="role-hint">Encuentra rutas y productos</span>
        </button>

        <button 
          className="role-btn role-btn--transporter" 
          onClick={() => handleRoleSelect('transporter')}
        >
          <div className="role-btn-shimmer"></div>
          <span className="role-icon">🚛</span>
          <span className="role-label">Transportista</span>
          <span className="role-hint">Navega rutas en tiempo real</span>
        </button>
      </div>
    </div>
  )
}
