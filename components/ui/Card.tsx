import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-cyan-100/10 bg-[#0b1528]/80 shadow-[0_0_0_1px_rgba(34,211,238,0.04),0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}
