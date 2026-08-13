"use client";

import {
  useState,
} from "react";

import YouTubePlayModal from "./YouTubePlayModal";

interface ArchitectVideoButtonProps {
  youtubeId: string;
  title: string;
}

export default function ArchitectVideoButton({
  youtubeId,
  title,
}: ArchitectVideoButtonProps) {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={`Play ${title}`}
        onClick={() =>
          setIsOpen(true)
        }
        className="
          absolute
          bottom-4
          left-1/2
          z-[3]
          flex
          h-11
          w-16
          -translate-x-1/2
          items-center
          justify-center
          rounded-full
          border-0
          bg-[#e51e1b]
          text-white
          shadow-[0_8px_24px_rgba(0,0,0,0.24)]
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
          className="ml-0.5 h-5 w-5"
        >
          <path
            d="M8 5.5 18 12 8 18.5Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <YouTubePlayModal
        isOpen={isOpen}
        youtubeId={youtubeId}
        title={title}
        onClose={() =>
          setIsOpen(false)
        }
      />
    </>
  );
}
