"use client";

import { motion } from "framer-motion";

const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const intensities = [
  0, 1, 1, 3, 2, 4, 2,
  1, 2, 4, 3, 5, 4, 3,
  0, 3, 4, 5, 4, 5, 2,
  2, 4, 3, 5, 5, 4, 1,
  1, 2, 5, 4, 3, 2, 0,
  0, 3, 4, 5, 3, 1, 2,
  1, 2, 3, 4, 5, 4, 3,
];

const cellStyles = [
  "bg-white/[0.045]",
  "bg-violet-500/20",
  "bg-violet-500/35 shadow-[0_0_16px_rgba(139,92,246,0.22)]",
  "bg-gradient-to-br from-violet-500/70 to-blue-500/55 shadow-[0_0_18px_rgba(139,92,246,0.38)]",
  "bg-gradient-to-br from-blue-500/80 to-cyan-400/65 shadow-[0_0_20px_rgba(34,211,238,0.35)]",
  "bg-gradient-to-br from-violet-400 to-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.5)]",
];

export default function ActivityHeatmap() {
  return (
    <div className="mt-7">
      <div className="mb-3 ml-10 grid grid-cols-7 gap-2 text-center text-[11px] font-medium text-slate-500">
        {weeks.map((week) => (
          <span key={week}>{week}</span>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="grid grid-rows-7 gap-2 py-0.5 text-[11px] font-medium text-slate-500">
          {weeks.map((week) => (
            <span key={week} className="flex h-7 items-center">{week}</span>
          ))}
        </div>

        <div className="grid flex-1 grid-cols-7 gap-2 sm:grid-cols-7">
          {intensities.map((intensity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.55 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.012, duration: 0.32 }}
              whileHover={{ scale: 1.16, rotate: 2 }}
              className={`h-7 min-w-0 cursor-pointer rounded-lg border border-white/5 transition ${cellStyles[intensity]}`}
              title={`${intensity * 18} minutes focused`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 text-xs text-slate-500">
        <span>Less</span>
        <div className="flex items-center gap-1.5">
          {cellStyles.map((style, index) => (
            <span key={index} className={`h-3 w-3 rounded ${style}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
