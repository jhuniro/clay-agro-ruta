import type { ReactNode } from "react";

interface Props {
  title?: string;
  icon?: ReactNode;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function DashboardCard({
  title,
  icon,
  badge,
  children,
  className = "",
  noPadding,
}: Props) {
  return (
    <div
      className={`bg-[#0c1a0e] border border-[rgba(0,230,118,0.08)] rounded-2xl shadow-lg shadow-black/20 ${className}`}
    >
      {(title || badge) && (
        <div
          className={`flex items-center justify-between ${noPadding ? "" : "px-4 md:px-5 pt-5 pb-0"}`}
        >
          <div className="flex items-center gap-2">
            {icon}
            {title && <h3 className="text-sm font-bold text-white">{title}</h3>}
          </div>
          {badge}
        </div>
      )}
      <div className={noPadding ? "" : "p-4 md:p-5 pt-3"}>{children}</div>
    </div>
  );
}
