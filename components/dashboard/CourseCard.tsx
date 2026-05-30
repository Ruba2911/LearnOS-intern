"use client";

import { BrainCircuit, Clock, Code2, Layers3 } from "lucide-react";
import { motion } from "framer-motion";

import ProgressBar from "@/components/ui/ProgressBar";

interface CourseCardProps {
  title: string;
  category: string;
  progress: number;
  duration: string;
  tone?: "violet" | "blue" | "cyan";
}

const toneMap = {
  violet: {
    icon: Code2,
    shell: "from-violet-500/30 to-fuchsia-500/10 text-violet-100",
    badge: "text-violet-200 bg-violet-500/10 border-violet-300/15",
  },
  blue: {
    icon: BrainCircuit,
    shell: "from-blue-500/30 to-indigo-500/10 text-blue-100",
    badge: "text-blue-200 bg-blue-500/10 border-blue-300/15",
  },
  cyan: {
    icon: Layers3,
    shell: "from-cyan-500/30 to-teal-500/10 text-cyan-100",
    badge: "text-cyan-200 bg-cyan-500/10 border-cyan-300/15",
  },
};

export default function CourseCard({
  title,
  category,
  progress,
  duration,
  tone = "violet",
}: CourseCardProps) {
  const toneConfig = toneMap[tone];
  const Icon = toneConfig.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      className="group rounded-[28px] border border-white/10 bg-white/[0.045] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:border-violet-300/25 hover:bg-white/[0.07] hover:shadow-[0_24px_80px_rgba(88,28,135,0.22)]"
    >

      <div className="flex items-start justify-between gap-4">

        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-2xl transition group-hover:scale-105 ${toneConfig.shell}`}>
          <Icon className="h-6 w-6" />
        </div>

        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${toneConfig.badge}`}>
          {category}
        </span>

      </div>

      <h3 className="mt-3 text-lg font-bold leading-tight text-white">
        {title}
      </h3>

      <div className="mt-3">

        <div className="mb-1 flex justify-between text-xs text-slate-400">
          <span>Progress</span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="font-semibold text-slate-200"
          >
            {progress}%
          </motion.span>
        </div>

        <ProgressBar value={progress} />

      </div>

      <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
        <Clock className="h-4 w-4" />

        {duration}
      </div>

    </motion.article>
  );
}
