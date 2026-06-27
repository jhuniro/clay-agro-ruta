import { useState } from 'react'
import FarmerScreen from './components/FarmerScreen'
import BuyerScreen from './components/BuyerScreen'
import TransporterScreen from './components/TransporterScreen'
import { RutiCopilot } from './ruti'
import './App.css'

// ─── Role definitions ────────────────────────────────────────────────────────
type UserRole = 'farmer' | 'buyer' | 'transporter'
type View = 'home' | UserRole

interface RoleOption {
  id: UserRole
  label: string
  hint: string
  icon: string
  cssClass: string
}

const ROLES: RoleOption[] = [
  {
    id: 'farmer',
    label: 'Agricultor',
    hint: 'Reporta bloqueos y gestiona tus cultivos',
    icon: '🌱',
    cssClass: 'role-btn--farmer',
  },
  {
    id: 'buyer',
    label: 'Comprador',
    hint: 'Encuentra rutas activas y productos disponibles',
    icon: '🛒',
    cssClass: 'role-btn--buyer',
  },
  {
    id: 'transporter',
    label: 'Transportista',
    hint: 'Navega rutas alternativas en tiempo real',
    icon: '🚛',
    cssClass: 'role-btn--transporter',
  },
]

// ─── Component ───────────────────────────────────────────────────────────────
function App() {
  const [view, setView] = useState<View>('home')

  const handleRoleSelect = (role: UserRole) => {
    setView(role)
  }

  const handleBack = () => {
    setView('home')
  }

  return (
    <>
      {view === 'home' && (
        <main className="app" aria-label="AgroRuta Huánuco — Selección de rol">
          <div className="welcome-card" role="region" aria-labelledby="app-title">
            {/* Decorative topographic lines */}
            <svg className="welcome-card__topo" width="342" height="400" viewBox="0 0 342 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M-20 120 Q80 100 160 130 Q240 160 342 140" stroke="rgba(0,186,124,0.06)" strokeWidth="1" fill="none"/>
              <path d="M-20 160 Q60 140 140 170 Q220 200 342 180" stroke="rgba(0,186,124,0.04)" strokeWidth="1" fill="none"/>
              <path d="M-20 200 Q100 180 180 210 Q260 240 342 220" stroke="rgba(0,186,124,0.03)" strokeWidth="1" fill="none"/>
              <path d="M-20 240 Q70 220 150 250 Q230 280 342 260" stroke="rgba(0,186,124,0.025)" strokeWidth="1" fill="none"/>
              <path d="M-20 280 Q90 260 170 290 Q250 320 342 300" stroke="rgba(0,186,124,0.02)" strokeWidth="1" fill="none"/>
            </svg>

            {/* Decorative icon */}
            <div className="welcome-card__icon-deco" aria-hidden="true">🌿</div>

            <div className="welcome-card__icon" aria-hidden="true">🌿</div>

            <h1 id="app-title" className="welcome-card__title">
              AgroRuta Huánuco
            </h1>
            <p className="welcome-card__subtitle">Plataforma Agrícola · Hackathon 2026</p>

            <p className="welcome-card__description">
              Conectamos agricultores, compradores y transportistas para reducir
              pérdidas por bloqueos, huaicos y retrasos en rutas agrícolas.
            </p>

            <div className="welcome-card__divider" aria-hidden="true">
              <span className="welcome-card__divider-text">Selecciona tu rol</span>
            </div>

            <nav className="role-buttons" aria-label="Selección de rol">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  id={`role-btn-${role.id}`}
                  className={`role-btn ${role.cssClass}`}
                  onClick={() => handleRoleSelect(role.id)}
                  aria-label={`Ingresar como ${role.label}: ${role.hint}`}
                  type="button"
                >
                  <span className="role-btn__icon" aria-hidden="true">
                    {role.icon}
                  </span>
                  <span className="role-btn__content">
                    <span className="role-btn__label">{role.label}</span>
                    <span className="role-btn__hint">{role.hint}</span>
                  </span>
                  <span className="role-btn__arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </nav>

            <p className="welcome-card__footer">
              Región Huánuco · Perú &nbsp;·&nbsp; <span>Hackathon Clay 2026</span>
            </p>
          </div>
        </main>
      )}

      {view === 'farmer' && <FarmerScreen onBack={handleBack} />}
      {view === 'buyer' && <BuyerScreen onBack={handleBack} />}
      {view === 'transporter' && <TransporterScreen onBack={handleBack} />}

      <RutiCopilot currentView={view} />
    </>
  )
}

export default App
