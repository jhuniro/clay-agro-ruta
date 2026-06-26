import { CloudSun } from 'lucide-react'

interface Props {
  name: string
  role: string
}

export default function DashboardHeader({ name, role }: Props) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-lg font-extrabold text-white tracking-tight">
          Hola, {name}
        </h1>
        <p className="text-xs font-medium text-[#b2dfdb] mt-0.5">{role}</p>
      </div>
      <div className="flex items-center gap-2 bg-[#0c1a0e] border border-[rgba(0,230,118,0.08)] rounded-full px-4 py-2 shadow-inner shadow-black/20">
        <CloudSun size={20} className="text-[#ffab00]" />
        <span className="text-sm font-extrabold text-white">18°C</span>
      </div>
    </header>
  )
}
