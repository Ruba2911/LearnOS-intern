"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  className?: string;
}

export default function ProgressBar({
  value,
  className = "",
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`h-2 overflow-hidden rounded-full bg-white/10 shadow-inner shadow-black/30 ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clampedValue}%` }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.55)]"
      />
    </div>
  );
}
