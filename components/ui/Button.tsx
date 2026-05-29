import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-violet-500 text-white hover:bg-violet-400",
  secondary:
    "border border-white/10 bg-white/5 text-white hover:bg-white/10",
  ghost: "text-slate-300 hover:bg-white/5 hover:text-white",
};

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
          variants[variant],
          className,
        ),
      )}
      {...props}
    >
      {children}
    </button>
  );
}
