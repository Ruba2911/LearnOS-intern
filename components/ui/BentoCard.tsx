"use client";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function BentoCard({
  children,
  className,
}: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.006 }}
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
      className={twMerge(
        `
        glass-card
        rounded-[32px]
        p-6
        lg:p-7
        overflow-hidden
        relative
        before:pointer-events-none
        before:absolute
        before:inset-0
        before:rounded-[32px]
        before:bg-gradient-to-br
        before:from-violet-400/10
        before:via-transparent
        before:to-cyan-300/10
        after:pointer-events-none
        after:absolute
        after:inset-px
        after:rounded-[31px]
        after:border
        after:border-white/5
        hover:border-violet-300/20
        hover:shadow-[0_28px_90px_rgba(88,28,135,0.24)]
        transition-shadow
      `,
        className,
      )}
    >
      <div className="relative z-10 h-full">{children}</div>
    </motion.article>
  );
}
