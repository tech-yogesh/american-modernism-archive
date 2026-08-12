"use client";

import type { MouseEvent } from "react";

import Link from "next/link";

import ArchitectTab from "@/components/navigation/ArchitectTab";
import { useTransitionController } from "@/components/transitions/TransitionProvider";

import type { ArchitectSummary } from "@/types/content";

interface CaseSideTabsProps {
  architects: ArchitectSummary[];
  activeSlug: string;
  categoryId: string;
  fallbackColor: string;
}

export default function CaseSideTabs({
  architects,
  activeSlug,
  categoryId,
  fallbackColor,
}: CaseSideTabsProps) {
  const {
    isTransitioning,
    requestCaseTransition,
  } = useTransitionController();

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    architect: ArchitectSummary,
  ) => {
    /*
     * Preserve normal browser link behavior.
     */
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (
      architect.slug === activeSlug ||
      isTransitioning
    ) {
      return;
    }

    requestCaseTransition({
      slug: architect.slug,

      categoryId,

      color:
        architect.tabColor ??
        fallbackColor,

      textColor:
        architect.textColor ??
        "var(--color-text-primary)",

      label: architect.name,

      type: "case-to-case",

      sourceElement:
        event.currentTarget,

      scroll: false,
    });
  };

  return (
    <nav
      aria-label="Architects in this category"
      data-case-side-tabs
     className="
  absolute
  left-full
  right-auto
  top-4
  z-[3]

  flex
  flex-col
  items-start
  gap-1

  md:top-6
"
    >
      {architects.map(
        (architect, index) => {
          const isActive =
            architect.slug ===
            activeSlug;

          return (
            <Link
              key={architect.slug}
              href={`/cases/${architect.slug}`}
              aria-current={
                isActive
                  ? "page"
                  : undefined
              }
              data-case-side-tab
              data-architect-slug={
                architect.slug
              }
              onClick={(event) =>
                handleNavigation(
                  event,
                  architect,
                )
              }
              className={`
                relative
                block

                /*
                 * Active tab movement is safe on
                 * mobile/desktop because those have
                 * reserved external rails.
                 *
                 * On tablet the tabs live inside the
                 * folder, so don't push them farther
                 * toward the viewport edge.
                 */
                ${
                  isActive
                    ? "translate-x-1 md:translate-x-0 lg:translate-x-1"
                    : ""
                }

                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-[var(--color-text-primary)]
              `}
              style={{
                zIndex: isActive
                  ? architects.length + 10
                  : architects.length - index,
              }}
            >
              <ArchitectTab
                architect={architect}
                fallbackColor={fallbackColor}
                orientation="side"
                isActive={isActive}
              />
            </Link>
          );
        },
      )}
    </nav>
  );
}