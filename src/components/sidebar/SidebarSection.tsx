import type { ReactNode } from 'react'

interface Props {
  label?: string
  children: ReactNode
  collapsed?: boolean
  isLast?: boolean
}

export default function SidebarSection({ label, children, collapsed, isLast }: Props) {
  return (
    <div className={`${isLast ? '' : 'mb-3'}`}>
      {label && !collapsed && (
        <p className="px-4 mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#5a9e6f]">
          {label}
        </p>
      )}
      <div className="space-y-2">
        {children}
      </div>
      {!isLast && !collapsed && (
        <div className="mx-4 my-5 h-px bg-gradient-to-r from-transparent via-[rgba(0,230,118,0.08)] to-transparent" />
      )}
    </div>
  )
}
