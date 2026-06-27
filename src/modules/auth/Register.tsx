import { useState } from 'react'

import { useAuthStore } from '../../stores/authStore'
import { UserRole } from '../../types'

interface RegisterProps {
  onBack: () => void
  onSuccess: () => void
  onGoToLogin: () => void
}

export default function Register({ onBack, onSuccess, onGoToLogin }: RegisterProps) {
  const { register, registerError, clearErrors, selectedRole, setSelectedRole } = useAuthStore()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    password: '',
    confirmPassword: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()
    setValidationError(null)
    
    // Validaciones
    if (!formData.name.trim()) return setValidationError('El nombre es obligatorio')
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return setValidationError('El correo no tiene un formato válido')
    if (!/^[0-9]{9,}$/.test(formData.phone)) return setValidationError('El celular debe contener solo números (min. 9)')
    if (formData.address.trim().length < 10) return setValidationError('La dirección debe tener al menos 10 caracteres')
    if (!formData.birthDate) return setValidationError('La fecha de nacimiento es obligatoria')
    if (formData.password.length < 8) return setValidationError('La contraseña debe tener al menos 8 caracteres')
    if (formData.password !== formData.confirmPassword) return setValidationError('Las contraseñas no coinciden')
    if (!selectedRole) return setValidationError('Por favor, selecciona un rol')

    const success = register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      birthDate: formData.birthDate,
      role: selectedRole,
      password: formData.password
    })

    if (success) {
      onSuccess()
    }
  }

  return (
    <div className="auth-form-container auth-form-container--wide auth-fade-in">
      <button className="auth-back-btn" onClick={() => { clearErrors(); onBack(); }} type="button">
        ← Volver
      </button>

      <div className={`auth-glow-bar auth-glow-bar--${selectedRole || 'default'}`} />

      <div className="auth-header">
        <h2 className="auth-title">Crear una cuenta</h2>
        <p className="auth-subtitle">Completa tus datos para unirte a AgroRuta</p>
      </div>

      {(validationError || registerError) && (
        <div className="auth-alert auth-alert--error">
          {validationError || registerError}
        </div>
      )}

      <form className="auth-form auth-form--grid" onSubmit={handleSubmit}>
        
        {/* Selector Visual de Rol */}
        <div className="auth-role-selector-container">
          <label>¿Cuál será tu rol?</label>
          <div className="auth-role-selector">
            <div 
              className={`role-select-card ${selectedRole === 'farmer' ? 'role-select-card--active-farmer' : ''}`}
              onClick={() => setSelectedRole('farmer')}
            >
              <span className="role-icon">🌱</span>
              <span>Agricultor</span>
            </div>
            <div 
              className={`role-select-card ${selectedRole === 'buyer' ? 'role-select-card--active-buyer' : ''}`}
              onClick={() => setSelectedRole('buyer')}
            >
              <span className="role-icon">🛒</span>
              <span>Comprador</span>
            </div>
            <div 
              className={`role-select-card ${selectedRole === 'transporter' ? 'role-select-card--active-transporter' : ''}`}
              onClick={() => setSelectedRole('transporter')}
            >
              <span className="role-icon">🚛</span>
              <span>Transportista</span>
            </div>
          </div>
        </div>

        {/* Campos 8 */}
        <div className="auth-form-group">
          <label htmlFor="name">Nombre completo</label>
          <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className="auth-input" />
        </div>

        <div className="auth-form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="auth-input" />
        </div>

        <div className="auth-form-group">
          <label htmlFor="phone">Nro. de Celular</label>
          <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="auth-input" />
        </div>

        <div className="auth-form-group">
          <label htmlFor="birthDate">Fecha de Nacimiento</label>
          <input id="birthDate" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} required className="auth-input" />
        </div>

        <div className="auth-form-group auth-form-group--full">
          <label htmlFor="address">Dirección completa</label>
          <input id="address" name="address" type="text" value={formData.address} onChange={handleChange} required className="auth-input" />
        </div>

        <div className="auth-form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="auth-input-wrapper">
            <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} required className="auth-input" />
            <button type="button" className="auth-eye-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '👁️‍🗨️' : '👁️'}
            </button>
          </div>
        </div>

        <div className="auth-form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <div className="auth-input-wrapper">
            <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} required className="auth-input" />
            <button type="button" className="auth-eye-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? '👁️‍🗨️' : '👁️'}
            </button>
          </div>
        </div>

        <button type="submit" className={`auth-submit-btn auth-submit-btn--${selectedRole || 'default'} auth-form-group--full`}>
          Crear Cuenta
        </button>
      </form>

      <div className="auth-footer">
        <p>¿Ya tienes una cuenta?</p>
        <button className="auth-link-btn" onClick={() => { clearErrors(); onGoToLogin(); }} type="button">
          Inicia sesión
        </button>
      </div>
    </div>
  )
}
