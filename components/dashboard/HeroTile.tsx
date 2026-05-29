import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HeroTile() {
  return (
    <section className="glass-card rounded-[32px] p-8 lg:p-10">
      <div className="flex max-w-4xl flex-col gap-8">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200">
          <Sparkles className="h-4 w-4" />
          Personalized learning path
        </div>

        <div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-white lg:text-6xl">
            Build your <span className="gradient-text">futuristic</span> AI
            learning journey.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 lg:text-lg">
            Master modern technologies with focused lessons, progress insights,
            and a dashboard that keeps your next best action visible.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button>
            Continue Learning
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="secondary">View Analytics</Button>
        </div>
      </div>
    </section>
  );
}
