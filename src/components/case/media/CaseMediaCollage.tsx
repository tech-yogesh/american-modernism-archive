"use client";

import {
  useCallback,
  useState,
  type CSSProperties,
} from "react";

import CaseImageItem from "./CaseImageItem";
import CaseInfoCard from "./CaseInfoCard";
import CaseVideoCard from "./CaseVideoCard";
import MediaModal from "./MediaModal";

import type {
  CaseMediaItem,
  CaseModalMedia,
} from "@/types/case-media";

interface CaseMediaCollageProps {
  items: CaseMediaItem[];

  /*
   * Desktop collage needs a known composition
   * height because its pieces become absolute.

   * Example:
   *
   * "70rem"
   * "90rem"
   * "120rem"
   */
  desktopHeight?: string;
}

export default function CaseMediaCollage({
  items,
  desktopHeight = "78rem",
}: CaseMediaCollageProps) {
  /*
   * Text cards use this only for visual stacking.
   */
  const [
    frontItemId,
    setFrontItemId,
  ] = useState<string | null>(
    null,
  );

  /*
   * Images and videos share the same modal shell.
   */
  const [
    activeMedia,
    setActiveMedia,
  ] = useState<CaseModalMedia | null>(
    null,
  );

  const handleInfoActivate =
    useCallback(
      (id: string) => {
        setFrontItemId(id);
      },
      [],
    );

  const handleImageOpen =
    useCallback(
      (
        item: Extract<
          CaseMediaItem,
          {
            type: "image";
          }
        >,
      ) => {
        setActiveMedia(item);
      },
      [],
    );

  const handleVideoOpen =
    useCallback(
      (
        item: Extract<
          CaseMediaItem,
          {
            type: "video";
          }
        >,
      ) => {
        setActiveMedia(item);
      },
      [],
    );

  const handleModalClose =
    useCallback(() => {
      setActiveMedia(null);
    }, []);

  const collageStyle = {
    "--case-collage-height":
      desktopHeight,
  } as CSSProperties;

  return (
    <>
      <section
        data-case-media-collage
        aria-label="Architect archive"
        style={collageStyle}
        className="
          relative

          grid
          gap-6

          lg:block
          lg:min-h-[var(--case-collage-height)]
        "
      >
        {items.map((item) => {
          switch (item.type) {
            case "image":
              return (
                <CaseImageItem
                  key={item.id}
                  item={item}
                  onOpen={
                    handleImageOpen
                  }
                />
              );

            case "info":
              return (
                <CaseInfoCard
                  key={item.id}
                  item={item}
                  isFront={
                    frontItemId ===
                    item.id
                  }
                  onActivate={
                    handleInfoActivate
                  }
                />
              );

            case "video":
              return (
                <CaseVideoCard
                  key={item.id}
                  item={item}
                  onOpen={
                    handleVideoOpen
                  }
                />
              );

            default:
              return null;
          }
        })}
      </section>

      <MediaModal
        media={activeMedia}
        onClose={
          handleModalClose
        }
      />
    </>
  );
}