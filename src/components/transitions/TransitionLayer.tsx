"use client";

import type { RefObject } from "react";

import type { RouteTransitionState } from "./TransitionProvider";

interface TransitionLayerProps {
  state: RouteTransitionState;

  surfaceRef: RefObject<HTMLDivElement | null>;
  tabRef: RefObject<HTMLDivElement | null>;
  labelRef: RefObject<HTMLSpanElement | null>;

  coverSurfaceTargetRef: RefObject<HTMLDivElement | null>;
  coverTabTargetRef: RefObject<HTMLDivElement | null>;
}

export default function TransitionLayer({
  state,
  surfaceRef,
  tabRef,
  labelRef,
  coverSurfaceTargetRef,
  coverTabTargetRef,
}: TransitionLayerProps) {
  if (
    state.type !== "home-to-case" ||
    state.phase === "idle" ||
    !state.sourceGeometry?.folder ||
    !state.sourceGeometry.tab
  ) {
    return null;
  }

  const folderGeometry =
    state.sourceGeometry.folder;

  const tabGeometry =
    state.sourceGeometry.tab;

  return (
    <div
      data-transition-layer
      aria-hidden="true"
      className="
        pointer-events-auto
        fixed
        inset-0
        z-[var(--z-transition)]
        overflow-hidden
      "
    >
      {/*
        ------------------------------------------------
        GEOMETRY TARGETS
        ------------------------------------------------

        These elements are invisible.

        They exist only so Flip has real DOM geometry
        to fit the temporary transition elements into.

        We are deliberately NOT calculating destination
        x/y/width/height ourselves.
      */}

      {/* Fullscreen file target */}
      <div
        ref={coverSurfaceTargetRef}
        data-transition-cover-surface-target
        className="
          pointer-events-none
          fixed
          inset-0
          invisible
        "
      />

      {/* Temporary vertical-tab target */}
      <div
        ref={coverTabTargetRef}
        data-transition-cover-tab-target
        className="
          pointer-events-none
          invisible
          fixed
          right-0
          top-1/2
          h-[11rem]
          w-12
          -translate-y-1/2
          md:h-[13rem]
          md:w-[3.25rem]
          lg:h-[14rem]
          lg:w-14
        "
      />

      {/*
        ------------------------------------------------
        TEMPORARY FILE COPY
        ------------------------------------------------

        It begins directly over the homepage folder.

        Flip later moves it:
        homepage folder
              ↓
        fullscreen cover
              ↓
        real CaseFolder
      */}
      <div
        ref={surfaceRef}
        data-transition-surface
        className="
          fixed
          overflow-hidden
          will-change-transform
        "
        style={{
          top: folderGeometry.top,
          left: folderGeometry.left,
          width: folderGeometry.width,
          height: folderGeometry.height,

          backgroundColor:
            state.sourceFolderColor ??
            state.color ??
            "transparent",

          borderRadius: "0.25rem",
        }}
      />

      {/*
        ------------------------------------------------
        TEMPORARY ARCHITECT TAB COPY
        ------------------------------------------------

        The real Home tab is never moved.

        This copy starts exactly over it and Flip
        later fits it into the Case side-tab geometry.
      */}
      <div
        ref={tabRef}
        data-transition-architect-tab
        className="
          fixed
          flex
          items-center
          justify-center
          overflow-hidden
          whitespace-nowrap
          font-[family-name:var(--font-editorial)]
          leading-none
          will-change-transform
        "
        style={{
          top: tabGeometry.top,
          left: tabGeometry.left,
          width: tabGeometry.width,
          height: tabGeometry.height,

          backgroundColor:
            state.color ??
            "transparent",

          color:
            state.textColor ??
            "var(--color-text-primary)",

          borderRadius: "2rem 2rem 0 0",
        }}
      >
        <span
          ref={labelRef}
          data-transition-tab-label
          className="
            inline-block
            max-w-[7rem]
            whitespace-normal
            px-2
            text-center
            text-[0.8rem]
            leading-[1.05]
            md:max-w-none
            md:whitespace-nowrap
            md:px-4
            md:text-xl
            lg:text-[1.6rem]
          "
        >
          {state.label}
        </span>
      </div>
    </div>
  );
}