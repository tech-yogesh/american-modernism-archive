"use client";

import {
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

import { categories } from "@/data/categories";

import { useTransitionController } from "@/components/transitions/TransitionProvider";

import Folder from "./Folder";

gsap.registerPlugin(
  Flip,
  useGSAP,
);

/*
 * The final folder in categories.ts is always open.
 *
 * This remains data-driven:
 *
 * Reordering categories.ts automatically changes
 * which folder is permanently open.
 */
const LAST_FOLDER_ID =
  categories[
    categories.length - 1
  ]?.id ?? null;

export default function FolderStack() {
  const stackRef =
    useRef<HTMLDivElement>(null);

  /*
   * activeFolderId now represents ONLY the
   * additional/temporary open folder.
   *
   * The last folder does not need to live in this
   * state because it is permanently open.
   */
  const [
    activeFolderId,
    setActiveFolderId,
  ] = useState<string | null>(
    null,
  );

  const [
    activeArchitectSlug,
    setActiveArchitectSlug,
  ] = useState<string | null>(
    null,
  );

  const pendingFlipStateRef =
    useRef<ReturnType<
      typeof Flip.getState
    > | null>(null);

  const previousFolderIdRef =
    useRef<string | null>(
      null,
    );

  const animationRef =
    useRef<gsap.core.Timeline | null>(
      null,
    );

  const isAnimatingRef =
    useRef(false);

  const {
    isTransitioning,
    requestCaseTransition,
  } = useTransitionController();

  /*
   * Keep handler-created GSAP animations inside
   * this component's GSAP context.
   */
  const { contextSafe } = useGSAP(
    () => {
      return () => {
        animationRef.current?.kill();

        animationRef.current =
          null;

        pendingFlipStateRef.current =
          null;

        previousFolderIdRef.current =
          null;

        isAnimatingRef.current =
          false;
      };
    },
    {
      scope: stackRef,
    },
  );

  /*
   * ==================================================
   * CHANGE TEMPORARY OPEN FOLDER
   * ==================================================
   *
   * LAST_FOLDER_ID is NOT controlled here.
   * It remains open permanently.
   */
  const changeActiveFolder =
    contextSafe(
      (
        nextFolderId:
          | string
          | null,
      ) => {
        const root =
          stackRef.current;

        if (
          !root ||
          isAnimatingRef.current ||
          isTransitioning ||
          nextFolderId ===
            activeFolderId
        ) {
          return;
        }

        isAnimatingRef.current =
          true;

        /*
         * Capture layout before React renders
         * the next folder state.
         */
        const commitFolderChange =
          () => {
            const flipTargets =
              root.querySelectorAll<HTMLElement>(
                [
                  "[data-folder-shell]",
                  "[data-folder-panel]",
                ].join(","),
              );

            pendingFlipStateRef.current =
              Flip.getState(
                flipTargets,
              );

            previousFolderIdRef.current =
              activeFolderId;

            setActiveArchitectSlug(
              null,
            );

            setActiveFolderId(
              nextFolderId,
            );
          };

        /*
         * Only temporary folders retreat.
         *
         * IMPORTANT:
         * Never fade/close the last folder's content.
         * It is permanently open.
         */
        if (activeFolderId) {
          const currentContent =
            root.querySelector<HTMLElement>(
              `[data-folder-content="${activeFolderId}"]`,
            );

          if (currentContent) {
            gsap.to(
              currentContent,
              {
                autoAlpha: 0,
                y: 8,

                duration: 0.16,

                ease:
                  "power2.in",

                overwrite: true,

                onComplete:
                  commitFolderChange,
              },
            );

            return;
          }
        }

        commitFolderChange();
      },
    );

  /*
   * ==================================================
   * CLICK / TOUCH
   * ==================================================
   */
  const handleFolderToggle =
    (
      folderId: string,
    ) => {
      if (isTransitioning) {
        return;
      }

      /*
       * Last folder can never close.
       *
       * If another folder happens to be open,
       * clicking the last folder simply returns
       * to the permanent last-folder state.
       */
      if (
        folderId ===
        LAST_FOLDER_ID
      ) {
        if (activeFolderId) {
          changeActiveFolder(
            null,
          );
        }

        return;
      }

      /*
       * Clicking an already-open temporary folder
       * closes only that folder.
       *
       * The last folder remains open underneath.
       */
      if (
        activeFolderId ===
        folderId
      ) {
        changeActiveFolder(
          null,
        );

        return;
      }

      changeActiveFolder(
        folderId,
      );
    };

  /*
   * ==================================================
   * HOVER ENTER
   * ==================================================
   */
  const handleFolderHoverEnter =
    (
      folderId: string,
    ) => {
      if (isTransitioning) {
        return;
      }

      /*
       * Moving onto the permanent final folder
       * returns the stack to its resting state.
       */
      if (
        folderId ===
        LAST_FOLDER_ID
      ) {
        if (activeFolderId) {
          changeActiveFolder(
            null,
          );
        }

        return;
      }

      if (
        activeFolderId ===
        folderId
      ) {
        return;
      }

      changeActiveFolder(
        folderId,
      );
    };

  /*
   * ==================================================
   * HOVER LEAVE
   * ==================================================
   */
  const handleFolderHoverLeave =
    (
      folderId: string,
    ) => {
      if (isTransitioning) {
        return;
      }

      /*
       * The last folder never responds by closing.
       */
      if (
        folderId ===
        LAST_FOLDER_ID
      ) {
        return;
      }

      /*
       * Close only the temporary folder being left.
       *
       * The permanent last folder remains open.
       */
      if (
        activeFolderId !==
        folderId
      ) {
        return;
      }

      changeActiveFolder(
        null,
      );
    };

  /*
   * ==================================================
   * HOME → CASE
   * ==================================================
   */
  const handleArchitectSelect =
    (
      categoryId: string,
      slug: string,
      sourceElement: HTMLElement,
    ) => {
      if (isTransitioning) {
        return;
      }

      const category =
        categories.find(
          (item) =>
            item.id ===
            categoryId,
        );

      if (!category) {
        return;
      }

      const architect =
        category.architects.find(
          (item) =>
            item.slug === slug,
        );

      if (!architect) {
        return;
      }

      const folderPanel =
        sourceElement.closest<HTMLElement>(
          "[data-folder-panel]",
        );

      const sourceFolderElement =
        folderPanel?.querySelector<HTMLElement>(
          "[data-folder-hover-region]",
        );

      if (
        !sourceFolderElement
      ) {
        return;
      }

      setActiveArchitectSlug(
        slug,
      );

      /*
       * Visual component does not navigate directly.
       *
       * TransitionProvider remains the only routing
       * owner for deliberate animated navigation.
       */
      requestCaseTransition({
        slug:
          architect.slug,

        categoryId:
          category.id,

        label:
          architect.name,

        color:
          architect.tabColor ??
          category.color,

        textColor:
          architect.textColor ??
          "var(--color-text-primary)",

        type:
          "home-to-case",

        sourceElement,

        sourceFolderElement,

        scroll: true,
      });
    };

  /*
   * ==================================================
   * FLIP
   * ==================================================
   *
   * React has rendered the next static geometry.
   *
   * The permanent last folder stays expanded while
   * another folder expands/contracts above it.
   */
  useGSAP(
    () => {
      const root =
        stackRef.current;

      const previousState =
        pendingFlipStateRef.current;

      if (
        !root ||
        !previousState
      ) {
        return;
      }

      animationRef.current?.kill();

      /*
       * Only activeFolderId represents a newly-opened
       * temporary folder.
       *
       * When it becomes null, there is no new content
       * to reveal because the last folder's content was
       * already visible the entire time.
       */
      const activeContent =
        activeFolderId
          ? root.querySelector<HTMLElement>(
              `[data-folder-content="${activeFolderId}"]`,
            )
          : null;

      const archiveItems =
        activeContent
          ? Array.from(
              activeContent.querySelectorAll<HTMLElement>(
                "[data-archive-item]",
              ),
            )
          : [];

      const timeline =
        Flip.from(
          previousState,
          {
            duration: 0.72,

            ease:
              "power3.inOut",

            nested: true,

            absolute: false,

            paused: true,
          },
        );

      animationRef.current =
        timeline;

      /*
       * Reveal only newly opened temporary content.
       *
       * Permanent last-folder content is never
       * hidden/revealed during these interactions.
       */
      if (activeContent) {
        timeline.fromTo(
          activeContent,
          {
            autoAlpha: 1,

            y: -6,

            clipPath:
              "inset(0 0 100% 0)",
          },
          {
            autoAlpha: 1,

            y: 0,

            clipPath:
              "inset(0 0 0% 0)",

            duration: 0.46,

            ease:
              "power2.out",
          },
          0.14,
        );

        if (
          archiveItems.length >
          0
        ) {
          timeline.fromTo(
            archiveItems,
            {
              autoAlpha: 0,
              y: 14,
            },
            {
              autoAlpha: 1,
              y: 0,

              duration: 0.38,

              stagger: 0.055,

              ease:
                "power2.out",
            },
            0.25,
          );
        }
      }

      timeline.eventCallback(
        "onComplete",
        () => {
          if (activeContent) {
            gsap.set(
              activeContent,
              {
                clearProps:
                  "opacity,visibility,transform,clipPath",
              },
            );

            if (
              archiveItems.length >
              0
            ) {
              gsap.set(
                archiveItems,
                {
                  clearProps:
                    "opacity,visibility,transform",
                },
              );
            }
          }

          const previousFolderId =
            previousFolderIdRef.current;

          /*
           * The previous temporary folder may already
           * have been removed from the DOM after React
           * rendered its closed state. If it still
           * exists, remove temporary GSAP styles.
           */
          if (
            previousFolderId &&
            previousFolderId !==
              activeFolderId
          ) {
            const previousContent =
              root.querySelector<HTMLElement>(
                `[data-folder-content="${previousFolderId}"]`,
              );

            if (
              previousContent
            ) {
              gsap.set(
                previousContent,
                {
                  clearProps:
                    "opacity,visibility,transform,clipPath",
                },
              );
            }
          }

          pendingFlipStateRef.current =
            null;

          previousFolderIdRef.current =
            null;

          animationRef.current =
            null;

          isAnimatingRef.current =
            false;
        },
      );

      timeline.play(0);
    },
    {
      scope: stackRef,

      dependencies: [
        activeFolderId,
      ],

      revertOnUpdate: true,
    },
  );

  return (
    <section
      aria-label="Architecture categories"
      className="
        px-[var(--page-gutter)]
        
      "
    >
      <div
        ref={stackRef}
        className="relative"
      >
        {categories.map(
          (
            category,
            index,
          ) => {
            const isLastFolder =
              category.id ===
              LAST_FOLDER_ID;

            const isTemporaryOpen =
              activeFolderId ===
              category.id;

            /*
             * KEY RULE:
             *
             * Last folder = ALWAYS open.
             *
             * Any other folder may additionally
             * become open through hover/click.
             */
            const isOpen =
              isLastFolder ||
              isTemporaryOpen;

            return (
              <div
                key={
                  category.id
                }
                data-folder-shell
                data-folder-id={
                  category.id
                }
                className={`
                  relative

                  ${
                    index === 0
                      ? ""
                      : "-mt-12 md:-mt-[3.25rem] lg:-mt-14"
                  }
                `}
                style={{
                  /*
                   * Temporary folder is front-most.
                   *
                   * Permanent last folder stays above
                   * ordinary closed folders.
                   */
                  zIndex:
                    isTemporaryOpen
                      ? categories.length +
                        3
                      : isLastFolder
                        ? categories.length +
                          2
                        : index + 1,
                }}
              >
                <Folder
                  id={
                    category.id
                  }
                  name={
                    category.name
                  }
                  color={
                    category.color
                  }
                  architects={
                    category.architects
                  }
                  archiveItems={
                    category.archiveItems
                  }
                  isOpen={
                    isOpen
                  }
                  activeArchitectSlug={
                    activeArchitectSlug
                  }
                  onToggle={() =>
                    handleFolderToggle(
                      category.id,
                    )
                  }
                  onHoverEnter={() =>
                    handleFolderHoverEnter(
                      category.id,
                    )
                  }
                  onHoverLeave={() =>
                    handleFolderHoverLeave(
                      category.id,
                    )
                  }
                  onArchitectSelect={(
                    slug,
                    sourceElement,
                  ) =>
                    handleArchitectSelect(
                      category.id,
                      slug,
                      sourceElement,
                    )
                  }
                />
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}