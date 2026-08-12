"use client";

import type {
  CSSProperties,
} from "react";

import Image from "next/image";

import type {
  CaseImageMediaItem,
} from "@/types/case-media";

interface CaseImageItemProps {
  item: CaseImageMediaItem;

  onOpen: (
    item: CaseImageMediaItem,
  ) => void;
}

export default function CaseImageItem({
  item,
  onOpen,
}: CaseImageItemProps) {
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
      item.placement.zIndex ?? 10,
  } as CSSProperties;

  return (
    <div
      data-case-media-item
      data-case-media-type="image"
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
        aria-label={`Open image: ${item.image.alt}`}
        className="
          group
          block
          w-full

          cursor-zoom-in

          border-0
          bg-transparent
          p-0

          text-left
        "
      >
        <div
          className="
            relative
            w-full
            overflow-hidden

            bg-black/10

            shadow-lg

            transition-transform
            duration-300

            group-hover:scale-[1.015]
            group-focus-visible:scale-[1.015]
          "
          style={{
            aspectRatio:
              item.aspectRatio ??
              "4 / 3",
          }}
        >
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="
              (max-width: 1023px) 100vw,
              50vw
            "
            className="
              object-cover
            "
          />
        </div>

        {item.caption && (
          <span
            className="
              mt-2
              block

              font-[family-name:var(--font-utility)]
              text-[0.6rem]
              leading-relaxed
              tracking-[0.03em]

              text-[var(--color-text-muted)]
            "
          >
            {item.caption}
          </span>
        )}
      </button>
    </div>
  );
}