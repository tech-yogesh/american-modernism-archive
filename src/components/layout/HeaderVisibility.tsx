// src/components/layout/HeaderVisibility.tsx
"use client";

import { usePathname } from "next/navigation";

import GlobalHeader from "./GlobalHeader";

export default function HeaderVisibility() {
  const pathname = usePathname();

  if (pathname === "/about") {
    return null;
  }

  return <GlobalHeader />;
}