import { ReactNode } from 'react'
import './auth.css'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      {/* 3D animated background elements */}
      <div className="auth-bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      <div className="auth-bg-scanline"></div>
      <div className="auth-bg-grid"></div>

      {/* Main glassmorphism card */}
      <div className="auth-card">
        {children}
      </div>
    </div>
  )
}
