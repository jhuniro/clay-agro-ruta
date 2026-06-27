import { useState, type FormEvent } from 'react'

interface Props {
  onSubmit: (text: string) => void
}

export default function RutiInput({ onSubmit }: Props) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSubmit(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Escribe tu pregunta..."
        className="flex-1 px-3 py-2 text-sm rounded-[2px] bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none focus:border-[var(--color-primary)] transition-colors"
      />
      <button
        type="submit"
        className="px-3 py-2 text-sm font-medium rounded-[2px] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] transition-colors cursor-pointer"
      >
        Enviar
      </button>
    </form>
  )
}
