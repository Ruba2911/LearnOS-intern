import { CalendarDays } from "lucide-react";
import BentoCard from "@/components/ui/BentoCard";

const sessions = [
  { time: "09:30", title: "React patterns" },
  { time: "13:00", title: "AI prompt lab" },
  { time: "18:15", title: "Design review" },
];

export default function CalendarTile() {
  return (
    <BentoCard>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
          <CalendarDays className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-slate-400">Today</p>
          <h3 className="text-xl font-bold">3 sessions</h3>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {sessions.map((session) => (
          <div
            key={session.time}
            className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3"
          >
            <span className="text-sm font-semibold text-violet-200">
              {session.time}
            </span>
            <span className="text-sm text-slate-300">{session.title}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
