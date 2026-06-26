import { useApp } from '../../context/AppContext'

interface Props {
  collapsed?: boolean
}

export default function SidebarFooter({ collapsed }: Props) {
  const { userName, userSubtitle } = useApp()

  return (
    <div className={`mt-auto pt-6 pb-4 border-t border-[rgba(0,230,118,0.06)] ${collapsed ? 'px-2' : 'px-6'}`}>
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-4'}`}>
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[rgba(0,230,118,0.18)] to-[rgba(0,230,118,0.06)] border border-[rgba(0,230,118,0.2)] flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(0,230,118,0.12)]">
          <span className="text-sm font-bold text-[#00e676]">
            {userName.split(' ').map((n) => n[0]).join('')}
          </span>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-white truncate">{userName}</p>
            <p className="text-[11px] text-[#5a9e6f] truncate mt-1">{userSubtitle}</p>
          </div>
        )}
      </div>
    </div>
  )
}
