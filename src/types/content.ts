import type { ImageAsset } from "@/types/media";

export type { ImageAsset } from "@/types/media";

export interface ArchitectSummary {
  name: string;
  slug: string;
  tabColor?: string;
  textColor?: string;
}

export interface ArchitectNavigationItem
  extends ArchitectSummary {
  categoryId: string;
}

export interface ArchiveItem {
  id: string;
  text: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  description: string;
  architects: ArchitectSummary[];
  archiveItems: ArchiveItem[];
}

export type ProjectLayout =
  | "large"
  | "split"
  | "collage";

export interface CaseProjectVideo {
  title: string;
  youtubeId: string;

  description?: string;

  thumbnail?: ImageAsset;
}

export interface CaseProject {
  id: string;
  title: string;
  year: string;
  description: string;
  layout: ProjectLayout;
  images: ImageAsset[];

  video?: CaseProjectVideo;
}

export interface ArchitectCase {
  slug: string;
  name: string;
  categoryId: string;
  portrait: ImageAsset;
  born: string;
  died: string;
  bio: string[];
  projects: CaseProject[];
}

export interface AboutSection {
  id: string;
  heading?: string;
  paragraphs: string[];
  image?: ImageAsset;
}

export interface AboutContent {
  title: string;
  introduction: string;
  heroImage: ImageAsset;
  sections: AboutSection[];
  closingText: string;
}