"use client";

import {
  useEffect,
} from "react";
import { createPortal } from "react-dom";

interface YouTubePlayModalProps {
  isOpen: boolean;
  youtubeId: string;
  title: string;
  onClose: () => void;
}

export default function YouTubePlayModal({
  isOpen,
  youtubeId,
  title,
  onClose,
}: YouTubePlayModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

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

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [
    isOpen,
    onClose,
  ]);

  if (
    !isOpen ||
    typeof document === "undefined"
  ) {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} video`}
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
      className="
        fixed
        inset-0
        z-[2000]
        flex
        items-center
        justify-center
        bg-black/90
        p-4
        md:p-8
      "
    >
      <div
        className="
          relative
          w-full
          max-w-[72rem]
        "
      >
        <button
          type="button"
          aria-label="Close video"
          autoFocus
          onClick={onClose}
          className="
            absolute
            -top-14
            right-0
            z-[2]
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border-0
            bg-[#e51e1b]
            text-white
            transition-transform
            duration-200
            hover:scale-105
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-white
          "
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
          >
            <path
              d="M6 6 18 18M18 6 6 18"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </button>

        <div
          className="
            aspect-video
            w-full
            overflow-hidden
            rounded-[0.5rem]
            bg-black
          "
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            className="h-full w-full"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share
            "
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
