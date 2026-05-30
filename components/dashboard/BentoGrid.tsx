interface Props {
  children: React.ReactNode;
}

export default function BentoGrid({
  children,
}: Props) {
  return (
    <section
      className="
        mx-auto
        grid
        max-w-[1600px]
        auto-rows-[minmax(130px,auto)]
        grid-cols-1
        gap-3
        sm:gap-4
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      {children}
    </section>
  );
}
