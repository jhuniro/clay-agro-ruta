import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

interface Props {
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export default function SidebarHeader({ collapsed, onToggleCollapse }: Props) {
  return (
    <div className={`mb-10 ${collapsed ? 'flex justify-center' : ''}`}>
      {!collapsed ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 pl-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[rgba(0,230,118,0.18)] to-[rgba(0,230,118,0.06)] border border-[rgba(0,230,118,0.2)] flex items-center justify-center shadow-[0_0_28px_rgba(0,230,118,0.14)]">
              <span className="text-[24px]">🌿</span>
            </div>
            <div>
              <h1 className="text-[18px] font-extrabold text-white tracking-tight leading-none">
                AgroRuta
              </h1>
              <p className="text-[10px] font-semibold text-[#5a9e6f] tracking-[0.2em] uppercase mt-1.5">
                Huánuco
              </p>
            </div>
          </div>
          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="flex items-center justify-center w-8 h-8 rounded-xl text-[#5a9e6f] hover:text-[#81c784] hover:bg-[rgba(0,230,118,0.06)] transition-all duration-150 active:scale-90"
              aria-label="Colapsar sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[rgba(0,230,118,0.18)] to-[rgba(0,230,118,0.06)] border border-[rgba(0,230,118,0.2)] flex items-center justify-center shadow-[0_0_28px_rgba(0,230,118,0.14)]">
            <span className="text-[24px]">🌿</span>
          </div>
          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="mt-3 flex items-center justify-center w-8 h-8 rounded-xl text-[#5a9e6f] hover:text-[#81c784] hover:bg-[rgba(0,230,118,0.06)] transition-all duration-150 active:scale-90"
              aria-label="Expandir sidebar"
            >
              <PanelLeftOpen size={18} />
            </button>
          )}
        </>
      )}
    </div>
  )
}
