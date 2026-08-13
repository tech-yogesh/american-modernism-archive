"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import Image from "next/image";

import { createPortal } from "react-dom";

import type { CaseModalMedia } from "@/types/case-media";

interface MediaModalProps {
  media: CaseModalMedia | null;

  onClose: () => void;
}

export default function MediaModal({
  media,
  onClose,
}: MediaModalProps) {
  const [isMounted, setIsMounted] =
    useState(false);

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!media) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    document.body.style.overflow =
      "hidden";

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      previouslyFocused?.focus();
    };
  }, [media, onClose]);

  if (
    !isMounted ||
    !media
  ) {
    return null;
  }

  const handleBackdropClick = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (
      event.target ===
      event.currentTarget
    ) {
      onClose();
    }
  };

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={
        media.type === "image"
          ? media.image.alt
          : media.title
      }
      onMouseDown={
        handleBackdropClick
      }
      className="
        fixed
        inset-0
        z-[var(--z-transition)]

        flex
        items-center
        justify-center

        bg-transparent

        px-4
        py-6

        backdrop-blur-[2px]

        md:px-8
        md:py-10
      "
    >
      <div
        className="
          relative

          w-full
          max-w-[72rem]

          rounded-[0.35rem]

          

          shadow-2xl
        "
      >
        {/* Close */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close media"
          className="
            absolute
            right-3
            top-3
            z-[5]

            inline-flex
            min-h-11
            items-center
            justify-center
            gap-2

            rounded-full

            bg-[var(--color-tab-red)]

            px-5
            py-2

            font-[family-name:var(--font-utility)]
            text-xs
            uppercase
            tracking-[0.06em]

            text-white

            md:right-4
            md:top-4
            md:text-sm
          "
        >
         

          <span
            aria-hidden="true"
            className="
              text-lg
              leading-none
            "
          >
            ×
          </span>
        </button>

        {media.type === "image" ? (
          <div
            className="
              flex
              max-h-[86svh]
              min-h-[18rem]
              items-center
              justify-center

              overflow-hidden

              p-4
              pt-16

              md:p-8
              md:pt-20
            "
          >
            <div
              className="
                relative

                h-[min(72svh,52rem)]
                w-full
              "
            >
              <Image
                src={media.image.src}
                alt={media.image.alt}
                fill
                priority
                sizes="90vw"
                className="
                  object-contain
                "
              />
            </div>

            {media.caption && (
              <p
                className="
                  absolute
                  bottom-3
                  left-4
                  right-4

                  font-[family-name:var(--font-utility)]
                  text-[0.65rem]

                  text-[var(--color-text-secondary)]

                  md:bottom-4
                  md:left-8
                  md:right-8
                  md:text-xs
                "
              >
                {media.caption}
              </p>
            )}
          </div>
        ) : (
          <div
            className="
              p-4
              pt-16

              md:p-8
              md:pt-20
            "
          >
            <div
              className="
                aspect-video
                w-full
                overflow-hidden
                rounded-[0.25rem]
                bg-black
              "
            >
              <iframe
                key={media.youtubeId}
                src={`https://www.youtube-nocookie.com/embed/${media.youtubeId}?autoplay=1&rel=0`}
                title={media.title}
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                  web-share
                "
                allowFullScreen
                className="
                  h-full
                  w-full
                  border-0
                "
              />
            </div>

            <div
              className="
                mt-5
                pr-24

                text-[var(--color-text-primary)]
              "
            >
              <h2
                className="
                  font-[family-name:var(--font-editorial)]
                  text-xl
                  leading-tight

                  md:text-2xl
                "
              >
                {media.title}
              </h2>

              {media.description && (
                <p
                  className="
                    mt-2
                    max-w-[48rem]

                    font-[family-name:var(--font-utility)]
                    text-xs
                    leading-relaxed

                    text-[var(--color-text-muted)]

                    md:text-sm
                  "
                >
                  {media.description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(
    modal,
    document.body,
  );
}