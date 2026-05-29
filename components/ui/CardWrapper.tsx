import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function CardWrapper({
  children,
  className,
}: CardWrapperProps) {
  return (
    <div
      className={twMerge(
        "rounded-[24px] border border-white/10 bg-white/[0.04] p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
