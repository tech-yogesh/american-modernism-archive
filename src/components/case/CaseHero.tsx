interface CaseHeroProps {
  name: string;
}

export default function CaseHero({
  name,
}: CaseHeroProps) {
  return (
    <header
      data-case-hero
      className="
        px-[var(--page-gutter)]
        pb-10
        pt-12
        md:pb-14
        md:pt-16
        lg:pb-16
        lg:pt-20
      "
    >
      <h1
        className="
          max-w-[14ch]
          font-[family-name:var(--font-display)]
          text-[clamp(3.6rem,8.5vw,9.5rem)]
          font-bold
          uppercase
          leading-[0.88]
          tracking-[-0.05em]
          text-[var(--color-text-primary)]
        "
      >
        {name}
      </h1>
    </header>
  );
}