import { useState } from 'react'

import { useAuthStore } from '../../stores/authStore'
import { UserRole } from '../../types'

interface LoginProps {
  onBack: () => void
  onSuccess: () => void
  onGoToRegister: () => void
}

export default function Login({ onBack, onSuccess, onGoToRegister }: LoginProps) {
  const { login, selectedRole, loginError, registerSuccess, clearErrors, clearRegisterSuccess } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()
    
    if (login(email, password)) {
      onSuccess()
    }
  }

  const roleNames: Record<UserRole, string> = {
    farmer: 'Agricultor',
    buyer: 'Comprador',
    transporter: 'Transportista'
  }

  return (
    <div className="auth-form-container auth-fade-in">
      <button className="auth-back-btn" onClick={() => { clearErrors(); clearRegisterSuccess(); onBack(); }} type="button">
        ← Volver
      </button>

      <div className={`auth-glow-bar auth-glow-bar--${selectedRole}`} />

      <div className="auth-header">
        <h2 className="auth-title">Bienvenido, {selectedRole ? roleNames[selectedRole] : 'Usuario'}</h2>
        <p className="auth-subtitle">Inicia sesión en tu cuenta para continuar</p>
      </div>

      {registerSuccess && (
        <div className="auth-alert auth-alert--success">
          {registerSuccess}
        </div>
      )}

      {loginError && (
        <div className="auth-alert auth-alert--error">
          {loginError}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ej: tu@correo.com"
            required
            className="auth-input"
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="auth-input-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 caracteres"
              required
              className="auth-input"
            />
            <button
              type="button"
              className="auth-eye-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️‍🗨️' : '👁️'}
            </button>
          </div>
        </div>

        <button type="submit" className={`auth-submit-btn auth-submit-btn--${selectedRole}`}>
          Iniciar Sesión
        </button>
      </form>

      <div className="auth-footer">
        <p>¿No tienes una cuenta?</p>
        <button 
          className="auth-link-btn" 
          onClick={() => { clearErrors(); clearRegisterSuccess(); onGoToRegister(); }} 
          type="button"
        >
          Regístrate aquí
        </button>
      </div>
    </div>
  )
}
