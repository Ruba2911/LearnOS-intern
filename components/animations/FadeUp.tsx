"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeUp({
  children,
  className,
  delay = 0,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
