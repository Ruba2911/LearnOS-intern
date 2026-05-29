interface Props {
  value: number;
}

export default function ProgressBar({
  value,
}: Props) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-white/5">
      <div
        className="
          h-full
          rounded-full
          bg-gradient-to-r
          from-violet-500
          to-cyan-500
          transition-all
          duration-500
        "
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  );
}