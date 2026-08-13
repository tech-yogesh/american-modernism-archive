import type { Category } from "@/types/content";

export const categories: Category[] = [
  {
    id: "organic-early-modernism",
    name: "Organic & Early Modernism",
    color: "var(--color-folder-organic)",
    description:
      "Exploring architects who connected modern design with materials, landscape, and human experience.",

    architects: [
      {
        name: "Frank Lloyd Wright",
        slug: "frank-lloyd-wright",
        tabColor: "var(--color-tab-blue)",
        textColor: "var(--color-text-primary)",
      },
      {
        name: "Irving Gill",
        slug: "irving-gill",
        tabColor: "var(--color-tab-red)",
        textColor: "var(--color-text-primary)",
      },
    ],

    archiveItems: [
      {
        id: "organic-archive-text",
        text:
          "Organic and early modern architecture explored a closer relationship between buildings, materials, landscape, and everyday life. These architects challenged historical conventions while developing spaces that felt more open, human, and connected to their surroundings.",
      },
    ],
  },

  {
    id: "expressive",
    name: "Expressive",
    color: "var(--color-folder-expressive)",
    description:
      "Architecture shaped by experimentation, sculptural form, and unconventional construction.",

    architects: [
      {
        name: "Frank Gehry",
        slug: "frank-gehry",
        tabColor: "var(--color-folder-expressive)",
        textColor: "var(--color-text-primary)",
      },
    ],

    archiveItems: [
      {
        id: "expressive-archive-text",
        text:
          "Expressive architecture pushed modern design toward experimentation, movement, and sculptural form. Instead of treating buildings as simple containers, these architects used structure, material, and geometry to create bold and highly individual spatial experiences.",
      },
    ],
  },

  {
    id: "monumental-modernism",
    name: "Monumental Modernism",
    color: "var(--color-folder-monumental)",
    description:
      "Large-scale modern architecture defined by geometry, structure, and a strong sense of permanence.",

    architects: [
      {
        name: "Louis Kahn",
        slug: "louis-kahn",
        tabColor: "var(--color-folder-monumental)",
        textColor: "var(--color-text-primary)",
      },
      {
        name: "I. M. Pei",
        slug: "i-m-pei",
        tabColor: "var(--color-tab-yellow)",
        textColor: "var(--color-bg)",
      },
      {
        name: "Paul Rudolph",
        slug: "paul-rudolph",
        tabColor: "var(--color-tab-black)",
        textColor: "var(--color-text-primary)",
      },
    ],

    archiveItems: [
      {
        id: "monumental-archive-text",
        text:
          "Monumental modernism focused on powerful geometry, structural clarity, and a strong sense of permanence. Large forms, carefully controlled light, and disciplined composition gave these buildings a civic and almost timeless presence.",
      },
    ],
  },

  {
    id: "contextual-transitional",
    name: "Contextual & Transitional Architecture",
    color: "var(--color-folder-contextual)",
    description:
      "Architectural work shaped by regional identity, historical context, and changing design movements.",

    architects: [
      {
        name: "Mary Colter",
        slug: "mary-colter",
        tabColor: "var(--color-folder-contextual)",
        textColor: "var(--color-text-primary)",
      },
      {
        name: "Louis Sullivan",
        slug: "louis-sullivan",
        tabColor: "var(--color-tab-blue)",
        textColor: "var(--color-text-primary)",
      },
    ],

    archiveItems: [
      {
        id: "contextual-archive-text",
        text:
          "Contextual and transitional architecture connected modern ideas with local identity, history, climate, and regional building traditions. These architects explored how new design approaches could evolve without completely disconnecting from the places and cultures around them.",
      },
    ],
  },
];

export const getCategoryById = (
  categoryId: string,
) =>
  categories.find(
    (category) =>
      category.id === categoryId,
  );

export const getCategoryByArchitectSlug = (
  architectSlug: string,
) =>
  categories.find((category) =>
    category.architects.some(
      (architect) =>
        architect.slug === architectSlug,
    ),
  );