import * as React from "react";
import { cn } from "../../lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-mono text-xs tracking-[0.18em] uppercase text-copper/90",
        className
      )}
    >
      {children}
    </div>
  );
}
