import FolderStack from "@/components/home/FolderStack";
import HomeHero from "@/components/home/HomeHero";
import ArchiveFooter from "@/components/layout/ArchiveFooter";
import { categories } from "@/data/categories";

export default function HomePage() {
  const lastFolder =
  categories[
    categories.length - 1
  ];

const footerColor =
  lastFolder?.color ??
  "var(--color-folder-contextual)";
  return (
    <>
      <HomeHero />
      <FolderStack />
      <ArchiveFooter
  backgroundColor={
    footerColor
  }
/>
    </>
  );
}