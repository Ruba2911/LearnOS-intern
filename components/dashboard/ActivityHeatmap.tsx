"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getActivityHeatmapData } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/client";

const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const cellStyles = [
  "bg-white/[0.045]",
  "bg-violet-500/20",
  "bg-violet-500/35 shadow-[0_0_16px_rgba(139,92,246,0.22)]",
  "bg-gradient-to-br from-violet-500/70 to-blue-500/55 shadow-[0_0_18px_rgba(139,92,246,0.38)]",
  "bg-gradient-to-br from-blue-500/80 to-cyan-400/65 shadow-[0_0_20px_rgba(34,211,238,0.35)]",
  "bg-gradient-to-br from-violet-400 to-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.5)]",
];

interface ActivityHeatmapProps {
  userId?: any;
}

export default function ActivityHeatmap({ userId }: ActivityHeatmapProps) {
  const [intensities, setIntensities] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const loadHeatmapData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const data = await getActivityHeatmapData(user.id);
          setIntensities(data);
        }
      } catch (err) {
        console.error("Error loading heatmap data:", err);
        // Fallback to empty array
        setIntensities(Array(49).fill(0));
      } finally {
        setIsLoading(false);
      }
    };

    loadHeatmapData();
  }, [supabase.auth]);

  if (isLoading) {
    return (
      <div className="mt-4 flex items-center justify-center h-28">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="mb-2 grid grid-cols-7 gap-2 text-center text-[11px] font-medium text-slate-500">
        {weeks.map((week) => (
          <span key={week}>{week}</span>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="grid grid-rows-7 gap-1 py-0 text-[11px] font-medium text-slate-500">
          {weeks.map((week) => (
            <span key={week} className="flex h-6 items-center">{week}</span>
          ))}
        </div>

        <div className="grid flex-1 grid-cols-7 gap-1 sm:grid-cols-7">
          {intensities.map((intensity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.55 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.012, duration: 0.32 }}
              whileHover={{ scale: 1.16, rotate: 2 }}
              className={`h-6 min-w-0 cursor-pointer rounded-lg border border-white/5 transition ${cellStyles[intensity]}`}
              title={`${intensity * 18} minutes focused`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500">
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
