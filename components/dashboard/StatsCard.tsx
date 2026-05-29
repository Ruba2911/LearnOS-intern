import { BarChart3, BookOpen, Clock3, Trophy } from "lucide-react";
import BentoCard from "../ui/BentoCard";

interface Props {
  title: string;
  value: string;
  description: string;
  tone?: "violet" | "blue" | "cyan";
}

const iconMap = {
  Courses: BookOpen,
  Hours: Clock3,
  Projects: Trophy,
};

const toneMap = {
  violet: "from-violet-500/25 to-fuchsia-500/10 text-violet-200 shadow-violet-900/30",
  blue: "from-blue-500/25 to-indigo-500/10 text-blue-200 shadow-blue-900/30",
  cyan: "from-cyan-500/25 to-teal-500/10 text-cyan-200 shadow-cyan-900/30",
};

export default function StatsCard({
  title,
  value,
  description,
  tone = "violet",
}: Props) {
  const Icon = iconMap[title as keyof typeof iconMap] ?? BarChart3;

  return (
    <BentoCard className="group min-h-[170px]">
      <div className="flex h-full items-center gap-5">
        <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-2xl ${toneMap[tone]}`}>
          <Icon className="h-8 w-8" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-black tracking-tight text-white">
            {value}
          </h2>

          <p className="mt-1 text-sm leading-5 text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
