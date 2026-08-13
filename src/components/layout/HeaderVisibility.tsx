// src/components/layout/HeaderVisibility.tsx
"use client";

import {
  useEffect,
  useState,
} from "react";

import { usePathname } from "next/navigation";

import GlobalHeader from "./GlobalHeader";

export default function HeaderVisibility() {
  const pathname = usePathname();

  const [
    isPastHalfway,
    setIsPastHalfway,
  ] = useState(false);

  useEffect(() => {
    const updateHeaderVisibility = () => {
      const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const halfwayPoint =
        maxScroll * 0.5;

      const shouldHide =
        maxScroll > 0 &&
        window.scrollY >= halfwayPoint;

      setIsPastHalfway(
        (currentValue) =>
          currentValue === shouldHide
            ? currentValue
            : shouldHide,
      );
    };

    updateHeaderVisibility();

    window.addEventListener(
      "scroll",
      updateHeaderVisibility,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      updateHeaderVisibility,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateHeaderVisibility,
      );

      window.removeEventListener(
        "resize",
        updateHeaderVisibility,
      );
    };
  }, [pathname]);

  if (pathname === "/about") {
    return null;
  }

  return (
    <div
      className={`
        sticky
        top-0
        z-[var(--z-header)]

        bg-[var(--color-bg)]

        will-change-[transform,opacity,filter]

        transition-[transform,opacity,filter]
        duration-[550ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          isPastHalfway
            ? "pointer-events-none -translate-y-[115%] opacity-0 blur-[2px]"
            : "translate-y-0 opacity-100 blur-0"
        }
      `}
    >
      <GlobalHeader />
    </div>
  );
}
