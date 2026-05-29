import { Flame } from "lucide-react";
import BentoCard from "@/components/ui/BentoCard";

const days = ["M", "T", "W", "T", "F", "S", "S"];

export default function StreakTile() {
  return (
    <BentoCard>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300">
          <Flame className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-slate-400">Current streak</p>
          <h3 className="text-2xl font-black">14 days</h3>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div key={`${day}-${index}`} className="text-center">
            <div
              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
                index < 5
                  ? "bg-orange-400 text-black"
                  : "bg-white/5 text-slate-500"
              }`}
            >
              {day}
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
