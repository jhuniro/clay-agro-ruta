import { Home, ShoppingBag, History, User } from 'lucide-react'

const items = [
  { icon: Home, label: 'Inicio', active: true },
  { icon: ShoppingBag, label: 'Marketplace' },
  { icon: History, label: 'Historial' },
  { icon: User, label: 'Perfil' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-[#0c1a0e]/90 backdrop-blur-lg border-t border-[rgba(0,230,118,0.08)] px-2 pb-safe">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.label}
            type="button"
            className={`flex flex-col items-center gap-0.5 py-3 px-4 transition-colors ${
              item.active ? 'text-[#00e676]' : 'text-[#3d6b4f]'
            }`}
          >
            <Icon size={22} />
            <span className="text-[10px] font-semibold tracking-wide uppercase">
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
