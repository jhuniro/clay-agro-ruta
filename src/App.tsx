import { useState } from 'react'
import './App.css'
import { mockRoutes } from './features/routes/routeMockData'
import MapView from './features/routes/MapView'
import RouteAlerts from './features/routes/RouteAlerts'
import RouteStatusBadge from './features/routes/RouteStatusBadge'
import FarmerDashboard from './features/farmer/FarmerDashboard'
import BuyerDashboard from './features/buyer/BuyerDashboard'
import TransporterDashboard from './features/transporter/TransporterDashboard'
import type { Route } from './features/routes/routeTypes'

// ─── Role definitions ────────────────────────────────────────────────────────
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

// ─── Component ───────────────────────────────────────────────────────────────
function App() {
  const [view, setView] = useState<'home' | 'routes' | 'dashboard'>('home')
  const [role, setRole] = useState<UserRole | null>(null)
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)

  const handleRoleSelect = (selected: UserRole) => {
    setRole(selected)
    setView('dashboard')
  }

  const handleRouteClick = (route: Route) => {
    setSelectedRoute(route)
  }

  if (view === 'dashboard' && role === 'farmer') {
    return <FarmerDashboard />
  }

  if (view === 'dashboard' && role === 'buyer') {
    return <BuyerDashboard />
  }

  if (view === 'dashboard' && role === 'transporter') {
    return <TransporterDashboard />
  }

  if (view === 'routes') {
    return (
      <main className="app" aria-label="AgroRuta Huánuco — Módulo de Rutas">
        <div className="app__orb" aria-hidden="true" />
        <div className="app__orb" aria-hidden="true" />
        <div className="app__orb" aria-hidden="true" />
        <div className="scan-line" aria-hidden="true" />
        <div className="routes-view">
          <button className="routes-view__back" onClick={() => { setView('home'); setSelectedRoute(null) }} type="button">
            ← Volver
          </button>
          <h1 className="routes-view__title">Rutas agrícolas</h1>
          <p className="routes-view__subtitle">Estado actual de las rutas en la región Huánuco</p>

          <RouteAlerts />

          <section className="routes-section">
            <header className="routes-section__header">
              <h2 className="routes-section__title">Todas las rutas</h2>
              {selectedRoute && (
                <button className="routes-section__back" onClick={() => setSelectedRoute(null)} type="button">
                  ← Volver
                </button>
              )}
            </header>

            {selectedRoute ? (
              <MapView route={selectedRoute} />
            ) : (
              <div className="route-list">
                {mockRoutes.map((route) => (
                  <button
                    key={route.id}
                    className="route-list__item"
                    onClick={() => handleRouteClick(route)}
                    type="button"
                  >
                    <div className="route-list__item-info">
                      <div className="route-list__item-name">{route.name}</div>
                      <div className="route-list__item-detail">
                        {route.distance} · {route.estimatedTime}
                      </div>
                    </div>
                    <RouteStatusBadge status={route.status} />
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    )
  }

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
  )
}

export default App
