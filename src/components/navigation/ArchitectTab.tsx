import type { ArchitectSummary } from "@/types/content";

interface ArchitectTabProps {
  architect: ArchitectSummary;
  fallbackColor: string;
  orientation: "top" | "side";
  isActive?: boolean;
}

/*
 * One physical tab shape.
 *
 * Homepage uses it horizontally.
 * Case navigation uses exactly the same shape
 * rotated 90deg.
 */
const TAB_PATH = `
  M 0 56

  C 18 56,
    27 52,
    37 37

  L 48 19

  C 55 7,
    65 0,
    84 0

  L 316 0

  C 335 0,
    345 7,
    352 19

  L 363 37

  C 373 52,
    382 56,
    400 56

  Z
`;

export default function ArchitectTab({
  architect,
  fallbackColor,
  orientation,
  isActive = false,
}: ArchitectTabProps) {
  const backgroundColor =
    architect.tabColor ??
    fallbackColor;

  const textColor =
    architect.textColor ??
    "var(--color-text-primary)";

  /*
   * ==================================================
   * HOMEPAGE TAB
   * ==================================================
   *
   * MOBILE
   * - content-width
   * - much smaller horizontal padding
   * - smaller font
   * - no artificial minimum width
   *
   * TABLET / DESKTOP
   * - previous dimensions remain unchanged
   */
  if (orientation === "top") {
    return (
      <span
        data-architect-tab
        data-architect-tab-orientation="top"
        data-active={
          isActive
            ? "true"
            : "false"
        }
        className="
          relative
          inline-flex

          h-12
          min-w-0
          w-auto
          shrink-0

          items-center
          justify-center

          px-3
          pt-1

          sm:px-4

          md:h-[3.25rem]
          md:min-w-[13rem]
          md:px-10

          lg:h-14
          lg:min-w-[14rem]
          lg:px-12
        "
        style={{
          color: textColor,
        }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 400 56"
          preserveAspectRatio="none"
          className="
            pointer-events-none
            absolute
            inset-0
            h-full
            w-full
            overflow-visible
          "
        >
          <path
            d={TAB_PATH}
            fill={backgroundColor}
          />
        </svg>

        <span
  className="
    relative
    z-[1]

    max-w-[7rem]
    whitespace-normal
    text-center

    font-[family-name:var(--font-editorial)]

    text-[0.8rem]
    leading-[1.05]

    md:max-w-none
    md:whitespace-nowrap
    md:text-xl

    lg:text-[1.6rem]
  "
>
  {architect.name}
</span>
      </span>
    );
  }

  /*
   * ==================================================
   * CASE PAGE SIDE TAB
   * ==================================================
   *
   * No responsive change here.
   *
   * The homepage mobile correction must not alter
   * the vertical case-page tabs.
   */
  return (
    <span
      data-architect-tab
      data-architect-tab-orientation="side"
      data-active={
        isActive
          ? "true"
          : "false"
      }
      className="
        relative

        flex
        h-[11rem]
        w-12
        shrink-0
        items-center
        justify-center

        md:h-[13rem]
        md:w-[3.25rem]

        lg:h-[14rem]
        lg:w-14
      "
      style={{
        color: textColor,
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 56 400"
        preserveAspectRatio="none"
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
          overflow-visible
        "
      >
        <g
          transform="
            translate(56 0)
            rotate(90)
          "
        >
          <path
            d={TAB_PATH}
            fill={backgroundColor}
          />
        </g>
      </svg>

     <span
  className="
    relative
    z-[1]

    max-h-[8.5rem]
    whitespace-normal
    text-center

    font-[family-name:var(--font-editorial)]
    text-lg
    leading-[1.05]

    [writing-mode:vertical-rl]

    md:max-h-[10rem]
    md:text-xl

    lg:max-h-[11rem]
    lg:text-[1.35rem]
  "
>
  {architect.name}
</span>
    </span>
  );
}