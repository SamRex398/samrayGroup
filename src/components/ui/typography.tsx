import * as React from "react";
import { cn } from "../../lib/utils";

export function Eyebrow({
  children,
  className,
  dark,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "font-mono text-xs tracking-[0.18em] uppercase",
        dark ? "text-solargold" : "text-primary",
        className
      )}
    >
      {children}
    </div>
  );
}

export function StatusBadge({
  status,
}: {
  status: "Operational" | "Maintenance" | "Development";
}) {
  const map = {
    Operational: { bg: "bg-success/10", text: "text-success", dot: "bg-success" },
    Maintenance: { bg: "bg-gold/15", text: "text-[#8a6a00]", dot: "bg-gold" },
    Development: { bg: "bg-infoc/10", text: "text-infoc", dot: "bg-infoc" },
  } as const;
  const s = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-mono tracking-wide uppercase",
        s.bg,
        s.text
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", s.dot)} /> {status}
    </span>
  );
}
