interface Props {
  status: 'ok' | 'alerta'
  message?: string
}

export default function AlertBanner({ status, message }: Props) {
  const isAlerta = status === 'alerta'

  return (
    <div
      className={`rounded-xl px-4 py-3 flex items-center gap-3 text-sm font-semibold transition-all ${
        isAlerta
          ? 'bg-red-600/15 border border-red-500/25 text-red-400 shadow-[0_0_20px_rgba(255,51,85,0.08)]'
          : 'bg-[#00e676]/10 border border-[#00e676]/15 text-[#00e676]'
      }`}
    >
      <span className={`text-lg ${isAlerta ? 'animate-pulse' : ''}`}>
        {isAlerta ? '⚠️' : '✅'}
      </span>
      <span className="text-xs leading-relaxed">
        {message ?? (isAlerta
          ? 'Alerta: Huaico reportado en ruta cercana'
          : 'No hay alertas activas en tu zona')}
      </span>
    </div>
  )
}
