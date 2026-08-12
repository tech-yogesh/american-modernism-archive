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
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat massa id arcu pulvinar, maximus maximus erat maximus. Ut sed enim ultricies lorem malesuada congue. Sed et risus libero. Suspendisse nisi sapien, sodales sit amet tellus sed, facilisis cursus dolor.",
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
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae erat sed mauris malesuada volutpat. Integer vulputate, risus sed posuere facilisis, lorem sapien consequat tellus, vitae ullamcorper massa justo vel erat. Suspendisse potenti. Curabitur feugiat neque vel lorem interdum, vitae dignissim ligula tincidunt.",
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
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis malesuada neque eget lectus luctus, sed volutpat mauris volutpat. Nulla facilisi. Aliquam erat volutpat. Integer vitae arcu vitae justo tincidunt tincidunt. Vivamus feugiat, purus vitae pellentesque consectetur, velit lectus posuere magna, vitae malesuada neque lorem sed augue.",
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
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat massa id arcu pulvinar, maximus maximus erat maximus. Ut sed enim ultricies lorem malesuada congue. Sed et risus libero. Suspendisse nisi sapien, sodales sit amet tellus sed, facilisis cursus dolor. Fusce velit felis, semper sit amet dolor id.",
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