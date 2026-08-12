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
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat massa id arcu pulvinar, maximus maximus erat maximus. Ut sed enim ultricies lorem malesuada congue. Sed et risus libero. Suspendisse nisi sapien, sodales sit amet tellus sed, facilisis cursus dolor. Fusce velit felis, semper sit amet dolor id, facilisis ultrices augue. Curabitur varius elit nec volutpat pharetra. Sed nec dapibus arcu. Integer purus sem, sodales eget orci ut, pulvinar dignissim ante. Nullam varius vestibulum turpis, ut sollicitudin magna convallis nec. Curabitur vestibulum ex at urna suscipit, vitae ultrices lorem dictum. Integer mauris sapien, faucibus ac mollis ut, dapibus condimentum libero. Nullam enim est, sagittis ut nisi vel, sodales laoreet lorem.",

        "Nullam interdum justo nec neque egestas bibendum. Pellentesque ut luctus elit, eu fermentum arcu. Nunc sagittis nibh in est porta, eu luctus magna dapibus. Suspendisse mi metus, pharetra in tristique eu, vulputate ac nunc. Cras non convallis tortor. In accumsan mi id commodo tincidunt. Curabitur interdum pulvinar enim, et facilisis ligula rhoncus vel. Sed scelerisque est turpis, sed venenatis sapien maximus et. Sed tincidunt vulputate lectus nec pellentesque. Mauris vel eros eget nibh ultricies euismod. Maecenas justo metus, facilisis non blandit a, fermentum ut erat.",

        "Morbi sapien mauris, mattis id quam quis, congue lacinia metus. Aenean dapibus purus id sapien molestie rutrum. Phasellus ultrices massa vitae magna rutrum varius. Fusce nibh ante, vehicula vitae metus eget, interdum condimentum dui. Quisque non eros erat. Nunc feugiat tortor eget urna aliquam tristique. Maecenas varius odio sit amet turpis pharetra faucibus. Nulla luctus, purus quis elementum pretium, nunc leo auctor purus, ut tristique turpis felis at nunc. Donec sapien lectus, aliquam ut neque eget, vestibulum dapibus eros. Sed risus nunc, interdum a enim sit amet, accumsan vestibulum arcu. Sed sit amet ultrices ante. Aliquam sit amet mollis sapien, id tincidunt felis. Cras mauris lacus, bibendum sed dignissim id, auctor nec ex. Maecenas tempus neque varius risus laoreet, eget fringilla sapien hendrerit.",
      ],
    },

    {
      id: "about-archive-thinking",
      paragraphs: [
        "Nullam interdum justo nec neque egestas bibendum. Pellentesque ut luctus elit, eu fermentum arcu. Nunc sagittis nibh in est porta, eu luctus magna dapibus. Suspendisse mi metus, pharetra in tristique eu, vulputate ac nunc. Cras non convallis tortor. In accumsan mi id commodo tincidunt. Curabitur interdum pulvinar enim, et facilisis ligula rhoncus vel. Sed scelerisque est turpis, sed venenatis sapien maximus et. Sed tincidunt vulputate lectus nec pellentesque. Mauris vel eros eget nibh ultricies euismod. Maecenas justo metus, facilisis non blandit a, fermentum ut erat.",

        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat massa id arcu pulvinar, maximus maximus erat maximus. Ut sed enim ultricies lorem malesuada congue. Sed et risus libero. Suspendisse nisi sapien, sodales sit amet tellus sed, facilisis cursus dolor. Fusce velit felis, semper sit amet dolor id, facilisis ultrices augue. Curabitur varius elit nec volutpat pharetra. Sed nec dapibus arcu. Integer purus sem, sodales eget orci ut, pulvinar dignissim ante. Nullam varius vestibulum turpis, ut sollicitudin magna convallis nec. Curabitur vestibulum ex at urna suscipit, vitae ultrices lorem dictum. Integer mauris sapien, faucibus ac mollis ut, dapibus condimentum libero. Nullam enim est, sagittis ut nisi vel, sodales laoreet lorem.",

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