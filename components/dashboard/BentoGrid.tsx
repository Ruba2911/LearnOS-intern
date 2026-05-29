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
        max-w-[1500px]
        min-h-[calc(100vh-7rem)]
        auto-rows-[minmax(170px,auto)]
        grid-cols-1
        gap-4
        sm:gap-5
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      {children}
    </section>
  );
}
