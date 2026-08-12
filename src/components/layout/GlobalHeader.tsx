import Link from "next/link";

export default function GlobalHeader() {
  return (
    <header
      className="
        relative
        z-[var(--z-header)]
        h-[var(--header-height)]
        border-b
        border-[var(--color-divider)]
        px-[var(--page-gutter)]
      "
    >
      <div className="relative flex h-full items-center">
      <Link
  href="/"
  className="
    absolute
    left-1/2
    -translate-x-1/2
    whitespace-nowrap

    font-[family-name:var(--font-display)]
    text-[1.35rem]
    font-black
    uppercase
    leading-none
    tracking-[-0.035em]

    text-[var(--color-text-primary)]

    md:text-[1.7rem]
  "
>
  AMA&apos;S FILES
</Link>

        <nav className="ml-auto" aria-label="Primary navigation">
          <Link
            href="/about"
            className="
              font-[family-name:var(--font-utility)]
              text-xs
              uppercase
              tracking-[0.08em]
              text-[var(--color-text-secondary)]
              transition-colors
              hover:text-[var(--color-text-primary)]
            "
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}