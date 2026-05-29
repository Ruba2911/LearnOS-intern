import { Clock, Flame, GraduationCap, Target } from "lucide-react";

const stats = [
  { icon: Flame, label: "Streak", value: "14 days" },
  { icon: Clock, label: "This week", value: "12.5h" },
  { icon: GraduationCap, label: "Courses", value: "8" },
  { icon: Target, label: "Goals", value: "91%" },
];

export default function StatsRow() {
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
              <span className="text-xs text-slate-500">{stat.label}</span>
            </div>

            <p className="mt-5 text-2xl font-black text-white">{stat.value}</p>
          </div>
        );
      })}
    </section>
  );
}
