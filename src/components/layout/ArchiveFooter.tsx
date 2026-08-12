"use client";

import {
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type SignVariant =
  | "split"
  | "arrow"
  | "wedge"
  | "cross"
  | "orbit"
  | "slash"
  | "fragment";

interface FooterSign {
  id: string;
  variant: SignVariant;
  label?: string;
  rotation: number;
}

interface ArchiveFooterProps {
  backgroundColor: string;
  description?: string;
}

const SIGNS: FooterSign[] = [
  {
    id: "archive-sign-1",
    variant: "split",
    label: "N",
    rotation: -8,
  },
  {
    id: "archive-sign-2",
    variant: "wedge",
    rotation: 14,
  },
  {
    id: "archive-sign-3",
    variant: "arrow",
    label: "NW",
    rotation: -18,
  },
  {
    id: "archive-sign-4",
    variant: "fragment",
    rotation: 8,
  },
  {
    id: "archive-sign-5",
    variant: "cross",
    label: "N",
    rotation: 12,
  },
  {
    id: "archive-sign-6",
    variant: "orbit",
    rotation: -12,
  },
  {
    id: "archive-sign-7",
    variant: "slash",
    rotation: 6,
  },
];

const INTERACTION_RADIUS = 240;
const MAX_TRANSLATE = 8;

function SignGraphic({
  variant,
}: {
  variant: SignVariant;
}) {
  if (variant === "split") {
    return (
      <svg
        viewBox="0 0 72 72"
        aria-hidden="true"
        className="h-full w-full"
      >
        <circle
          cx="36"
          cy="36"
          r="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />

        <path
          d="M13 34h46"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />

        <path
          d="M20 29 36 14 52 29Z"
          fill="currentColor"
        />

        <path
          d="M23 23h26M27 19h18"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      </svg>
    );
  }

  if (variant === "arrow") {
    return (
      <svg
        viewBox="0 0 72 72"
        aria-hidden="true"
        className="h-full w-full"
      >
        <circle
          cx="36"
          cy="36"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.45"
        />

        <path
          d="M36 58V17"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />

        <path
          d="m26 28 10-11 10 11"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (variant === "wedge") {
    return (
      <svg
        viewBox="0 0 72 72"
        aria-hidden="true"
        className="h-full w-full"
      >
        <circle
          cx="36"
          cy="36"
          r="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />

        <path
          d="M16 50 31 18 54 29Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />

        <path
          d="M31 18 36 53"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />

        <path
          d="m40 21 9 6M42 27l9 6M44 33l7 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.85"
        />
      </svg>
    );
  }

  if (variant === "cross") {
    return (
      <svg
        viewBox="0 0 72 72"
        aria-hidden="true"
        className="h-full w-full"
      >
        <circle
          cx="36"
          cy="36"
          r="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />

        <path
          d="M36 11v22M11 36h22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />

        <circle
          cx="36"
          cy="36"
          r="4"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (variant === "orbit") {
    return (
      <svg
        viewBox="0 0 72 72"
        aria-hidden="true"
        className="h-full w-full"
      >
        <circle
          cx="36"
          cy="36"
          r="23"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.55"
        />

        <ellipse
          cx="36"
          cy="36"
          rx="30"
          ry="11"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.15"
          transform="rotate(18 36 36)"
        />

        <path
          d="M10 19 61 52"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />

        <circle
          cx="36"
          cy="36"
          r="3"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (variant === "slash") {
    return (
      <svg
        viewBox="0 0 72 72"
        aria-hidden="true"
        className="h-full w-full"
      >
        <circle
          cx="36"
          cy="36"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />

        <path
          d="m18 19 37 34"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M18 19h19L23 33Z"
          fill="currentColor"
        />

        <path
          d="m44 45 10 8M41 49l8 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 72 72"
      aria-hidden="true"
      className="h-full w-full"
    >
      <circle
        cx="36"
        cy="36"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.65"
      />

      <path
        d="M14 26 35 13 59 23 49 49 22 57Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      <path
        d="M14 26 49 49M35 13 22 57M59 23 22 57"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.85"
      />

      <path
        d="m20 29 30-8M19 34l33-9M20 39l28-8M22 44l24-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.65"
      />
    </svg>
  );
}

function ScaleMark() {
  return (
    <div
      aria-hidden="true"
      className="
        w-[10rem]
        text-white
      "
    >
      <div className="flex h-4 items-end">
        <span className="h-[0.3rem] w-4 bg-white" />
        <span className="h-[0.15rem] w-4 bg-white" />
        <span className="h-[0.45rem] w-8 bg-white" />
        <span className="h-[0.15rem] flex-1 bg-white" />
      </div>

      <div
        className="
          mt-1
          flex
          justify-between
          font-[family-name:var(--font-utility)]
          text-[0.6rem]
          leading-none
        "
      >
        <span>0</span>
        <span>4</span>
        <span>8</span>
        <span>16</span>
        <span>32</span>
      </div>
    </div>
  );
}

export default function ArchiveFooter({
  backgroundColor,
  description = "An independent digital study of American modernism — architects, buildings, drawings and fragments assembled as an interactive archive.",
}: ArchiveFooterProps) {
  const footerRef =
    useRef<HTMLElement>(null);

  const reducedMotionRef =
    useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      reducedMotionRef.current =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

      return () => {
        reducedMotionRef.current =
          false;
      };
    },
    {
      scope: footerRef,
    },
  );

  const resetSigns =
    contextSafe(() => {
      const root =
        footerRef.current;

      if (!root) {
        return;
      }

      const signs =
        root.querySelectorAll<HTMLElement>(
          "[data-directional-sign]",
        );

      signs.forEach((sign) => {
        const baseRotation =
          Number(
            sign.dataset.baseRotation ??
              0,
          );

        gsap.to(sign, {
          x: 0,
          y: 0,
          rotation: baseRotation,

          duration: 0.55,

          ease: "power3.out",

          overwrite: true,
        });
      });
    });

  const handlePointerMove =
    contextSafe(
      (
        event: ReactPointerEvent<HTMLElement>,
      ) => {
        if (
          event.pointerType !==
            "mouse" ||
          reducedMotionRef.current
        ) {
          return;
        }

        const root =
          footerRef.current;

        if (!root) {
          return;
        }

        const signs =
          root.querySelectorAll<HTMLElement>(
            "[data-directional-sign]",
          );

        signs.forEach((sign) => {
          const rect =
            sign.getBoundingClientRect();

          const centerX =
            rect.left +
            rect.width / 2;

          const centerY =
            rect.top +
            rect.height / 2;

          const dx =
            event.clientX -
            centerX;

          const dy =
            event.clientY -
            centerY;

          const distance =
            Math.hypot(
              dx,
              dy,
            );

          const baseRotation =
            Number(
              sign.dataset
                .baseRotation ?? 0,
            );

          if (
            distance >
            INTERACTION_RADIUS
          ) {
            gsap.to(sign, {
              x: 0,
              y: 0,

              rotation:
                baseRotation,

              duration: 0.5,

              ease:
                "power3.out",

              overwrite: true,
            });

            return;
          }

          const safeDistance =
            Math.max(
              distance,
              1,
            );

          const directionX =
            dx /
            safeDistance;

          const directionY =
            dy /
            safeDistance;

          const influence =
            1 -
            distance /
              INTERACTION_RADIUS;

          const rawTargetRotation =
            Math.atan2(
              dy,
              dx,
            ) *
              (180 / Math.PI) +
            90;

          const currentRotation =
            Number(
              gsap.getProperty(
                sign,
                "rotation",
              ),
            ) || 0;

          const delta =
            ((rawTargetRotation -
              currentRotation +
              540) %
              360) -
            180;

          const targetRotation =
            currentRotation +
            delta;

          gsap.to(sign, {
            x:
              directionX *
              MAX_TRANSLATE *
              influence,

            y:
              directionY *
              MAX_TRANSLATE *
              influence,

            rotation:
              targetRotation,

            duration: 0.28,

            ease:
              "power2.out",

            overwrite: true,
          });
        });
      },
    );

  const currentYear =
    new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        resetSigns
      }
      className="
        px-[var(--page-gutter)]
        pb-4
      "
    >
      <div
        className="
          relative

          min-h-[25rem]
          overflow-hidden
          rounded-[0.25rem]

          px-4
          py-10

          text-white

          md:min-h-[30rem]
          md:px-8
          md:py-16

          lg:px-14
        "
        style={{
          backgroundColor,
        }}
      >
        {/* Interactive archive signs */}
        <div
          className="
            mx-auto

            grid
            w-full
            max-w-[52rem]

            grid-cols-7
            place-items-center

            gap-x-1

            sm:gap-x-2

            md:gap-x-8
          "
          aria-hidden="true"
        >
          {SIGNS.map(
            (sign) => (
              <div
                key={sign.id}
                data-directional-sign
                data-base-rotation={
                  sign.rotation
                }
                className="
                  pointer-events-none
                  relative

                  flex
                  h-8
                  w-8

                  items-center
                  justify-center

                  will-change-transform

                  sm:h-9
                  sm:w-9

                  md:h-[4.75rem]
                  md:w-[4.75rem]
                "
                style={{
                  transform: `rotate(${sign.rotation}deg)`,
                }}
              >
                {sign.label && (
                  <span
                    className="
                      absolute

                      -top-2
                      left-1/2
                      -translate-x-1/2

                      font-[family-name:var(--font-editorial)]
                      text-[0.5rem]
                      italic

                      sm:text-[0.6rem]

                      md:-top-3
                      md:text-xs
                    "
                  >
                    {sign.label}
                  </span>
                )}

                <SignGraphic
                  variant={
                    sign.variant
                  }
                />
              </div>
            ),
          )}
        </div>

        {/* Small context */}
       {/*  <p
          className="
            mx-auto
            mt-10
            max-w-[36rem]

            text-center

            font-[family-name:var(--font-editorial)]
            text-sm
            leading-relaxed

            text-white/80

            md:mt-12
            md:text-base
          "
        >
          {description}
        </p> */}

        {/* Footer utility row */}
        <div
          className="
            mt-14
            grid
            gap-8

            font-[family-name:var(--font-utility)]
            text-[0.65rem]
            uppercase
            tracking-[0.025em]

            md:absolute
            md:inset-x-8
            md:bottom-10
            md:mt-0
            md:grid-cols-[1fr_auto_1fr]
            md:items-end

            lg:inset-x-14
          "
        >
          <div>
            <ScaleMark />
          </div>

          <div className="md:text-center">
            © {currentYear}
          </div>

          <div
            className="
              max-w-[20rem]
              leading-relaxed

              md:justify-self-end
              md:text-right
            "
          >
            Built with Next.js
            {" + "}
            GSAP for an
            interactive architectural
            archive
          </div>
        </div>
      </div>
    </footer>
  );
}