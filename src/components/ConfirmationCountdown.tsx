import { useState, useEffect } from 'react'

interface Props {
  onConfirm: () => void
  onExpire: () => void
  label: string
  durationSec?: number
}

export default function ConfirmationCountdown({ onConfirm, onExpire, label, durationSec = 15 }: Props) {
  const [timeLeft, setTimeLeft] = useState(durationSec)
  const [isConfirming, setIsConfirming] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onExpire])

  const progressPct = (timeLeft / durationSec) * 100

  const handleConfirm = () => {
    setIsConfirming(true)
    setTimeout(() => {
      onConfirm()
    }, 600) // Small delay for animation
  }

  return (
    <div style={{ width: '100%', marginBottom: 16 }}>
      <div style={{ textAlign: 'center', marginBottom: 8, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
        Tienes {timeLeft} segundos para confirmar...
      </div>
      <button 
        onClick={handleConfirm}
        disabled={isConfirming}
        style={{
          width: '100%',
          padding: '16px 24px',
          background: isConfirming ? '#2d7a3a' : 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          fontSize: '1.1rem',
          fontWeight: 700,
          cursor: isConfirming ? 'default' : 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background 0.3s ease'
        }}
      >
        {/* Progress bar background */}
        {!isConfirming && (
          <div style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: '4px',
            width: `${progressPct}%`,
            background: 'rgba(255,255,255,0.4)',
            transition: 'width 1s linear'
          }} />
        )}
        
        <span style={{ position: 'relative', zIndex: 10 }}>
          {isConfirming ? '¡Confirmado! ✔️' : label}
        </span>
      </button>
    </div>
  )
}
