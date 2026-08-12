import type {
  Metadata,
} from "next";

import AboutExperience from "@/components/about/AboutExperience";

import {
  aboutContent,
} from "@/data/about";

export const metadata: Metadata = {
  title:
    "About | American Modernism",

  description:
    "An editorial introduction to the American Modernism architectural archive.",
};

export default function AboutPage() {
  return (
    <AboutExperience
      content={
        aboutContent
      }
    />
  );
}