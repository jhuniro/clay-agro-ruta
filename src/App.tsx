import { useState, useEffect } from 'react'
import FarmerScreen from './components/FarmerScreen'
import BuyerScreen from './components/BuyerScreen'
import TransporterScreen from './components/TransporterScreen'
import TrackingView from './components/TrackingView'
import { RutiCopilot } from './ruti'
import AuthLayout from './modules/auth/AuthLayout'
import RoleSelection from './modules/auth/RoleSelection'
import Login from './modules/auth/Login'
import Register from './modules/auth/Register'
import { useAuthStore } from './stores/authStore'
import { UserRole } from './types'
import './App.css'

type View = 'home' | 'login' | 'register' | 'dashboard'

function App() {
  const { isAuthenticated, selectedRole, logout } = useAuthStore()
  const [view, setView] = useState<View>('home')
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  // Auto-login al montar si ya está autenticado
  useEffect(() => {
    if (isAuthenticated && selectedRole) {
      setView('dashboard')
      document.body.className = `role-${selectedRole}`
    }
  }, [isAuthenticated, selectedRole])

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
    setView('login')
  }

  const handleLoginSuccess = () => {
    setView('dashboard')
    if (useAuthStore.getState().selectedRole) {
      document.body.className = `role-${useAuthStore.getState().selectedRole}`
    }
  }

  const handleLogout = () => {
    logout()
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
            if (isAuthenticated && selectedRole === 'buyer') {
              setView('dashboard');
            } else {
              setView('home');
            }
          }}
        />
      ) : (
        <>
          {view === 'home' && (
            <AuthLayout>
              <RoleSelection onSelect={handleRoleSelect} />
            </AuthLayout>
          )}

          {view === 'login' && (
            <AuthLayout>
              <Login 
                onBack={() => setView('home')} 
                onSuccess={handleLoginSuccess}
                onGoToRegister={() => setView('register')}
              />
            </AuthLayout>
          )}

          {view === 'register' && (
            <AuthLayout>
              <Register 
                onBack={() => setView('home')} 
                onSuccess={() => setView('login')}
                onGoToLogin={() => setView('login')}
              />
            </AuthLayout>
          )}

          {view === 'dashboard' && isAuthenticated && selectedRole === 'farmer' && <FarmerScreen onBack={handleLogout} />}
          {view === 'dashboard' && isAuthenticated && selectedRole === 'buyer' && <BuyerScreen onBack={handleLogout} />}
          {view === 'dashboard' && isAuthenticated && selectedRole === 'transporter' && <TransporterScreen onBack={handleLogout} />}
          
          <RutiCopilot currentView={view === 'dashboard' ? (selectedRole as string) : 'home'} />
        </>
      )}
    </>
  )
}

export default App
