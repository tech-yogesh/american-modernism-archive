"use client";

import type {
  CSSProperties,
} from "react";

import Image from "next/image";

import type {
  CaseVideoMediaItem,
} from "@/types/case-media";

interface CaseVideoCardProps {
  item: CaseVideoMediaItem;

  onOpen: (
    item: CaseVideoMediaItem,
  ) => void;
}

export default function CaseVideoCard({
  item,
  onOpen,
}: CaseVideoCardProps) {
  const placementStyle = {
    "--case-media-top":
      item.placement.top,

    "--case-media-left":
      item.placement.left,

    "--case-media-width":
      item.placement.width,

    "--case-media-rotation":
      `${item.placement.rotation ?? 0}deg`,

    zIndex:
      item.placement.zIndex ?? 30,
  } as CSSProperties;

  return (
    <div
      data-case-media-item
      data-case-media-type="video"
      style={placementStyle}
      className="
        relative
        w-full

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
          onOpen(item)
        }
        aria-label={`Play video: ${item.title}`}
        className="
          group
          relative
          block
          w-full

          overflow-hidden
          rounded-[0.3rem]

          border-0
          p-0

          text-left

          shadow-xl
        "
        style={{
          backgroundColor:
            item.cardColor ??
            "var(--color-tab-red)",

          color:
            item.textColor ??
            "white",
        }}
      >
        {item.thumbnail && (
          <div
            className="
              relative
              aspect-video
              w-full

              overflow-hidden
            "
          >
            <Image
              src={
                item.thumbnail.src
              }
              alt={
                item.thumbnail.alt
              }
              fill
              sizes="
                (max-width: 1023px) 100vw,
                35vw
              "
              className="
                object-cover

                transition-transform
                duration-500

                group-hover:scale-[1.025]
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-black/10
              "
            />
          </div>
        )}

        <div
          className="
            flex
            items-center
            gap-5

            px-5
            py-5

            md:px-6
          "
        >
          {/*
            Dedicated RED play control.
          */}
          <span
            aria-hidden="true"
            className="
              flex
              size-12
              shrink-0
              items-center
              justify-center

              rounded-full

              border
              border-white/80

              bg-[var(--color-tab-red)]

              text-white

              transition-transform
              duration-300

              group-hover:scale-110
            "
          >
            <span
              className="
                ml-1
                text-lg
                leading-none
              "
            >
              ▶
            </span>
          </span>

          <span
            className="
              font-[family-name:var(--font-utility)]
              text-sm
              leading-snug

              md:text-base
            "
          >
            {item.title}
          </span>
        </div>
      </button>
    </div>
  );
}