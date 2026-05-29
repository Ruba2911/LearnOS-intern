interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}

export default function SectionTitle({
  eyebrow,
  title,
  action,
}: SectionTitleProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="mt-2 text-2xl font-bold text-white">{title}</h2>
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
