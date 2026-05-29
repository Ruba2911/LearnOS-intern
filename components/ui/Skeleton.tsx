import { twMerge } from "tailwind-merge";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={twMerge(
        "animate-pulse rounded-2xl bg-white/10",
        className,
      )}
    />
  );
}
