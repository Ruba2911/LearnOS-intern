import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlowCard({
  children,
  className,
}: GlowCardProps) {
  return (
    <div
      className={twMerge(
        "rounded-[28px] border border-violet-400/20 bg-violet-500/10 p-6 shadow-2xl shadow-violet-950/30",
        className,
      )}
    >
      {children}
    </div>
  );
}
