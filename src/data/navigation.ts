import { categories } from "@/data/categories";

import type {
  ArchitectNavigationItem,
} from "@/types/content";

/*
 * =====================================================
 * GLOBAL CASE SEQUENCE
 * =====================================================
 *
 * This is the ONE definition that controls the order
 * of case-to-case bottom navigation.
 *
 * To reorder the experience later, change only this
 * array.
 *
 * Components must never hard-code architect ordering.
 */
const architectSequenceSlugs = [
  "frank-lloyd-wright",
  "irving-gill",
  "frank-gehry",
  "louis-kahn",
  "i-m-pei",
  "paul-rudolph",
  "mary-colter",
  "louis-sullivan",
] as const;

/*
 * Build a lookup from our existing category data.
 *
 * categories.ts remains responsible for:
 *
 * - architect name
 * - slug
 * - tab color
 * - text color
 * - category membership
 *
 * navigation.ts owns only global navigation order.
 */
const architectBySlug =
  new Map<string, ArchitectNavigationItem>(
    categories.flatMap((category) =>
      category.architects.map(
        (architect) => [
          architect.slug,
          {
            ...architect,
            categoryId: category.id,
          },
        ] as const,
      ),
    ),
  );

/*
 * Convert the ordered slug definition into complete
 * navigation objects.
 *
 * We fail immediately during development if someone
 * adds an invalid slug to architectSequenceSlugs.
 */
export const architectSequence: ArchitectNavigationItem[] =
  architectSequenceSlugs.map((slug) => {
    const architect =
      architectBySlug.get(slug);

    if (!architect) {
      throw new Error(
        `Architect "${slug}" exists in navigation sequence but was not found in categories.ts.`,
      );
    }

    return architect;
  });

/*
 * Resolve any architect from the global sequence.
 */
export function getArchitectNavigationItem(
  slug: string,
): ArchitectNavigationItem | undefined {
  return architectSequence.find(
    (architect) =>
      architect.slug === slug,
  );
}

/*
 * Global next-case navigation.
 *
 * Modulo creates the loop automatically:
 *
 * Louis Sullivan
 *      ↓
 * Frank Lloyd Wright
 */
export function getNextArchitect(
  currentSlug: string,
): ArchitectNavigationItem | undefined {
  const currentIndex =
    architectSequence.findIndex(
      (architect) =>
        architect.slug === currentSlug,
    );

  if (currentIndex === -1) {
    return undefined;
  }

  const nextIndex =
    (currentIndex + 1) %
    architectSequence.length;

  return architectSequence[nextIndex];
}

/*
 * Useful for future reverse navigation / gestures.
 *
 * Frank Lloyd Wright
 *      ↑
 * Louis Sullivan
 */
export function getPreviousArchitect(
  currentSlug: string,
): ArchitectNavigationItem | undefined {
  const currentIndex =
    architectSequence.findIndex(
      (architect) =>
        architect.slug === currentSlug,
    );

  if (currentIndex === -1) {
    return undefined;
  }

  const previousIndex =
    (
      currentIndex -
      1 +
      architectSequence.length
    ) %
    architectSequence.length;

  return architectSequence[
    previousIndex
  ];
}