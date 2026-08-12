export default function HomeHero() {
  return (
    <section
      data-home-hero
      className="
        relative
        bg-[var(--color-bg)]
        px-[var(--page-gutter)]
        pb-16
        pt-14

        md:pb-20
        md:pt-16

        lg:pb-16
        lg:pt-16
      "
    >
     <h1
  className="
    whitespace-normal
    text-center

    font-[family-name:var(--font-display)]
    text-[clamp(4rem,10.3vw,11rem)]
    font-bold
    uppercase
    leading-[0.82]
    tracking-[-0.055em]

    text-[var(--color-text-primary)]

    md:whitespace-nowrap
    md:text-left
  "
>
  American Modernism
</h1>

      <div
        className="
          mt-12
          flex
          justify-center

          md:mt-14
          lg:mt-12
        "
      >
        {/* Mobile */}
        <p
          className="
            max-w-[34rem]

            text-center

            font-[family-name:var(--font-editorial)]
            text-base
            leading-[1.5]

            text-[var(--color-text-secondary)]

            md:hidden
          "
        >
          A project exploring early 20th-century American architects,
          contrasting them with European Modernism and revealing a distinct
          American path of functionalism that shaped contemporary architecture
        </p>

        {/* Tablet + Desktop */}
        <p
          className="
            hidden

            text-center

            font-[family-name:var(--font-editorial)]
            text-lg
            leading-[1.45]

            text-[var(--color-text-secondary)]

            md:block
            lg:text-[1.55rem]
          "
        >
          <span className="block">
            A project exploring early 20th-century American architects,
            contrasting
          </span>

          <span className="block">
            them with European Modernism and revealing a distinct American
          </span>

          <span className="block">
            path of functionalism that shaped contemporary architecture
          </span>
        </p>
      </div>
    </section>
  );
}