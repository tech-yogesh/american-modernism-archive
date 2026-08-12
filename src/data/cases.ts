import type { ArchitectCase } from "@/types/content";

export const cases: ArchitectCase[] = [
  {
    slug: "frank-lloyd-wright",
    name: "Frank Lloyd Wright",
    categoryId: "organic-early-modernism",

    portrait: {
      src: "/images/cases/frank-lloyd-wright/portrait.jpg",
      alt: "Portrait of Frank Lloyd Wright",
    },

    born: "1867",
    died: "1959",

    bio: [
      "An influential American architect known for developing buildings around their surroundings, materials, and intended use.",
      "His work explored open planning, strong horizontal forms, and closer relationships between architecture and landscape.",
    ],

    projects: [
      {
        id: "wright-project-1",
        title: "Residential Study",
        year: "1930s",

        description:
          "A study highlighting spatial organization, natural materials, and integration with the surrounding landscape.",

        layout: "large",

        images: [
          {
            src: "/images/cases/frank-lloyd-wright/project-1-01.jpg",
            alt: "Frank Lloyd Wright residential architecture exterior",
          },
          {
            src: "/images/cases/frank-lloyd-wright/project-1-02.jpg",
            alt: "Frank Lloyd Wright residential architecture detail",
          },
          {
            src: "/images/cases/frank-lloyd-wright/project-1-03.jpg",
            alt: "Frank Lloyd Wright residential interior",
          },
        ],
      },

      {
        id: "wright-project-2",
        title: "Urban House Study",
        year: "1910s",

        description:
          "A study focused on horizontal composition, strong structural lines, and interconnected interior spaces.",

        layout: "split",

        images: [
          {
            src: "/images/cases/frank-lloyd-wright/project-2-01.jpg",
            alt: "Frank Lloyd Wright house exterior",
          },
          {
            src: "/images/cases/frank-lloyd-wright/project-2-02.jpg",
            alt: "Frank Lloyd Wright architectural detail",
          },
          {
            src: "/images/cases/frank-lloyd-wright/project-2-03.jpg",
            alt: "Frank Lloyd Wright architectural drawing",
          },
        ],
      },

      {
        id: "wright-project-3",
        title: "Cultural Building Study",
        year: "1950s",

        description:
          "A study exploring circulation, geometric repetition, and a continuous architectural experience.",

        layout: "collage",

        images: [
          {
            src: "/images/cases/frank-lloyd-wright/project-3-01.jpg",
            alt: "Frank Lloyd Wright cultural building exterior",
          },
          {
            src: "/images/cases/frank-lloyd-wright/project-3-02.jpg",
            alt: "Frank Lloyd Wright architectural drawing",
          },
          {
            src: "/images/cases/frank-lloyd-wright/project-3-03.jpg",
            alt: "Frank Lloyd Wright cultural building interior",
          },
        ],
      },
    ],
  },

  {
    slug: "irving-gill",
    name: "Irving Gill",
    categoryId: "organic-early-modernism",

    portrait: {
      src: "/images/cases/irving-gill/portrait.jpg",
      alt: "Portrait of Irving Gill",
    },

    born: "1870",
    died: "1936",

    bio: [
      "An American architect associated with simplified forms and early modern architectural ideas.",
    ],

    projects: [
      {
        id: "gill-project-1",
        title: "Minimal Residence Study",
        year: "1910s",

        description:
          "A study of simple geometry, restrained ornament, clean surfaces, and functional planning.",

        layout: "collage",

        images: [
          {
            src: "/images/cases/irving-gill/project-1-01.jpg",
            alt: "Irving Gill residential architecture",
          },
          {
            src: "/images/cases/irving-gill/project-1-02.jpg",
            alt: "Irving Gill building detail",
          },
          {
            src: "/images/cases/irving-gill/project-1-03.jpg",
            alt: "Irving Gill historic architectural photograph",
          },
          {
            src: "/images/cases/irving-gill/project-1-04.jpg",
            alt: "Irving Gill architectural drawing",
          },
        ],
      },
    ],
  },

  {
    slug: "frank-gehry",
    name: "Frank Gehry",
    categoryId: "expressive",

    portrait: {
      src: "/images/cases/frank-gehry/portrait.jpg",
      alt: "Portrait of Frank Gehry",
    },

    born: "1929",
    died: "—",

    bio: [
      "An architect widely associated with experimental forms, unconventional materials, and sculptural buildings.",
      "His projects frequently challenge traditional expectations of structure and architectural composition.",
    ],

    projects: [
      {
        id: "gehry-project-1",
        title: "Cultural Center Study",
        year: "1990s",

        description:
          "A study examining fragmented volumes, expressive surfaces, and architecture treated as sculpture.",

        layout: "large",

        images: [
          {
            src: "/images/cases/frank-gehry/project-1-01.jpg",
            alt: "Frank Gehry cultural building exterior",
          },
          {
            src: "/images/cases/frank-gehry/project-1-02.jpg",
            alt: "Frank Gehry sculptural facade",
          },
          {
            src: "/images/cases/frank-gehry/project-1-03.jpg",
            alt: "Frank Gehry architectural detail",
          },
        ],
      },

      {
        id: "gehry-project-2",
        title: "Concert Hall Study",
        year: "2000s",

        description:
          "A project exploring flowing exterior forms and complex interior spatial geometry.",

        layout: "collage",

        images: [
          {
            src: "/images/cases/frank-gehry/project-2-01.jpg",
            alt: "Frank Gehry concert hall exterior",
          },
          {
            src: "/images/cases/frank-gehry/project-2-02.jpg",
            alt: "Frank Gehry concert hall interior",
          },
          {
            src: "/images/cases/frank-gehry/project-2-03.jpg",
            alt: "Frank Gehry concert hall architectural detail",
          },
        ],
      },

      {
        id: "gehry-project-3",
        title: "Urban Form Study",
        year: "2010s",

        description:
          "An exploration of expressive modern architecture within a dense urban environment.",

        layout: "split",

        images: [
          {
            src: "/images/cases/frank-gehry/project-3-01.jpg",
            alt: "Frank Gehry urban architecture",
          },
          {
            src: "/images/cases/frank-gehry/project-3-02.jpg",
            alt: "Frank Gehry urban facade detail",
          },
          {
            src: "/images/cases/frank-gehry/project-3-03.jpg",
            alt: "Frank Gehry urban architecture perspective",
          },
        ],
      },
    ],
  },

  {
    slug: "louis-kahn",
    name: "Louis Kahn",
    categoryId: "monumental-modernism",

    portrait: {
      src: "/images/cases/louis-kahn/portrait.jpg",
      alt: "Portrait of Louis Kahn",
    },

    born: "1901",
    died: "1974",

    bio: [
      "An architect known for monumental forms, carefully controlled daylight, and expressive use of structure.",
      "His buildings often emphasize material weight, geometry, and powerful spatial sequences.",
    ],

    projects: [
      {
        id: "kahn-project-1",
        title: "Research Institute Study",
        year: "1960s",

        description:
          "A study focused on symmetry, monumental space, structural clarity, and a strong relationship with landscape.",

        layout: "large",

        images: [
          {
            src: "/images/cases/louis-kahn/project-1-01.jpg",
            alt: "Louis Kahn research institute architecture",
          },
          {
            src: "/images/cases/louis-kahn/project-1-02.jpg",
            alt: "Louis Kahn monumental exterior space",
          },
          {
            src: "/images/cases/louis-kahn/project-1-03.jpg",
            alt: "Louis Kahn concrete architectural detail",
          },
        ],
      },

      {
        id: "kahn-project-2",
        title: "Library Study",
        year: "1970s",

        description:
          "A study examining natural light, structural order, geometry, and communal interior space.",

        layout: "split",

        images: [
          {
            src: "/images/cases/louis-kahn/project-2-01.jpg",
            alt: "Louis Kahn library exterior",
          },
          {
            src: "/images/cases/louis-kahn/project-2-02.jpg",
            alt: "Louis Kahn library interior",
          },
          {
            src: "/images/cases/louis-kahn/project-2-03.jpg",
            alt: "Louis Kahn library structural detail",
          },
        ],
      },

      {
        id: "kahn-project-3",
        title: "Civic Complex Study",
        year: "1980s",

        description:
          "An architectural study centered on large geometric forms, strong structural rhythm, and ceremonial spaces.",

        layout: "collage",

        images: [
          {
            src: "/images/cases/louis-kahn/project-3-01.jpg",
            alt: "Louis Kahn civic architecture",
          },
          {
            src: "/images/cases/louis-kahn/project-3-02.jpg",
            alt: "Louis Kahn architectural facade detail",
          },
          {
            src: "/images/cases/louis-kahn/project-3-03.jpg",
            alt: "Louis Kahn monumental building interior",
          },
        ],
      },
    ],
  },

  {
    slug: "i-m-pei",
    name: "I. M. Pei",
    categoryId: "monumental-modernism",

    portrait: {
      src: "/images/cases/i-m-pei/portrait.jpg",
      alt: "Portrait of I. M. Pei",
    },

    born: "1917",
    died: "2019",

    bio: [
      "An architect recognized for precise geometry, refined modern materials, and carefully composed civic buildings.",
    ],

    projects: [
      {
        id: "pei-project-1",
        title: "Museum Study",
        year: "1980s",

        description:
          "A study exploring geometric contrast between historic context and modern architecture.",

        layout: "collage",

        images: [
          {
            src: "/images/cases/i-m-pei/project-1-01.jpg",
            alt: "I. M. Pei museum architecture",
          },
          {
            src: "/images/cases/i-m-pei/project-1-02.jpg",
            alt: "I. M. Pei geometric museum exterior",
          },
          {
            src: "/images/cases/i-m-pei/project-1-03.jpg",
            alt: "I. M. Pei museum interior",
          },
          {
            src: "/images/cases/i-m-pei/project-1-04.jpg",
            alt: "I. M. Pei architectural detail",
          },
        ],
      },
    ],
  },

  {
    slug: "paul-rudolph",
    name: "Paul Rudolph",
    categoryId: "monumental-modernism",

    portrait: {
      src: "/images/cases/paul-rudolph/portrait.jpg",
      alt: "Portrait of Paul Rudolph",
    },

    born: "1918",
    died: "1997",

    bio: [
      "An American architect associated with complex spatial arrangements and expressive concrete structures.",
    ],

    projects: [
      {
        id: "rudolph-project-1",
        title: "Concrete Complex Study",
        year: "1960s",

        description:
          "A study examining layered circulation, heavy materials, complex geometry, and dramatic structural expression.",

        layout: "collage",

        images: [
          {
            src: "/images/cases/paul-rudolph/project-1-01.jpg",
            alt: "Paul Rudolph concrete architecture",
          },
          {
            src: "/images/cases/paul-rudolph/project-1-02.jpg",
            alt: "Paul Rudolph concrete structural detail",
          },
          {
            src: "/images/cases/paul-rudolph/project-1-03.jpg",
            alt: "Paul Rudolph interior architecture",
          },
          {
            src: "/images/cases/paul-rudolph/project-1-04.jpg",
            alt: "Paul Rudolph architectural drawing",
          },
        ],
      },
    ],
  },

  {
    slug: "mary-colter",
    name: "Mary Colter",
    categoryId: "contextual-transitional",

    portrait: {
      src: "/images/cases/mary-colter/portrait.jpg",
      alt: "Portrait of Mary Colter",
    },

    born: "1869",
    died: "1958",

    bio: [
      "An architect and designer known for buildings shaped by regional materials, landscape, and cultural context.",
    ],

    projects: [
      {
        id: "colter-project-1",
        title: "Regional Lodge Study",
        year: "1930s",

        description:
          "A study exploring regional materials and architecture integrated closely with its natural setting.",

        layout: "collage",

        images: [
          {
            src: "/images/cases/mary-colter/project-1-01.jpg",
            alt: "Mary Colter regional architecture",
          },
          {
            src: "/images/cases/mary-colter/project-1-02.jpg",
            alt: "Mary Colter regional material detail",
          },
          {
            src: "/images/cases/mary-colter/project-1-03.jpg",
            alt: "Mary Colter landscape architecture relationship",
          },
          {
            src: "/images/cases/mary-colter/project-1-04.jpg",
            alt: "Mary Colter architectural interior",
          },
        ],
      },
    ],
  },

  {
    slug: "louis-sullivan",
    name: "Louis Sullivan",
    categoryId: "contextual-transitional",

    portrait: {
      src: "/images/cases/louis-sullivan/portrait.jpg",
      alt: "Portrait of Louis Sullivan",
    },

    born: "1856",
    died: "1924",

    bio: [
      "An influential architect whose work helped define early tall-building design and modern architectural thinking.",
    ],

    projects: [
      {
        id: "sullivan-project-1",
        title: "Commercial Building Study",
        year: "1890s",

        description:
          "A study examining vertical composition, structural expression, ornament, and early high-rise architecture.",

        layout: "collage",

        images: [
          {
            src: "/images/cases/louis-sullivan/project-1-01.jpg",
            alt: "Louis Sullivan early commercial architecture",
          },
          {
            src: "/images/cases/louis-sullivan/project-1-02.jpg",
            alt: "Louis Sullivan historic facade",
          },
          {
            src: "/images/cases/louis-sullivan/project-1-03.jpg",
            alt: "Louis Sullivan ornamental architectural detail",
          },
          {
            src: "/images/cases/louis-sullivan/project-1-04.jpg",
            alt: "Louis Sullivan commercial building detail",
          },
        ],
      },
    ],
  },
];

export const getCaseBySlug = (
  slug: string,
) =>
  cases.find(
    (architectCase) =>
      architectCase.slug === slug,
  );