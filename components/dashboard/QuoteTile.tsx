import { Quote } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";

export default function QuoteTile() {
  return (
    <GlowCard>
      <Quote className="h-8 w-8 text-violet-200" />

      <p className="mt-5 text-lg font-semibold leading-8 text-white">
        Small focused sessions compound into serious fluency.
      </p>

      <p className="mt-4 text-sm text-violet-100/70">Learning reminder</p>
    </GlowCard>
  );
}
