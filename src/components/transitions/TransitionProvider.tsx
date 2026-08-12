"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import gsap from "gsap";
import { Flip } from "gsap/Flip";

import TransitionLayer from "./TransitionLayer";

gsap.registerPlugin(Flip);

export type TransitionPhase =
  | "idle"
  | "leaving"
  | "navigating"
  | "entering";

export type RouteTransitionType =
  | "home-to-case"
  | "case-to-case"
  | "case-to-case-scroll";

export interface TransitionGeometry {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

export interface TransitionGeometrySnapshot {
  tab: TransitionGeometry | null;
  folder: TransitionGeometry | null;
}

export interface RouteTransitionState {
  phase: TransitionPhase;

  type: RouteTransitionType | null;

  destinationSlug: string | null;

  categoryId: string | null;

  color: string | null;

  textColor: string | null;

  label: string | null;

  sourceFolderColor: string | null;

  sourceGeometry:
    | TransitionGeometrySnapshot
    | null;

  targetGeometry:
    | TransitionGeometrySnapshot
    | null;
}

interface RequestCaseTransitionOptions {
  slug: string;

  categoryId: string;

  color: string;

  textColor?: string;

  label?: string;

  type: RouteTransitionType;

  sourceElement?: HTMLElement | null;

  sourceFolderElement?: HTMLElement | null;

  scroll?: boolean;
}

interface PendingTransition {
  slug: string;

  categoryId: string;

  color: string;

  textColor: string;

  label: string;

  type: RouteTransitionType;

  scroll: boolean;

  sourceFolderColor: string;

  sourceGeometry: TransitionGeometrySnapshot;
}

interface TransitionContextValue {
  state: RouteTransitionState;

  isTransitioning: boolean;

  requestCaseTransition: (
    options: RequestCaseTransitionOptions,
  ) => void;
}

interface TransitionProviderProps {
  children: ReactNode;
}

interface DocumentLockState {
  overflow: string;
  paddingRight: string;
}

const INITIAL_STATE: RouteTransitionState = {
  phase: "idle",

  type: null,

  destinationSlug: null,

  categoryId: null,

  color: null,

  textColor: null,

  label: null,

  sourceFolderColor: null,

  sourceGeometry: null,

  targetGeometry: null,
};

const TransitionContext =
  createContext<TransitionContextValue | null>(
    null,
  );

function getGeometry(
  element?: HTMLElement | null,
): TransitionGeometry | null {
  if (!element) {
    return null;
  }

  const rect =
    element.getBoundingClientRect();

  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

function getFlipFitVars(
  element: HTMLElement,
  target: HTMLElement,
): gsap.TweenVars {
  return Flip.fit(
    element,
    target,
    {
      absolute: true,
      getVars: true,
    },
  ) as gsap.TweenVars;
}

function resolveCssColor(
  value: string,
): string {
  if (
    typeof document ===
    "undefined"
  ) {
    return value;
  }

  const probe =
    document.createElement(
      "span",
    );

  probe.style.position =
    "fixed";

  probe.style.visibility =
    "hidden";

  probe.style.pointerEvents =
    "none";

  probe.style.color =
    value;

  document.body.appendChild(
    probe,
  );

  const resolvedColor =
    window.getComputedStyle(
      probe,
    ).color;

  probe.remove();

  return (
    resolvedColor ||
    value
  );
}

export default function TransitionProvider({
  children,
}: TransitionProviderProps) {
  const router =
    useRouter();

  const pathname =
    usePathname();

  const [state, setState] =
    useState<RouteTransitionState>(
      INITIAL_STATE,
    );

  const stateRef =
    useRef<RouteTransitionState>(
      INITIAL_STATE,
    );

  /*
   * Only deliberate navigation through
   * requestCaseTransition() creates this.
   */
  const pendingTransitionRef =
    useRef<PendingTransition | null>(
      null,
    );

  const timelineRef =
    useRef<gsap.core.Timeline | null>(
      null,
    );

  const enterFrameRef =
    useRef<number | null>(
      null,
    );

  const prefersReducedMotionRef =
    useRef(false);

  /*
   * Browser Back / Forward must remain separate
   * from deliberate animated navigation.
   */
  const browserNavigationRef =
    useRef(false);

  /*
   * ------------------------------------------------
   * HOME → CASE TEMPORARY DOM
   * ------------------------------------------------
   */

  const transitionSurfaceRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const transitionTabRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const transitionLabelRef =
    useRef<HTMLSpanElement | null>(
      null,
    );

  const coverSurfaceTargetRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const coverTabTargetRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  /*
   * ------------------------------------------------
   * DOCUMENT LOCK
   * ------------------------------------------------
   */

  const documentLockRef =
    useRef<DocumentLockState | null>(
      null,
    );

  const commitState =
    useCallback(
      (
        nextState:
          | RouteTransitionState
          | ((
              current:
                RouteTransitionState,
            ) => RouteTransitionState),
      ) => {
        const resolvedState =
          typeof nextState ===
          "function"
            ? nextState(
                stateRef.current,
              )
            : nextState;

        stateRef.current =
          resolvedState;

        setState(
          resolvedState,
        );
      },
      [],
    );

  const lockDocument =
    useCallback(() => {
      if (
        documentLockRef.current
      ) {
        return;
      }

      const scrollbarWidth =
        window.innerWidth -
        document.documentElement
          .clientWidth;

      documentLockRef.current =
        {
          overflow:
            document.body.style
              .overflow,

          paddingRight:
            document.body.style
              .paddingRight,
        };

      if (
        scrollbarWidth > 0
      ) {
        document.body.style.paddingRight =
          `${scrollbarWidth}px`;
      }

      document.body.style.overflow =
        "hidden";
    }, []);

  const unlockDocument =
    useCallback(() => {
      const lock =
        documentLockRef.current;

      if (!lock) {
        return;
      }

      document.body.style.overflow =
        lock.overflow;

      document.body.style.paddingRight =
        lock.paddingRight;

      documentLockRef.current =
        null;
    }, []);

  const stopTransitionWork =
    useCallback(() => {
      timelineRef.current?.kill();

      timelineRef.current =
        null;

      if (
        enterFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          enterFrameRef.current,
        );

        enterFrameRef.current =
          null;
      }
    }, []);

  /*
   * Restore whichever Case page is currently
   * mounted to its normal React/CSS-owned state.
   */
  const restoreCurrentRoutePresentation =
    useCallback(() => {
      const page =
        document.querySelector<HTMLElement>(
          "[data-case-page]",
        );

      if (!page) {
        return;
      }

      const folder =
        page.querySelector<HTMLElement>(
          "[data-case-folder]",
        );

      const content =
        page.querySelector<HTMLElement>(
          "[data-case-content]",
        );

      const hero =
        page.querySelector<HTMLElement>(
          "[data-case-hero]",
        );

      const tabs =
        Array.from(
          page.querySelectorAll<HTMLElement>(
            "[data-case-side-tab]",
          ),
        );

      if (folder) {
        gsap.killTweensOf(
          folder,
        );
      }

      if (content) {
        gsap.killTweensOf(
          content,
        );
      }

      if (hero) {
        gsap.killTweensOf(
          hero,
        );
      }

      if (
        tabs.length > 0
      ) {
        gsap.killTweensOf(
          tabs,
        );
      }

      if (hero) {
        gsap.set(
          hero,
          {
            clearProps:
              "opacity,visibility,transform",
          },
        );
      }

      if (content) {
        gsap.set(
          content,
          {
            clearProps:
              "opacity,visibility,transform",
          },
        );
      }

      if (
        tabs.length > 0
      ) {
        gsap.set(
          tabs,
          {
            clearProps:
              "transform,zIndex,visibility,opacity",
          },
        );
      }

      /*
       * CaseFolder owns its permanent background.
       */
      if (folder) {
        const stableFolderColor =
          folder.dataset
            .caseFolderColor;

        if (
          stableFolderColor
        ) {
          gsap.set(
            folder,
            {
              backgroundColor:
                stableFolderColor,
            },
          );
        }
      }
    }, []);

  const finishTransition =
    useCallback(() => {
      stopTransitionWork();

      pendingTransitionRef.current =
        null;

      unlockDocument();

      commitState(
        INITIAL_STATE,
      );
    }, [
      commitState,
      stopTransitionWork,
      unlockDocument,
    ]);

  const cancelTransition =
    useCallback(() => {
      stopTransitionWork();

      restoreCurrentRoutePresentation();

      pendingTransitionRef.current =
        null;

      unlockDocument();

      commitState(
        INITIAL_STATE,
      );
    }, [
      commitState,
      restoreCurrentRoutePresentation,
      stopTransitionWork,
      unlockDocument,
    ]);

  /*
   * ------------------------------------------------
   * REDUCED MOTION
   * ------------------------------------------------
   */

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

    const updatePreference =
      () => {
        prefersReducedMotionRef.current =
          mediaQuery.matches;
      };

    updatePreference();

    mediaQuery.addEventListener(
      "change",
      updatePreference,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updatePreference,
      );
    };
  }, []);

  /*
   * ------------------------------------------------
   * ROUTE MUTATION
   * ------------------------------------------------
   */

  const navigateToPendingCase =
    useCallback(() => {
      const pending =
        pendingTransitionRef.current;

      if (!pending) {
        finishTransition();

        return;
      }

      /*
       * Home → Case has a fullscreen transition layer
       * covering this movement, so prepare Home's
       * destination viewport immediately.
       *
       * Bottom Case → Case scrolling is handled AFTER
       * the new route commits instead, preventing an
       * old-page jump from the bottom to the top.
       */
      if (
        pending.type ===
          "home-to-case" &&
        pending.scroll
      ) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
      }

      commitState(
        (current) => ({
          ...current,

          phase:
            "navigating",
        }),
      );

      /*
       * Keep Next's automatic scrolling disabled.
       *
       * TransitionProvider owns destination
       * positioning so it happens at the correct
       * transition phase.
       */
      router.push(
        `/cases/${pending.slug}`,
        {
          scroll: false,
        },
      );
    }, [
      commitState,
      finishTransition,
      router,
    ]);

  /*
   * =================================================
   * CASE → CASE : SIDE TAB LEAVE
   * =================================================
   */

  const runCaseToCaseLeave =
    useCallback(
      (
        pending:
          PendingTransition,
      ) => {
        const page =
          document.querySelector<HTMLElement>(
            "[data-case-page]",
          );

        if (!page) {
          navigateToPendingCase();

          return;
        }

        const folder =
          page.querySelector<HTMLElement>(
            "[data-case-folder]",
          );

        const content =
          page.querySelector<HTMLElement>(
            "[data-case-content]",
          );

        const hero =
          page.querySelector<HTMLElement>(
            "[data-case-hero]",
          );

        const currentTab =
          page.querySelector<HTMLElement>(
            '[data-case-side-tab][aria-current="page"]',
          );

        const destinationTab =
          page.querySelector<HTMLElement>(
            `[data-case-side-tab][data-architect-slug="${pending.slug}"]`,
          );

        if (
          !folder ||
          !content ||
          !hero ||
          !destinationTab
        ) {
          navigateToPendingCase();

          return;
        }

        timelineRef.current?.kill();

        gsap.set(
          destinationTab,
          {
            zIndex: 100,
          },
        );

        const timeline =
          gsap.timeline({
            onComplete:
              navigateToPendingCase,
          });

        timelineRef.current =
          timeline;

        /*
         * Folder geometry remains stable.
         */
        timeline.to(
          folder,
          {
            backgroundColor:
              pending.color,

            duration: 0.34,

            ease:
              "power2.inOut",

            overwrite: true,
          },
          0,
        );

        timeline.to(
          content,
          {
            autoAlpha: 0,
            y: 12,

            duration: 0.24,

            ease:
              "power2.in",

            overwrite: true,
          },
          0,
        );

        timeline.to(
          hero,
          {
            autoAlpha: 0,
            y: -6,

            duration: 0.22,

            ease:
              "power2.in",

            overwrite: true,
          },
          0,
        );

        if (
          currentTab &&
          currentTab !==
            destinationTab
        ) {
          timeline.to(
            currentTab,
            {
              x: 0,

              duration: 0.26,

              ease:
                "power2.inOut",

              overwrite: true,
            },
            0,
          );
        }

        timeline.to(
          destinationTab,
          {
            x: 6,

            duration: 0.3,

            ease:
              "power3.out",

            overwrite: true,
          },
          0.02,
        );
      },
      [
        navigateToPendingCase,
      ],
    );

  /*
   * =================================================
   * BOTTOM SCROLL : LEAVE
   * =================================================
   */

  const runCaseScrollLeave =
    useCallback(
      (
        pending:
          PendingTransition,
      ) => {
        const page =
          document.querySelector<HTMLElement>(
            "[data-case-page]",
          );

        if (!page) {
          navigateToPendingCase();

          return;
        }

        const folder =
          page.querySelector<HTMLElement>(
            "[data-case-folder]",
          );

        const content =
          page.querySelector<HTMLElement>(
            "[data-case-content]",
          );

        const hero =
          page.querySelector<HTMLElement>(
            "[data-case-hero]",
          );

        if (
          !folder ||
          !content ||
          !hero
        ) {
          navigateToPendingCase();

          return;
        }

        timelineRef.current?.kill();

        const timeline =
          gsap.timeline({
            onComplete:
              navigateToPendingCase,
          });

        timelineRef.current =
          timeline;

        /*
         * Small exit only.
         *
         * No Home → Case animation.
         */
        timeline.to(
          content,
          {
            autoAlpha: 0,
            y: 14,

            duration: 0.28,

            ease:
              "power2.in",

            overwrite: true,
          },
          0,
        );

        timeline.to(
          hero,
          {
            autoAlpha: 0,
            y: -8,

            duration: 0.24,

            ease:
              "power2.in",

            overwrite: true,
          },
          0,
        );

        timeline.to(
          folder,
          {
            backgroundColor:
              pending.color,

            duration: 0.36,

            ease:
              "power2.inOut",

            overwrite: true,
          },
          0,
        );
      },
      [
        navigateToPendingCase,
      ],
    );

  /*
   * =================================================
   * PUBLIC TRANSITION API
   * =================================================
   */

  const requestCaseTransition =
    useCallback(
      (
        options:
          RequestCaseTransitionOptions,
      ) => {
        if (
          stateRef.current.phase !==
          "idle"
        ) {
          return;
        }

        browserNavigationRef.current =
          false;

        const destinationColor =
          resolveCssColor(
            options.color,
          );

        const fallbackTextColor =
          options.sourceElement
            ? window.getComputedStyle(
                options.sourceElement,
              ).color
            : "rgb(255, 255, 255)";

        const textColor =
          resolveCssColor(
            options.textColor ??
              fallbackTextColor,
          );

        const mountedCaseFolder =
          document.querySelector<HTMLElement>(
            "[data-case-folder]",
          );

        const sourceFolderColor =
          options.sourceFolderElement
            ? window.getComputedStyle(
                options
                  .sourceFolderElement,
              ).backgroundColor
            : mountedCaseFolder
                ?.dataset
                .caseFolderColor ??
              (
                mountedCaseFolder
                  ? window.getComputedStyle(
                      mountedCaseFolder,
                    ).backgroundColor
                  : destinationColor
              );

        const sourceGeometry: TransitionGeometrySnapshot =
          {
            tab:
              getGeometry(
                options.sourceElement,
              ),

            folder:
              getGeometry(
                options.sourceFolderElement,
              ),
          };

        const label =
          options.label ??
          options.sourceElement
            ?.textContent
            ?.trim() ??
          "";

        const pending: PendingTransition =
          {
            slug:
              options.slug,

            categoryId:
              options.categoryId,

            color:
              destinationColor,

            textColor,

            label,

            type:
              options.type,

            scroll:
              options.scroll ??
              false,

            sourceFolderColor,

            sourceGeometry,
          };

        pendingTransitionRef.current =
          pending;

        if (
          options.type ===
            "home-to-case" &&
          !prefersReducedMotionRef.current
        ) {
          lockDocument();
        }

        commitState({
          phase: "leaving",

          type:
            options.type,

          destinationSlug:
            options.slug,

          categoryId:
            options.categoryId,

          color:
            destinationColor,

          textColor,

          label,

          sourceFolderColor,

          sourceGeometry,

          targetGeometry: null,
        });

        if (
          prefersReducedMotionRef.current
        ) {
          navigateToPendingCase();

          return;
        }

        switch (
          options.type
        ) {
          case "home-to-case":
            /*
             * TransitionLayer mounts first.
             */
            return;

          case "case-to-case":
            runCaseToCaseLeave(
              pending,
            );

            return;

          case "case-to-case-scroll":
            runCaseScrollLeave(
              pending,
            );

            return;
        }
      },
      [
        commitState,
        lockDocument,
        navigateToPendingCase,
        runCaseScrollLeave,
        runCaseToCaseLeave,
      ],
    );

  /*
   * =================================================
   * HOME → CASE : LEAVE
   * =================================================
   */

  useLayoutEffect(() => {
    const pending =
      pendingTransitionRef.current;

    if (
      !pending ||
      pending.type !==
        "home-to-case" ||
      state.phase !==
        "leaving"
    ) {
      return;
    }

    const surface =
      transitionSurfaceRef.current;

    const tab =
      transitionTabRef.current;

    const label =
      transitionLabelRef.current;

    const coverSurfaceTarget =
      coverSurfaceTargetRef.current;

    const coverTabTarget =
      coverTabTargetRef.current;

    if (
      !surface ||
      !tab ||
      !label ||
      !coverSurfaceTarget ||
      !coverTabTarget
    ) {
      navigateToPendingCase();

      return;
    }

    timelineRef.current?.kill();

    /*
     * Flip owns geometry.
     */
    const surfaceFitVars =
      getFlipFitVars(
        surface,
        coverSurfaceTarget,
      );

    const tabFitVars =
      getFlipFitVars(
        tab,
        coverTabTarget,
      );

    /*
     * GSAP timeline owns timing/choreography.
     */
    const timeline =
      gsap.timeline({
        onComplete:
          navigateToPendingCase,
      });

    timelineRef.current =
      timeline;

    timeline.to(
      surface,
      {
        ...surfaceFitVars,

        duration: 0.78,

        ease:
          "power3.inOut",
      },
      0,
    );

    timeline.to(
      tab,
      {
        ...tabFitVars,

        duration: 0.78,

        ease:
          "power3.inOut",
      },
      0,
    );

    timeline.to(
      surface,
      {
        backgroundColor:
          pending.color,

        borderRadius: 0,

        duration: 0.58,

        ease:
          "power2.inOut",
      },
      0,
    );

    timeline.to(
      tab,
      {
        borderRadius:
          "0 2rem 2rem 0",

        duration: 0.5,

        ease:
          "power2.inOut",
      },
      0.08,
    );

    timeline.to(
      label,
      {
        rotation: 90,

        duration: 0.62,

        ease:
          "power2.inOut",
      },
      0.08,
    );
  }, [
    state.phase,
    navigateToPendingCase,
  ]);

  /*
   * =================================================
   * HOME → CASE : ENTER
   * =================================================
   */

  const runHomeCaseEnter =
    useCallback(
      (
        pending:
          PendingTransition,
      ) => {
        const surface =
          transitionSurfaceRef.current;

        const transitionTab =
          transitionTabRef.current;

        const transitionLabel =
          transitionLabelRef.current;

        const casePage =
          document.querySelector<HTMLElement>(
            "[data-case-page]",
          );

        if (
          !surface ||
          !transitionTab ||
          !transitionLabel ||
          !casePage
        ) {
          finishTransition();

          return;
        }

        const targetFolder =
          casePage.querySelector<HTMLElement>(
            "[data-case-folder]",
          );

        const targetTab =
          casePage.querySelector<HTMLElement>(
            '[data-case-side-tab][aria-current="page"]',
          );

        const targetContent =
          casePage.querySelector<HTMLElement>(
            "[data-case-content]",
          );

        const targetHero =
          casePage.querySelector<HTMLElement>(
            "[data-case-hero]",
          );

        if (
          !targetFolder ||
          !targetTab
        ) {
          finishTransition();

          return;
        }

        const folderGeometry =
          getGeometry(
            targetFolder,
          );

        const tabGeometry =
          getGeometry(
            targetTab,
          );

        if (
          !folderGeometry ||
          !tabGeometry
        ) {
          finishTransition();

          return;
        }

        commitState(
          (current) => ({
            ...current,

            phase:
              "entering",

            targetGeometry: {
              folder:
                folderGeometry,

              tab:
                tabGeometry,
            },
          }),
        );

        gsap.set(
          targetTab,
          {
            visibility:
              "hidden",
          },
        );

        if (targetContent) {
          gsap.set(
            targetContent,
            {
              autoAlpha: 0,
              y: 12,
            },
          );
        }

        if (targetHero) {
          gsap.set(
            targetHero,
            {
              autoAlpha: 0,
              y: 10,
            },
          );
        }

        timelineRef.current?.kill();

        const folderFitVars =
          getFlipFitVars(
            surface,
            targetFolder,
          );

        const tabFitVars =
          getFlipFitVars(
            transitionTab,
            targetTab,
          );

        const timeline =
          gsap.timeline({
            onComplete:
              finishTransition,
          });

        timelineRef.current =
          timeline;

        timeline.to(
          surface,
          {
            ...folderFitVars,

            duration: 0.82,

            ease:
              "power3.inOut",
          },
          0,
        );

        timeline.to(
          transitionTab,
          {
            ...tabFitVars,

            duration: 0.82,

            ease:
              "power3.inOut",
          },
          0,
        );

        timeline.to(
          surface,
          {
            borderRadius:
              "0.25rem",

            duration: 0.42,

            ease:
              "power2.out",
          },
          0.25,
        );

        timeline.to(
          transitionTab,
          {
            borderRadius:
              "0 1.75rem 1.75rem 0",

            duration: 0.38,

            ease:
              "power2.out",
          },
          0.2,
        );

        timeline.to(
          transitionLabel,
          {
            rotation: 90,

            duration: 0.25,

            ease:
              "power2.out",
          },
          0,
        );

        if (targetHero) {
          timeline.to(
            targetHero,
            {
              autoAlpha: 1,
              y: 0,

              duration: 0.4,

              ease:
                "power3.out",
            },
            0.46,
          );
        }

        if (targetContent) {
          timeline.to(
            targetContent,
            {
              autoAlpha: 1,
              y: 0,

              duration: 0.42,

              ease:
                "power3.out",
            },
            0.56,
          );
        }

        timeline.set(
          targetTab,
          {
            visibility:
              "visible",
          },
          0.68,
        );

        timeline.to(
          [
            surface,
            transitionTab,
          ],
          {
            autoAlpha: 0,

            duration: 0.2,

            ease:
              "power1.out",
          },
          0.7,
        );
      },
      [
        commitState,
        finishTransition,
      ],
    );

  /*
   * =================================================
   * CASE → CASE : ENTER
   * =================================================
   */

  const runCaseToCaseEnter =
    useCallback(
      (
        pending:
          PendingTransition,
      ) => {
        const page =
          document.querySelector<HTMLElement>(
            "[data-case-page]",
          );

        if (!page) {
          finishTransition();

          return;
        }

        const folder =
          page.querySelector<HTMLElement>(
            "[data-case-folder]",
          );

        const content =
          page.querySelector<HTMLElement>(
            "[data-case-content]",
          );

        const hero =
          page.querySelector<HTMLElement>(
            "[data-case-hero]",
          );

        const activeTab =
          page.querySelector<HTMLElement>(
            '[data-case-side-tab][aria-current="page"]',
          );

        const allTabs =
          Array.from(
            page.querySelectorAll<HTMLElement>(
              "[data-case-side-tab]",
            ),
          );

        if (
          !folder ||
          !content ||
          !hero
        ) {
          finishTransition();

          return;
        }

        commitState(
          (current) => ({
            ...current,

            phase:
              "entering",

            targetGeometry: {
              folder:
                getGeometry(
                  folder,
                ),

              tab:
                getGeometry(
                  activeTab,
                ),
            },
          }),
        );

        timelineRef.current?.kill();

        gsap.set(
          folder,
          {
            backgroundColor:
              pending.color,
          },
        );

        gsap.set(
          [hero, content],
          {
            autoAlpha: 0,
          },
        );

        if (
          allTabs.length > 0
        ) {
          gsap.set(
            allTabs,
            {
              x: 0,
            },
          );
        }

        if (activeTab) {
          gsap.set(
            activeTab,
            {
              x: 6,
            },
          );
        }

        const timeline =
          gsap.timeline({
            onComplete:
              finishTransition,
          });

        timelineRef.current =
          timeline;

        if (activeTab) {
          timeline.to(
            activeTab,
            {
              x: 4,

              duration: 0.28,

              ease:
                "power2.out",
            },
            0,
          );
        }

        timeline.fromTo(
          hero,
          {
            autoAlpha: 0,
            y: 8,
          },
          {
            autoAlpha: 1,
            y: 0,

            duration: 0.34,

            ease:
              "power3.out",
          },
          0.04,
        );

        timeline.fromTo(
          content,
          {
            autoAlpha: 0,
            y: 14,
          },
          {
            autoAlpha: 1,
            y: 0,

            duration: 0.42,

            ease:
              "power3.out",
          },
          0.08,
        );
      },
      [
        commitState,
        finishTransition,
      ],
    );

  /*
   * =================================================
   * ROUTE COMMIT
   * =================================================
   */

  useLayoutEffect(() => {
    /*
     * Browser Back / Forward:
     *
     * trust the browser destination and discard
     * transition context.
     */
    if (
      browserNavigationRef.current
    ) {
      browserNavigationRef.current =
        false;

      if (
        stateRef.current.phase !==
          "idle" ||
        pendingTransitionRef.current
      ) {
        cancelTransition();
      }

      return;
    }

    const pending =
      pendingTransitionRef.current;

    /*
     * Direct URL / refresh / normal navigation:
     *
     * no transition context means stable render only.
     */
    if (!pending) {
      if (
        stateRef.current.phase !==
          "idle"
      ) {
        cancelTransition();
      }

      return;
    }

    if (
      stateRef.current.phase !==
        "navigating"
    ) {
      return;
    }

    const destinationPath =
      `/cases/${pending.slug}`;

    if (
      pathname !==
      destinationPath
    ) {
      cancelTransition();

      return;
    }

    /*
     * ------------------------------------------------
     * DESTINATION SCROLL OWNERSHIP
     * ------------------------------------------------
     *
     * This is the important bottom-handoff fix.
     *
     * The OLD case remained at the bottom during
     * its exit animation.
     *
     * Only once the NEW route has mounted do we
     * position that destination at the top.
     *
     * This happens before target geometry is measured.
     *
     * Side-tab Case → Case navigation sends:
     *
     * scroll: false
     *
     * so its viewport position remains unchanged.
     */
    if (
      pending.scroll
    ) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }

    /*
     * Reduced motion still receives the correct
     * destination scroll position.
     */
    if (
      prefersReducedMotionRef.current
    ) {
      finishTransition();

      return;
    }

    /*
     * Measure/animate after the destination's scroll
     * position has been established.
     */
    enterFrameRef.current =
      window.requestAnimationFrame(
        () => {
          enterFrameRef.current =
            null;

          const latestPending =
            pendingTransitionRef.current;

          if (
            !latestPending ||
            browserNavigationRef.current
          ) {
            cancelTransition();

            return;
          }

          switch (
            latestPending.type
          ) {
            case "home-to-case":
              runHomeCaseEnter(
                latestPending,
              );

              return;

            case "case-to-case":
              runCaseToCaseEnter(
                latestPending,
              );

              return;

            case "case-to-case-scroll":
              runCaseToCaseEnter(
                latestPending,
              );

              return;
          }
        },
      );

    return () => {
      if (
        enterFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          enterFrameRef.current,
        );

        enterFrameRef.current =
          null;
      }
    };
  }, [
    pathname,
    cancelTransition,
    finishTransition,
    runCaseToCaseEnter,
    runHomeCaseEnter,
  ]);

  /*
   * ------------------------------------------------
   * BACK / FORWARD
   * ------------------------------------------------
   */

  useEffect(() => {
    const handlePopState =
      () => {
        browserNavigationRef.current =
          true;

        if (
          stateRef.current.phase !==
            "idle" ||
          pendingTransitionRef.current
        ) {
          cancelTransition();
        }
      };

    window.addEventListener(
      "popstate",
      handlePopState,
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState,
      );
    };
  }, [
    cancelTransition,
  ]);

  /*
   * ------------------------------------------------
   * PROVIDER CLEANUP
   * ------------------------------------------------
   */

  useEffect(() => {
    return () => {
      stopTransitionWork();

      unlockDocument();
    };
  }, [
    stopTransitionWork,
    unlockDocument,
  ]);

  const value: TransitionContextValue =
    {
      state,

      isTransitioning:
        state.phase !==
        "idle",

      requestCaseTransition,
    };

  return (
    <TransitionContext.Provider
      value={value}
    >
      {children}

      <TransitionLayer
        state={state}
        surfaceRef={
          transitionSurfaceRef
        }
        tabRef={
          transitionTabRef
        }
        labelRef={
          transitionLabelRef
        }
        coverSurfaceTargetRef={
          coverSurfaceTargetRef
        }
        coverTabTargetRef={
          coverTabTargetRef
        }
      />
    </TransitionContext.Provider>
  );
}

export function useTransitionController() {
  const context =
    useContext(
      TransitionContext,
    );

  if (!context) {
    throw new Error(
      "useTransitionController must be used inside TransitionProvider.",
    );
  }

  return context;
}