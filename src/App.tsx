import { useState } from 'react'
import './App.css'
import FarmerDashboard from './features/farmer/FarmerDashboard'
import BuyerDashboard from './features/buyer/BuyerDashboard'
import TransporterDashboard from './features/transporter/TransporterDashboard'

type UserRole = 'farmer' | 'buyer' | 'transporter'

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

function App() {
  const [role, setRole] = useState<UserRole | null>(null)

  if (role === 'farmer') return <FarmerDashboard />
  if (role === 'buyer') return <BuyerDashboard />
  if (role === 'transporter') return <TransporterDashboard />

  return (
    <main className="app" aria-label="AgroRuta Huánuco — Selección de rol">
      <div className="app__orb" aria-hidden="true" />
      <div className="app__orb" aria-hidden="true" />
      <div className="app__orb" aria-hidden="true" />
      <div className="scan-line" aria-hidden="true" />

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
          {ROLES.map((r) => (
            <button
              key={r.id}
              className={`role-btn ${r.cssClass}`}
              onClick={() => setRole(r.id)}
              aria-label={`Ingresar como ${r.label}: ${r.hint}`}
              type="button"
            >
              <span className="role-btn__icon" aria-hidden="true">{r.icon}</span>
              <span className="role-btn__content">
                <span className="role-btn__label">{r.label}</span>
                <span className="role-btn__hint">{r.hint}</span>
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
  )
}

export default App
