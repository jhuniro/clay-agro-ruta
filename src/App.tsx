import { useState } from 'react'
import FarmerScreen from './components/FarmerScreen'
import BuyerScreen from './components/BuyerScreen'
import TransporterScreen from './components/TransporterScreen'
import RutiAssistant from './components/RutiAssistant'
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
          <div className="app__orb" aria-hidden="true" />

          <div className="welcome-card" role="region" aria-labelledby="app-title">
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

      <RutiAssistant currentView={view} />
    </>
  )
}

export default App
