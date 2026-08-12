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

  onToggle: () => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;

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
  onToggle,
  onHoverEnter,
  onHoverLeave,
  onArchitectSelect,
}: FolderProps) {
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
          z-[2]

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

            return (
              <button
                key={
                  architect.slug
                }
                type="button"
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
                className="
                  pointer-events-auto
                  relative

                  -ml-1
                  first:ml-0

                  h-full

                  cursor-pointer
                  border-0
                  bg-transparent
                  p-0

                  md:ml-0
                "
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

      {/* Folder body / stable hover region */}
      <div
        data-folder-hover-region
        onPointerEnter={
          handlePointerEnter
        }
        onPointerLeave={
          handlePointerLeave
        }
        className="
          pointer-events-auto
          absolute
          inset-x-0
          bottom-0
          top-12
          z-[1]

          overflow-hidden
          rounded-[0.25rem]

          md:top-[3.25rem]

          lg:top-14
        "
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