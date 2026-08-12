import type { ImageAsset } from "@/types/content";

export interface AboutSlide {
  id: string;
  image: ImageAsset;
  caption: string;
}

export interface AboutNarrativeSection {
  id: string;
  paragraphs: string[];
}

export interface AboutPageContent {
  heading: string;
  slides: AboutSlide[];
  sections: AboutNarrativeSection[];
}

export const aboutContent: AboutPageContent = {
  heading:
    "MODERNISM IS NEVER ONE STORY. LOOK CLOSER AND THE EDGES START TO ARGUE.",

  slides: [
    {
      id: "about-modernism",
      image: {
        src: "/images/about/about-hero.jpg",
        alt: "Modernist civic architecture",
      },
      caption:
        "American Modernism, civic architecture and monumental geometry.",
    },

    {
      id: "about-process",
      image: {
        src: "/images/about/about-process.jpg",
        alt: "Architectural drawing and modernist design study",
      },
      caption:
        "Drawings, studies and fragments collected across the archive.",
    },

    {
      id: "about-archive",
      image: {
        src: "/images/about/about-archive.jpg",
        alt: "Modern architectural archive",
      },
      caption:
        "Architecture understood through photographs, notes and material evidence.",
    },
  ],

  sections: [
    {
      id: "about-introduction",
      paragraphs: [
        "American Modernism Archive is an experimental digital collection exploring architecture through photographs, drawings, notes, and visual studies.Rather than presenting buildings as isolated objects, the archive brings together fragments that reveal how architectural ideas develop — through materials, structure, landscape, geometry, and the people who shape them.",

        "Architecture is often remembered through a single iconic photograph. But every building begins with a much wider collection of decisions, sketches, experiments, constraints, and observations.By placing these elements beside one another, the archive encourages a slower way of exploring architecture.Images overlap. Drawings sit beside photographs. Notes and references become part of the experience.The intention is to make digital browsing feel closer to opening a physical research folder.",

        "American modernism was never a single style.Architects approached modern ideas in very different ways. Some looked toward landscape and natural materials. Others explored monumental geometry, expressive structures, new construction methods, or relationships with regional traditions.These differences are organized here as a visual archive rather than a strict historical timeline.Each folder represents a direction of architectural thinking, while each individual file offers another perspective on how those ideas developed.",
      ],
    },

    {
      id: "about-archive-thinking",
      paragraphs: [
        "The interface treats photographs, drawings, and documents as objects rather than ordinary website cards.They can overlap, shift, reveal one another, and move across the page.This physical quality is intentional.The goal is to create an experience that feels less like navigating a database and more like spending time at a research desk — opening folders, discovering references, and following connections between architectural ideas.",

        "American Modernism Archive is an independent frontend project created to explore editorial web design, responsive interfaces, motion, and experimental navigation.The content is presented as an educational and visual study of modern architecture.The archive is designed to encourage curiosity: open a folder, explore a file, and discover architecture through the fragments that surround it.",

        "Instead of treating architecture as a collection of isolated masterpieces, the interface treats every piece of material as part of a larger conversation. The result is deliberately closer to opening a physical research folder than browsing a conventional gallery.",
      ],
    },

    {
      id: "about-american-modernism",
      paragraphs: [
        "American Modernism developed through several competing conditions at once. Rapid urban growth demanded new building types. Industrial production changed what could be manufactured and assembled. New engineering systems increased scale while architects continued searching for spaces that still felt connected to individual experience.",

        "Frank Lloyd Wright explored continuity between building and landscape. Irving Gill stripped architecture toward elementary form. Louis Kahn pursued monumentality through structure and light, while Paul Rudolph pushed concrete into dense spatial systems. Other architects negotiated historic identity, regional materials and the increasingly vertical American city.",

        "None of these approaches completely explains the period. Together they show why modern architecture is more useful when understood as a network rather than a straight line.",

        "The purpose of this archive is therefore not to provide a final answer. It is to create a place where photographs, projects, drawings and ideas can remain close enough to one another that new relationships become visible.",
      ],
    },
  ],
};