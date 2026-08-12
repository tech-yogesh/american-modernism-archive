import type {
  ArchitectCase,
  CaseProject,
} from "@/types/content";

import type { ImageAsset } from "@/types/media";

/*
 * =====================================================
 * MEDIA TYPES
 * =====================================================
 */

export interface CaseMediaPlacement {
  top: string;
  left: string;
  width: string;

  rotation?: number;
  zIndex?: number;
}

interface CaseMediaBase {
  id: string;
  placement: CaseMediaPlacement;
}

export interface CaseImageMediaItem
  extends CaseMediaBase {
  type: "image";

  image: ImageAsset;

  caption?: string;

  aspectRatio?: string;
}

export interface CaseInfoMediaItem
  extends CaseMediaBase {
  type: "info";

  title: string;

  eyebrow?: string;

  body: string[];

  backgroundColor?: string;
  textColor?: string;
}

export interface CaseVideoMediaItem
  extends CaseMediaBase {
  type: "video";

  title: string;
  youtubeId: string;

  description?: string;

  thumbnail?: ImageAsset;

  cardColor?: string;
  textColor?: string;
}

export type CaseMediaItem =
  | CaseImageMediaItem
  | CaseInfoMediaItem
  | CaseVideoMediaItem;

export type CaseModalMedia =
  | CaseImageMediaItem
  | CaseVideoMediaItem;

/*
 * =====================================================
 * CASE MEDIA BUILDER
 * =====================================================
 */

export interface BuiltCaseMedia {
  items: CaseMediaItem[];
  desktopHeight: string;
}

interface ProjectPalette {
  backgroundColor: string;
  textColor: string;
}

const projectPalettes: ProjectPalette[] = [
  {
    backgroundColor:
      "var(--color-tab-yellow)",

    textColor:
      "var(--color-bg)",
  },
  {
    backgroundColor:
      "var(--color-tab-blue)",

    textColor:
      "var(--color-text-primary)",
  },
  {
    backgroundColor:
      "var(--color-tab-red)",

    textColor:
      "var(--color-text-primary)",
  },
];

function getProjectBaseTop(
  projectIndex: number,
) {
  return projectIndex * 38;
}

function createInfoItem(
  project: CaseProject,
  projectIndex: number,
): CaseInfoMediaItem {
  const baseTop =
    getProjectBaseTop(projectIndex);

  const isEven =
    projectIndex % 2 === 0;

  const palette =
    projectPalettes[
      projectIndex %
        projectPalettes.length
    ];

  return {
    id: `${project.id}-info`,

    type: "info",

    eyebrow: project.year,

    title: project.title,

    body: [
      project.description,
    ],

    backgroundColor:
      palette.backgroundColor,

    textColor:
      palette.textColor,

    placement: {
      top: `${baseTop + 6}rem`,

      left:
        isEven
          ? "4%"
          : "49%",

      width: "43%",

      rotation:
        isEven
          ? -1
          : 1,

      zIndex: 25,
    },
  };
}

function createImageItems(
  project: CaseProject,
  projectIndex: number,
): CaseImageMediaItem[] {
  const baseTop =
    getProjectBaseTop(projectIndex);

  const isEven =
    projectIndex % 2 === 0;

  return project.images.map(
    (image, imageIndex) => {
      /*
       * Primary project image.
       */
      if (imageIndex === 0) {
        return {
          id: `${project.id}-image-${imageIndex}`,

          type: "image",

          image,

          caption:
            project.title,

          aspectRatio:
            "4 / 3",

          placement: {
            top: `${baseTop + 1}rem`,

            left:
              isEven
                ? "48%"
                : "4%",

            width: "45%",

            rotation:
              isEven
                ? 1
                : -1,

            zIndex: 16,
          },
        };
      }

      /*
       * Secondary image overlaps the
       * information card / primary image.
       */
      if (imageIndex === 1) {
        return {
          id: `${project.id}-image-${imageIndex}`,

          type: "image",

          image,

          caption:
            project.title,

          aspectRatio:
            "4 / 3",

          placement: {
            top: `${baseTop + 20}rem`,

            left:
              isEven
                ? "28%"
                : "41%",

            width: "42%",

            rotation:
              isEven
                ? -1
                : 1,

            zIndex: 34,
          },
        };
      }

      /*
       * Additional archival images.
       */
      return {
        id: `${project.id}-image-${imageIndex}`,

        type: "image",

        image,

        caption:
          project.title,

        aspectRatio:
          imageIndex % 2 === 0
            ? "3 / 4"
            : "4 / 3",

        placement: {
          top: `${
            baseTop +
            12 +
            imageIndex * 4
          }rem`,

          left:
            imageIndex % 2 === 0
              ? "61%"
              : "8%",

          width:
            imageIndex % 2 === 0
              ? "30%"
              : "34%",

          rotation:
            imageIndex % 2 === 0
              ? 1
              : -1,

          zIndex:
            18 + imageIndex,
        },
      };
    },
  );
}

function createVideoItem(
  project: CaseProject,
  projectIndex: number,
): CaseVideoMediaItem | null {
  if (!project.video) {
    return null;
  }

  const baseTop =
    getProjectBaseTop(projectIndex);

  const isEven =
    projectIndex % 2 === 0;

  return {
    id: `${project.id}-video`,

    type: "video",

    title:
      project.video.title,

    youtubeId:
      project.video.youtubeId,

    description:
      project.video.description,

    thumbnail:
      project.video.thumbnail,

    cardColor:
      "var(--color-tab-red)",

    textColor:
      "var(--color-text-primary)",

    placement: {
      top: `${baseTop + 26}rem`,

      left:
        isEven
          ? "7%"
          : "66%",

      width: "28%",

      rotation: 0,

      zIndex: 44,
    },
  };
}

/*
 * Converts the normal case/project data into the
 * presentation model consumed by CaseMediaCollage.
 *
 * CaseContent does not need to understand individual
 * image/info/video positioning.
 */
export function buildCaseMedia(
  caseData: ArchitectCase,
): BuiltCaseMedia {
  const items: CaseMediaItem[] = [];

  caseData.projects.forEach(
    (
      project,
      projectIndex,
    ) => {
      /*
       * Project information card.
       */
      items.push(
        createInfoItem(
          project,
          projectIndex,
        ),
      );

      /*
       * Project images.
       */
      items.push(
        ...createImageItems(
          project,
          projectIndex,
        ),
      );

      /*
       * Optional YouTube video.
       */
      const videoItem =
        createVideoItem(
          project,
          projectIndex,
        );

      if (videoItem) {
        items.push(
          videoItem,
        );
      }
    },
  );

  /*
   * Desktop uses absolute-positioned collage
   * pieces, so the container needs a known height.
   */
  const desktopHeight =
    `${Math.max(
      56,
      caseData.projects.length *
        38 +
        10,
    )}rem`;

  return {
    items,
    desktopHeight,
  };
}