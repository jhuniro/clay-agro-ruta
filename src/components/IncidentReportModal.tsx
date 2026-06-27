import { useState } from 'react'

interface Props {
  onClose: () => void
  onSubmit: (data: { type: string, description: string }) => void
}

export default function IncidentReportModal({ onClose, onSubmit }: Props) {
  const [type, setType] = useState('HUAICO')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!photo) {
      alert("Por favor, sube una foto de evidencia.")
      return
    }
    onSubmit({ type, description })
  }

  return (
    <div className="ts-modal-overlay" onClick={onClose}>
      <div className="ts-modal" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Reportar Incidente</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--color-text)' }}>×</button>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 8, fontSize: '0.85rem' }}>
          📍 Coordenadas actuales capturadas: <br/>
          <strong style={{ fontFamily: 'monospace' }}>-9.9833, -76.2167</strong>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Tipo de incidente</label>
            <select 
              value={type} 
              onChange={e => setType(e.target.value)}
              style={{ padding: 10, borderRadius: 8, background: 'var(--color-bg)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
            >
              <option value="HUAICO">Huaico</option>
              <option value="DERRUMBE">Derrumbe</option>
              <option value="ACCIDENTE">Accidente</option>
              <option value="BLOQUEO_VIAL">Bloqueo Vial</option>
              <option value="OTRO">Otro</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Foto (Obligatorio)</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={e => setPhoto(e.target.files?.[0] || null)} 
              style={{ fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Descripción (Opcional)</label>
            <textarea 
              maxLength={120}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Ej. Carril derecho bloqueado"
              style={{ padding: 10, borderRadius: 8, background: 'var(--color-bg)', color: 'var(--color-text)', border: '1px solid var(--color-border)', minHeight: 60, resize: 'none' }}
            />
          </div>

          <button type="submit" className="ts-btn ts-btn--danger" style={{ marginTop: 8 }}>
            Enviar Reporte
          </button>
        </form>
      </div>
    </div>
  )
}
