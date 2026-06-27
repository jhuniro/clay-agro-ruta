import { useState, useEffect } from 'react'
import FarmerScreen from './components/FarmerScreen'
import BuyerScreen from './components/BuyerScreen'
import TransporterScreen from './components/TransporterScreen'
import TrackingView from './components/TrackingView'
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
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  const match = currentPath.match(/^\/tracking\/([^/]+)/)
  const trackingShipmentId = match ? match[1] : null

  const handleRoleSelect = (role: UserRole) => {
    setView(role)
    // Update body class for role-specific styling
    document.body.className = `role-${role}`
  }

  const handleBack = () => {
    setView('home')
    document.body.className = ''
  }

  return (
    <>
      {trackingShipmentId ? (
        <TrackingView
          shipmentId={trackingShipmentId}
          onBack={() => {
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new Event('popstate'));
            setView('buyer');
          }}
        />
      ) : (
        <>
          {view === 'home' && (
            <main className="app" aria-label="AgroRuta Huánuco — Selección de rol">
              <div className="welcome-card" role="region" aria-labelledby="app-title">
                {/* SVG Background */}
                <svg className="welcome-card__bg" fill="none" viewBox="0 0 342 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="url(#paint0_linear)" d="M0 66.44C0 31.65 0 14.25 11.33 5.24C22.65 -3.77 39.6 0.15 73.5 7.98L307.9 62.12C324.26 65.9 332.44 67.79 337.22 73.8C342 79.82 342 88.21 342 105V370C342 386.57 342 394.85 335.56 397.43C329.11 400 318.74 400 298 400H44C23.26 400 12.89 400 6.44 397.43C0 394.85 0 386.57 0 370V66.44Z"/>
                  <defs>
                    <linearGradient id="paint0_linear" gradientUnits="userSpaceOnUse" y2="200" x2="342" y1="200" x1="0">
                      <stop stopColor="#2d7a3a"/>
                      <stop stopColor="#1e5528" offset="1"/>
                    </linearGradient>
                  </defs>
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
      )}
    </>
  )
}

export default App
