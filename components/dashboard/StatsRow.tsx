"use client";

import { useEffect, useState } from "react";
import { Clock, Flame, GraduationCap, Target } from "lucide-react";

import { getDashboardSummary } from "@/lib/supabase/queries";

const USER_ID =
  "06a04d1d-2c97-4f66-891f-5d2c06021a3a";

export default function StatsRow() {
  const [stats, setStats] = useState([
    {
      icon: Flame,
      label: "Achievements",
      value: "0",
    },
    {
      icon: Clock,
      label: "Hours",
      value: "0",
    },
    {
      icon: GraduationCap,
      label: "Courses",
      value: "0",
    },
    {
      icon: Target,
      label: "Progress",
      value: "0%",
    },
  ]);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getDashboardSummary(USER_ID);

        setStats([
  {
    icon: Flame,
    label: "Streak",
    value: String(data.streak),
  },
  {
    icon: Clock,
    label: "Hours",
    value: String(data.stats.totalHours),
  },
  {
    icon: GraduationCap,
    label: "Courses",
    value: String(data.stats.totalCoursesEnrolled),
  },
  {
    icon: Target,
    label: "Progress",
    value: `${data.stats.averageProgress}%`,
  },
]);
      } catch (error) {
        console.error(error);
      }
    }

    loadStats();
  }, []);

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-cyan-300">
                <Icon className="h-5 w-5" />
              </div>

              <span className="text-xs text-slate-500">
                {stat.label}
              </span>
            </div>

            <p className="mt-5 text-2xl font-black text-white">
              {stat.value}
            </p>
          </div>
        );
      })}
    </section>
  );
}