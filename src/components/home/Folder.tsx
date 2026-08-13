import type {
  PointerEvent as ReactPointerEvent,
} from "react";

import ArchitectTab from "@/components/navigation/ArchitectTab";

import type {
  ArchitectSummary,
  ArchiveItem,
} from "@/types/content";

interface FolderProps {
  id: string;
  name: string;
  color: string;
  architects: ArchitectSummary[];
  archiveItems: ArchiveItem[];
  isOpen: boolean;
  activeArchitectSlug: string | null;
  hoveredArchitectSlug: string | null;

  onToggle: () => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  onArchitectHoverChange: (slug: string | null) => void;

  onArchitectSelect: (
    slug: string,
    sourceElement: HTMLElement,
  ) => void;
}

export default function Folder({
  id,
  name,
  color,
  architects,
  archiveItems,
  isOpen,
  activeArchitectSlug,
  hoveredArchitectSlug,
  onToggle,
  onHoverEnter,
  onHoverLeave,
  onArchitectHoverChange,
  onArchitectSelect,
}: FolderProps) {
  const hoveredArchitect =
    architects.find(
      (architect) =>
        architect.slug ===
        hoveredArchitectSlug,
    ) ?? null;

  const hoveredArchitectIndex =
    hoveredArchitect
      ? architects.findIndex(
          (architect) =>
            architect.slug ===
            hoveredArchitect.slug,
        )
      : -1;

  /*
   * The first architect already shares the category folder's
   * front layer/color, so the reference does not introduce a
   * separate hover sheet for it.
   *
   * Only the second/third/etc. architect tabs reveal an
   * additional physical layer.
   */
  const hasArchitectHoverLayer =
    hoveredArchitectIndex > 0;

  const hoverStripColor =
    hoveredArchitect?.tabColor ??
    color;

  const handlePointerEnter = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (
      event.pointerType !== "mouse"
    ) {
      return;
    }

    onHoverEnter();
  };

  const handlePointerLeave = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const panel =
      event.currentTarget.closest(
        "[data-folder-panel]",
      );

    const nextTarget =
      event.relatedTarget;

    if (
      panel &&
      nextTarget instanceof Node &&
      panel.contains(nextTarget)
    ) {
      return;
    }

    onHoverLeave();
  };

  return (
    <article
      data-folder-panel
      className={`
        pointer-events-none
        relative
        overflow-visible

        ${
          isOpen
            ? "h-[26rem] md:h-[30rem] lg:h-[34rem]"
            : "h-[7rem] md:h-[7.5rem] lg:h-[8rem]"
        }
      `}
    >
      {/* Architect tabs */}
      <div
        data-architect-tabs={id}
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-[5]

          flex
          h-12
          items-end

          gap-0

          overflow-visible

          md:h-[3.25rem]
          md:gap-4

          lg:h-14
          lg:gap-5
        "
      >
        {architects.map(
          (
            architect,
            index,
          ) => {
            const isActive =
              activeArchitectSlug ===
              architect.slug;

            const isHovered =
              hoveredArchitectSlug ===
              architect.slug;

            return (
              <button
                key={
                  architect.slug
                }
                type="button"
                data-architect-button
                data-architect-tab
                data-architect-slug={
                  architect.slug
                }
                aria-label={`Open ${architect.name}`}
                aria-pressed={
                  isActive
                }
                onClick={(event) =>
                  onArchitectSelect(
                    architect.slug,
                    event.currentTarget,
                  )
                }
                onMouseEnter={() =>
                  onArchitectHoverChange(
                    architect.slug,
                  )
                }
                onMouseLeave={() =>
                  onArchitectHoverChange(null)
                }
                className={`
                  pointer-events-auto
                  relative

                  -ml-1
                  first:ml-0

                  h-full

                  cursor-pointer
                  border-0
                  bg-transparent
                  p-0

                  transition-transform
                  duration-300
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  md:ml-0

                  ${
                    hasArchitectHoverLayer &&
                    index <
                      hoveredArchitectIndex
                      ? "translate-y-4"
                      : "translate-y-0"
                  }
                `}
                style={{
                  zIndex: isActive
                    ? architects.length +
                      10
                    : architects.length -
                      index,
                }}
              >
                <ArchitectTab
                  architect={
                    architect
                  }
                  fallbackColor={
                    color
                  }
                  orientation="top"
                  isActive={
                    isActive
                  }
                />
              </button>
            );
          },
        )}
      </div>

      {/*
        Responsive architect hover plane.

        This mirrors the reference interaction on mobile, tablet,
        and desktop widths when hover input is available:

        - first architect: no visible layer change
        - later architect: reveal a 16px full-width sheet in that tab color
        - tabs BEFORE the hovered architect move down with the main folder
        - hovered tab and tabs AFTER it stay on the upper sheet
        - the sheet sits behind every tab, preserving the fixed tab order

        The left curve of the lowered first tab naturally exposes the small
        colored sliver at the extreme left seen in the reference.
      */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          left-0
          right-0.5
          top-12
          z-[3]

          block
          overflow-hidden
          rounded-tr-[0.75rem]

          transition-[height,opacity]
          duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]

          md:top-[3.25rem]

          lg:top-14

          ${
            hasArchitectHoverLayer
              ? "h-4 opacity-100"
              : "h-0 opacity-0"
          }
        `}
        style={{
          backgroundColor:
            hoverStripColor,
        }}
      />


      {/* Folder body / stable hover region */}
      <div
        data-folder-hover-region
        onPointerEnter={
          handlePointerEnter
        }
        onPointerLeave={
          handlePointerLeave
        }
        className={`
          pointer-events-auto
          absolute
          inset-x-0
          bottom-0
          top-12
          z-[1]

          overflow-hidden
          rounded-[0.25rem]

          transition-[top]
          duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            hasArchitectHoverLayer
              ? "top-16 md:top-[4.25rem] lg:top-[4.5rem]"
              : "top-12 md:top-[3.25rem] lg:top-14"
          }
        `}
        style={{
          backgroundColor: color,
        }}
      >
        {/* Click fallback */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`folder-content-${id}`}
          aria-label={`${isOpen ? "Close" : "Open"} ${name}`}
          className="
            absolute
            inset-0
            z-[1]

            cursor-pointer
            border-0
            bg-transparent
            p-0
          "
        />

        {/* Category label */}
        <div
          className="
            pointer-events-none
            absolute

            right-5
            top-3
            z-[5]

            flex
            items-center
            gap-3

            text-right

            md:right-7
            md:top-4

            lg:right-10
          "
        >
          <span
            className="
              font-[family-name:var(--font-utility)]

              text-[0.65rem]
              tracking-[0.01em]

              text-[var(--color-text-primary)]

              md:text-xs
              lg:text-sm
            "
          >
            {name}
          </span>

          <span
            aria-hidden="true"
            className="
              inline-block
              text-base
              leading-none
              text-[var(--color-text-secondary)]
            "
          >
            {isOpen
              ? "⌄"
              : "‹"}
          </span>
        </div>

        {/* Folder editorial text */}
        {isOpen && (
          <div
            id={`folder-content-${id}`}
            data-folder-content={
              id
            }
            className="
              pointer-events-auto
              relative
              z-[2]

              h-full

              px-5
              pb-6
              pt-20

              md:px-7
              md:pb-7
              md:pt-24

              lg:px-10
              lg:pb-10
            "
          >
            <div
              className="
                flex
                h-full
                items-start
              "
            >
              {archiveItems.map(
                (item) => (
                  <p
                    key={item.id}
                    data-archive-item
                    className="
                      max-w-[38rem]

                      text-justify

                      font-[family-name:var(--font-editorial)]

                      text-base
                      leading-[1.5]

                      text-[var(--color-text-primary)]

                      md:text-lg
                      md:leading-[1.5]

                      lg:text-xl
                      lg:leading-[1.5]
                    "
                  >
                    {item.text}
                  </p>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}