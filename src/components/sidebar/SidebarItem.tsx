import type { ModuleDef } from '../../context/permissions'

interface Props {
  module: ModuleDef
  isActive: boolean
  onClick: () => void
  collapsed?: boolean
}

export default function SidebarItem({ module, isActive, onClick, collapsed }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={collapsed ? module.label : undefined}
      className={`group relative flex items-center w-full rounded-xl text-left transition-all duration-150 active:scale-[0.97] ${
        collapsed ? 'justify-center px-2 py-4' : 'gap-4 px-4 py-4'
      } ${
        isActive
          ? 'bg-gradient-to-r from-[rgba(0,230,118,0.14)] to-[rgba(0,230,118,0.06)] text-[#00e676] shadow-[0_0_20px_rgba(0,230,118,0.08),inset_0_1px_0_rgba(0,230,118,0.1)]'
          : 'text-[#81c784] hover:bg-[rgba(0,230,118,0.05)] hover:text-[#b2dfdb] hover:shadow-[inset_0_1px_0_rgba(0,230,118,0.04)]'
      }`}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 bg-[#00e676] rounded-r-full shadow-[0_0_10px_rgba(0,230,118,0.6)]" />
      )}
      <span className={`text-[22px] shrink-0 transition-all duration-200 leading-none ${
        isActive
          ? 'drop-shadow-[0_0_10px_rgba(0,230,118,0.6)]'
          : 'group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(0,230,118,0.3)]'
      }`}>
        {module.icon}
      </span>
      {!collapsed && (
        <span className={`text-[13px] font-semibold tracking-wide transition-colors ${
          isActive ? 'text-white' : ''
        }`}>
          {module.label}
        </span>
      )}
    </button>
  )
}
