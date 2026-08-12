"use client";

import type {
  CSSProperties,
} from "react";

import type {
  CaseInfoMediaItem,
} from "@/types/case-media";

interface CaseInfoCardProps {
  item: CaseInfoMediaItem;

  isFront: boolean;

  onActivate: (
    id: string,
  ) => void;
}

export default function CaseInfoCard({
  item,
  isFront,
  onActivate,
}: CaseInfoCardProps) {
  const placementStyle = {
    "--case-media-top":
      item.placement.top,

    "--case-media-left":
      item.placement.left,

    "--case-media-width":
      item.placement.width,

    "--case-media-rotation":
      `${item.placement.rotation ?? 0}deg`,

    zIndex: isFront
      ? 80
      : item.placement.zIndex ??
        20,
  } as CSSProperties;

  return (
    <div
      data-case-media-item
      data-case-media-type="info"
      data-case-media-front={
        isFront
          ? "true"
          : "false"
      }
      style={placementStyle}
      className="
        relative
        w-full

        transition-transform
        duration-300

        lg:absolute
        lg:left-[var(--case-media-left)]
        lg:top-[var(--case-media-top)]
        lg:w-[var(--case-media-width)]
        lg:[transform:rotate(var(--case-media-rotation))]
      "
    >
      <button
        type="button"
        onClick={() =>
          onActivate(item.id)
        }
        onFocus={() =>
          onActivate(item.id)
        }
        aria-label={`Bring ${item.title} information forward`}
        className={`
          block
          w-full

          cursor-pointer

          rounded-[0.25rem]

          border-0

          px-6
          py-7

          text-left

          shadow-xl

          transition-transform
          duration-300

          md:px-8
          md:py-9

          ${
            isFront
              ? "-translate-y-1 scale-[1.015]"
              : ""
          }
        `}
        style={{
          backgroundColor:
            item.backgroundColor ??
            "var(--color-tab-yellow)",

          color:
            item.textColor ??
            "var(--color-bg)",
        }}
      >
        {item.eyebrow && (
          <span
            className="
              mb-5
              block

              font-[family-name:var(--font-utility)]
              text-[0.6rem]
              uppercase
              tracking-[0.08em]
            "
          >
            {item.eyebrow}
          </span>
        )}

        <h3
          className="
            font-[family-name:var(--font-display)]
            text-2xl
            font-bold
            uppercase
            leading-[0.95]

            md:text-3xl
            lg:text-4xl
          "
        >
          {item.title}
        </h3>

        <div
          className="
            mt-7
            space-y-4

            font-[family-name:var(--font-utility)]
            text-sm
            leading-relaxed

            md:text-base
          "
        >
          {item.body.map(
            (
              paragraph,
              index,
            ) => (
              <p
                key={`${item.id}-${index}`}
              >
                {paragraph}
              </p>
            ),
          )}
        </div>
      </button>
    </div>
  );
}