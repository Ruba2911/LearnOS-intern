import BentoCard from "@/components/ui/BentoCard";

const activity = [42, 58, 36, 72, 64, 88, 76];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ActivityChart() {
  return (
    <BentoCard>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Weekly activity</p>
          <h3 className="mt-1 text-xl font-bold">12.5 hours</h3>
        </div>

        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          +18%
        </span>
      </div>

      <div className="mt-8 flex h-40 items-end gap-3">
        {activity.map((value, index) => (
          <div key={days[index]} className="flex flex-1 flex-col items-center gap-3">
            <div className="flex h-32 w-full items-end rounded-full bg-white/5 p-1">
              <div
                className="w-full rounded-full bg-gradient-to-t from-violet-500 to-cyan-300"
                style={{ height: `${value}%` }}
              />
            </div>
            <span className="text-xs text-slate-500">{days[index]}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
