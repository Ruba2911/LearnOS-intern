"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HoverScaleProps {
  children: ReactNode;
  className?: string;
}

export default function HoverScale({
  children,
  className,
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
