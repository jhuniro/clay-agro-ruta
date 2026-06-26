import { CloudSun } from 'lucide-react'

interface Props {
  name: string
  role: string
}

export default function DashboardHeader({ name, role }: Props) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-lg font-extrabold text-[#e8f5e9] tracking-tight">
          Hola, {name}
        </h1>
        <p className="text-xs font-medium text-[#80cbc4] mt-0.5">{role}</p>
      </div>
      <div className="flex items-center gap-2 bg-gradient-to-br from-[rgba(12,26,14,0.8)] to-[rgba(5,11,6,0.6)] border border-[rgba(0,230,118,0.06)] rounded-full px-4 py-2 shadow-inner shadow-black/20">
        <CloudSun size={20} className="text-[#ffab00]" />
        <span className="text-sm font-extrabold text-[#e8f5e9]">18°C</span>
      </div>
    </header>
  )
}
