"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useTransitionController } from "@/components/transitions/TransitionProvider";

import type {
  ArchitectNavigationItem,
} from "@/types/content";

gsap.registerPlugin(
  ScrollTrigger,
  useGSAP,
);

const INITIAL_HANDOFF_PROGRESS = 0.7;

const REQUIRED_EXTRA_SCROLL_DELTA = 850;

const MAX_DELTA_PER_EVENT = 120;

const BOTTOM_TOLERANCE = 4;

const NEXT_ASIDE_START_PROGRESS = 0.3;

const KEEP_SCROLLING_START_PROGRESS = 0.95;

type AsidePhase =
  | "hidden"
  | "next-preview"
  | "keep-scrolling";

const CATEGORY_LABELS: Record<string, string> = {
  "organic-early-modernism":
    "Organic & Early Modernism",

  expressive:
    "Expressive",

  "monumental-modernism":
    "Monumental Modernism",

  "contextual-transitional":
    "Contextual & Transitional",
};

type NextArchitectSummary = Pick<
  ArchitectNavigationItem,
  | "name"
  | "slug"
  | "categoryId"
  | "tabColor"
  | "textColor"
>;

interface NextCaseHandoffProps {
  nextArchitect: NextArchitectSummary;
}

export default function NextCaseHandoff({
  nextArchitect,
}: NextCaseHandoffProps) {
  const rootRef =
    useRef<HTMLElement>(null);

  const [
    asidePhase,
    setAsidePhase,
  ] = useState<AsidePhase>("hidden");

  const nameRef =
    useRef<HTMLAnchorElement>(null);

  const progressFillRef =
    useRef<HTMLDivElement>(null);

  const hasTriggeredRef =
    useRef(false);

  const isArmedRef =
    useRef(false);

  const hasReachedBottomRef =
    useRef(false);

  const extraScrollDeltaRef =
    useRef(0);

  const {
    isTransitioning,
    requestCaseTransition,
  } = useTransitionController();

  const isTransitioningRef =
    useRef(isTransitioning);

  useEffect(() => {
    isTransitioningRef.current =
      isTransitioning;
  }, [isTransitioning]);

  const requestNextCase =
    useCallback(
      (
        sourceElement: HTMLElement,
      ) => {
        if (
          hasTriggeredRef.current ||
          isTransitioningRef.current
        ) {
          return;
        }

        hasTriggeredRef.current =
          true;

        isArmedRef.current =
          false;

        requestCaseTransition({
          slug:
            nextArchitect.slug,

          categoryId:
            nextArchitect.categoryId,

          label:
            nextArchitect.name,

          color:
            nextArchitect.tabColor ??
            "var(--color-bg)",

          textColor:
            nextArchitect.textColor ??
            "var(--color-text-primary)",

          type:
            "case-to-case-scroll",

          sourceElement,

          scroll: true,
        });
      },
      [
        nextArchitect.slug,
        nextArchitect.name,
        nextArchitect.categoryId,
        nextArchitect.tabColor,
        nextArchitect.textColor,
        requestCaseTransition,
      ],
    );

  const handleNavigationClick = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
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

    requestNextCase(
      event.currentTarget,
    );
  };

  useEffect(() => {
    let frameId: number | null = null;

    const updateAsidePhase = () => {
      frameId = null;

      const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        maxScroll > 0
          ? Math.min(
              1,
              Math.max(
                0,
                window.scrollY / maxScroll,
              ),
            )
          : 0;

      const nextPhase: AsidePhase =
        progress >=
        KEEP_SCROLLING_START_PROGRESS
          ? "keep-scrolling"
          : progress >=
              NEXT_ASIDE_START_PROGRESS
            ? "next-preview"
            : "hidden";

      setAsidePhase(
        (currentPhase) =>
          currentPhase === nextPhase
            ? currentPhase
            : nextPhase,
      );
    };

    const scheduleUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId =
        window.requestAnimationFrame(
          updateAsidePhase,
        );
    };

    updateAsidePhase();

    window.addEventListener(
      "scroll",
      scheduleUpdate,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      scheduleUpdate,
    );

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(
          frameId,
        );
      }

      window.removeEventListener(
        "scroll",
        scheduleUpdate,
      );

      window.removeEventListener(
        "resize",
        scheduleUpdate,
      );
    };
  }, [nextArchitect.slug]);

  useGSAP(
    () => {
      const root =
        rootRef.current;

      if (!root) {
        return;
      }

      hasTriggeredRef.current =
        false;

      isArmedRef.current =
        false;

      hasReachedBottomRef.current =
        false;

      extraScrollDeltaRef.current =
        0;

      const media =
        gsap.matchMedia();

      /*
       * Desktop only.
       *
       * Mobile + tablet use the simple Next button.
       *
       * Tailwind's default lg breakpoint = 1024px.
       */
      media.add(
        "(min-width: 1024px)",
        () => {
          const name =
            nameRef.current;

          const progressFill =
            progressFillRef.current;

          if (
            !name ||
            !progressFill
          ) {
            return;
          }

          /*
           * --------------------------------------------
           * INITIAL PRESENTATION
           * --------------------------------------------
           */

          gsap.set(
            name,
            {
              autoAlpha: 0,
              y: 24,
            },
          );

          gsap.set(
            progressFill,
            {
              scaleX: 0,

              transformOrigin:
                "left center",
            },
          );

          /*
           * --------------------------------------------
           * REVEAL
           * --------------------------------------------
           */

          const revealTimeline =
            gsap.timeline({
              paused: true,
            });

          revealTimeline.to(
            name,
            {
              autoAlpha: 1,
              y: 0,

              duration: 0.5,

              ease:
                "power3.out",
            },
            0,
          );

          /*
           * ScrollTrigger only controls whether
           * the desktop handoff is active.
           */
          const visibilityTrigger =
            ScrollTrigger.create({
              trigger: root,

              start:
                "top bottom",

              end:
                "bottom top",

              onEnter: () => {
                if (
                  hasTriggeredRef.current
                ) {
                  return;
                }

                isArmedRef.current =
                  true;

                revealTimeline.play();
              },

              onEnterBack: () => {
                if (
                  hasTriggeredRef.current
                ) {
                  return;
                }

                isArmedRef.current =
                  true;

                revealTimeline.play();
              },

              onLeaveBack: () => {
                if (
                  hasTriggeredRef.current
                ) {
                  return;
                }

                isArmedRef.current =
                  false;

                hasReachedBottomRef.current =
                  false;

                extraScrollDeltaRef.current =
                  0;

                gsap.to(
                  progressFill,
                  {
                    scaleX: 0,

                    duration: 0.2,

                    ease:
                      "power2.out",
                  },
                );

                revealTimeline.reverse();
              },
            });

          /*
           * --------------------------------------------
           * DOCUMENT BOTTOM
           * --------------------------------------------
           */

          const isAtDocumentBottom =
            () => {
              const documentHeight =
                document.documentElement
                  .scrollHeight;

              return (
                window.scrollY +
                  window.innerHeight >=
                documentHeight -
                  BOTTOM_TOLERANCE
              );
            };

          const handleScroll =
            () => {
              if (
                !isArmedRef.current ||
                hasTriggeredRef.current
              ) {
                return;
              }

              const atBottom =
                isAtDocumentBottom();

              if (!atBottom) {
                if (
                  hasReachedBottomRef.current
                ) {
                  extraScrollDeltaRef.current =
                    0;

                  gsap.to(
                    progressFill,
                    {
                      scaleX: 0,

                      duration: 0.2,

                      ease:
                        "power2.out",
                    },
                  );
                }

                hasReachedBottomRef.current =
                  false;

                return;
              }

              if (
                hasReachedBottomRef.current
              ) {
                return;
              }

              hasReachedBottomRef.current =
                true;

              extraScrollDeltaRef.current =
                0;

              /*
               * Reaching the physical bottom:
               *
               * progress becomes 70%.
               */
              gsap.to(
                progressFill,
                {
                  scaleX:
                    INITIAL_HANDOFF_PROGRESS,

                  duration: 0.26,

                  ease:
                    "power2.out",
                },
              );
            };

          /*
           * --------------------------------------------
           * CONTINUED DESKTOP SCROLL INTENT
           * --------------------------------------------
           */

          const handleWheel = (
            event: WheelEvent,
          ) => {
            if (
              !isArmedRef.current ||
              !hasReachedBottomRef.current ||
              hasTriggeredRef.current ||
              isTransitioningRef.current
            ) {
              return;
            }

            /*
             * Only downward intent counts.
             */
            if (
              event.deltaY <= 0
            ) {
              return;
            }

            event.preventDefault();

            const acceptedDelta =
              Math.min(
                event.deltaY,
                MAX_DELTA_PER_EVENT,
              );

            extraScrollDeltaRef.current =
              Math.min(
                REQUIRED_EXTRA_SCROLL_DELTA,

                extraScrollDeltaRef.current +
                  acceptedDelta,
              );

            const intentionalProgress =
              extraScrollDeltaRef.current /
              REQUIRED_EXTRA_SCROLL_DELTA;

            /*
             * Convert:
             *
             * 0 → 1
             *
             * into:
             *
             * 70% → 100%
             */
            const visualProgress =
              INITIAL_HANDOFF_PROGRESS +
              intentionalProgress *
                (
                  1 -
                  INITIAL_HANDOFF_PROGRESS
                );

            gsap.set(
              progressFill,
              {
                scaleX:
                  visualProgress,
              },
            );

            if (
              intentionalProgress < 1
            ) {
              return;
            }

            gsap.set(
              progressFill,
              {
                scaleX: 1,
              },
            );

            requestNextCase(
              name,
            );
          };

          window.addEventListener(
            "scroll",
            handleScroll,
            {
              passive: true,
            },
          );

          window.addEventListener(
            "wheel",
            handleWheel,
            {
              passive: false,
            },
          );

          handleScroll();

          return () => {
            visibilityTrigger.kill();

            revealTimeline.kill();

            window.removeEventListener(
              "scroll",
              handleScroll,
            );

            window.removeEventListener(
              "wheel",
              handleWheel,
            );
          };
        },
      );

      return () => {
        media.revert();
      };
    },
    {
      scope: rootRef,

      dependencies: [
        nextArchitect.slug,
        requestNextCase,
      ],

      revertOnUpdate: true,
    },
  );

  const nextFileColor =
    nextArchitect.tabColor ??
    "var(--color-bg)";

  const nextTextColor =
    nextArchitect.textColor ??
    "var(--color-text-primary)";

  const nextCategoryLabel =
    CATEGORY_LABELS[
      nextArchitect.categoryId
    ] ?? nextArchitect.categoryId;

  return (
    <section
      ref={rootRef}
      data-next-case-handoff
      aria-label={`Continue to ${nextArchitect.name}`}
      className="
        relative
        bg-[var(--color-bg)]
      "
    >
      {/*
        ===============================================
        MOBILE + TABLET
        ===============================================

        < 1024px

        No architect preview.
        No Keep Scrolling control.
        No wheel listener.

        Compact yellow Next button only.
      */}
      <div
        className="
          flex
          justify-end

          px-[var(--page-gutter)]
          py-6

          lg:hidden
        "
      >
        <Link
          href={`/cases/${nextArchitect.slug}`}
          onClick={
            handleNavigationClick
          }
          className="
            inline-flex
            min-h-11
            items-center
            justify-center

            rounded-full

            bg-[var(--color-tab-yellow)]

            px-6
            py-2.5

            font-[family-name:var(--font-utility)]
            text-sm
            uppercase
            tracking-[0.08em]

            text-black

            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[var(--color-tab-yellow)]
          "
        >
          Next
        </Link>
      </div>

      {/*
        ===============================================
        DESKTOP
        ===============================================

        >= 1024px
      */}
      <div
        className="
          hidden

          lg:block
          lg:px-[var(--page-gutter)]
        "
      >
        <div
          className="
            grid

            h-[0svh]
            min-h-[10rem]
            max-h-[32rem]

            grid-cols-[minmax(0,1fr)_clamp(17rem,22vw,23rem)]
          "
        >
          {/* Next architect surface */}
          <div
            className="
              relative
              flex
              h-full
              items-center
              overflow-hidden

              rounded-[0.25rem]

              px-10
              py-6
            "
            style={{
              backgroundColor:
                nextFileColor,

              color:
                nextTextColor,
            }}
          >
            <Link
              ref={nameRef}
              href={`/cases/${nextArchitect.slug}`}
              onClick={
                handleNavigationClick
              }
              data-next-case-name
              className="
                inline-block
                max-w-[13ch]

                font-[family-name:var(--font-display)]
                text-[clamp(2.8rem,5vw,6rem)]
                font-bold
                uppercase
                leading-[0.88]
                tracking-[-0.05em]

                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-current
              "
            >
              {nextArchitect.name}
            </Link>
          </div>

          {/*
            Desktop aside.

            The existing wide next-architect surface on the
            left stays exactly as it is.

            This right-side rail is fixed on desktop:

            < 30%   -> hidden
            30-95%  -> compact architect card + yellow Next
            >= 95%  -> Keep scrolling
          */}
          <aside
            className="
              pointer-events-none
              fixed
              right-[var(--page-gutter)]
              bottom-8
              z-[30]

              hidden
              w-[clamp(17rem,22vw,23rem)]

              lg:block
            "
          >
            {/* 30% -> 95%: compact next architect preview */}
            <div
              aria-hidden={
                asidePhase !==
                "next-preview"
              }
              className={`
                flex
                flex-col
                items-end
                gap-5

                transition-[opacity,transform]
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]

                ${
                  asidePhase ===
                  "next-preview"
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-5 opacity-0"
                }
              `}
            >
              <Link
                href={`/cases/${nextArchitect.slug}`}
                onClick={
                  handleNavigationClick
                }
                tabIndex={
                  asidePhase ===
                  "next-preview"
                    ? 0
                    : -1
                }
                className="
                  flex
                  min-h-[14rem]
                  w-80
                  flex-col
                  justify-between

                  rounded-[1.55rem]

                  px-7
                  py-7

                  transition-transform
                  duration-300
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  hover:-translate-y-1

                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-current
                "
                style={{
                  backgroundColor:
                    nextFileColor,

                  color:
                    nextTextColor,
                }}
              >
                <span
                  className="
                    max-w-[13ch]

                    font-[family-name:var(--font-editorial)]
                    text-[clamp(1.25rem,1.7vw,1.75rem)]
                    leading-[1.1]
                  "
                >
                  {nextArchitect.name}
                </span>

                <span
                  className="
                    font-[family-name:var(--font-utility)]
                    text-sm
                    tracking-[0.01em]
                  "
                >
                  {nextCategoryLabel}
                </span>
              </Link>

              <Link
                href={`/cases/${nextArchitect.slug}`}
                onClick={
                  handleNavigationClick
                }
                tabIndex={
                  asidePhase ===
                  "next-preview"
                    ? 0
                    : -1
                }
                className="
                  inline-flex
                  min-h-[4.4rem]
                  w-[73%]
                  items-center
                  justify-center
                  gap-3

                  rounded-full

                  bg-[var(--color-tab-yellow)]

                  px-7
                  py-3

                  font-[family-name:var(--font-utility)]
                  text-lg
                  text-black

                  transition-transform
                  duration-300
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  hover:-translate-y-1

                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-3
                  focus-visible:outline-[var(--color-tab-yellow)]
                "
              >
                <span>Next</span>

                <span
                  aria-hidden="true"
                  className="text-xl"
                >
                  →
                </span>
              </Link>
            </div>

            {/* >= 95%: replace preview with Keep scrolling */}
            <div
              aria-hidden={
                asidePhase !==
                "keep-scrolling"
              }
              className={`
                pointer-events-none
                absolute
                right-0
                bottom-0

                w-full
                max-w-[17rem]

                transition-[opacity,transform]
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]

                ${
                  asidePhase ===
                  "keep-scrolling"
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }
              `}
            >
              <div
                className="
                  relative
                  w-full
                  overflow-hidden

                  rounded-[1.35rem]

                  bg-[var(--color-tab-yellow)]
                "
              >
                <div
                  ref={
                    progressFillRef
                  }
                  className="
                    absolute
                    inset-0
                    bg-white
                  "
                />

                <span
                  className="
                    relative
                    z-[1]
                    block

                    px-7
                    py-4

                    text-center
                    font-[family-name:var(--font-utility)]
                    text-base
                    leading-[1.2]
                    text-black
                  "
                >
                  Keep scrolling
                  <br />
                  for the next page
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}