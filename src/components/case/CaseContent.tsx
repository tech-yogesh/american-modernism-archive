import Image from "next/image";

import CaseMediaCollage from "./media/CaseMediaCollage";

import { buildCaseMedia } from "@/types/case-media";

import type {
  ArchitectCase,
} from "@/types/content";

interface CaseContentProps {
  caseData: ArchitectCase;
}

export default function CaseContent({
  caseData,
}: CaseContentProps) {
  const {
    items,
    desktopHeight,
  } = buildCaseMedia(
    caseData,
  );

  return (
    <div
      data-case-content
      className="
        relative
      "
    >
      {/*
        ================================================
        ARCHITECT INTRODUCTION / PAPER
        ================================================

        This stays relatively calm and editorial.

        The more physical layered archive begins
        underneath it.
      */}
      <section
        className="
          relative
          z-[2]

          bg-[var(--color-text-primary)]
          text-[var(--color-bg)]
        "
      >
        <div
          className="
            grid
            gap-8

            p-6

            md:grid-cols-[minmax(14rem,0.8fr)_minmax(0,1.7fr)]
            md:gap-10
            md:p-8

            lg:grid-cols-[minmax(18rem,0.75fr)_minmax(0,1.7fr)]
            lg:gap-16
            lg:p-12
          "
        >
          {/*
            ==============================================
            PORTRAIT / ARCHIVE METADATA
            ==============================================
          */}
          <aside>
            <div
              className="
                relative
                aspect-[4/5]
                w-full
                overflow-hidden

                bg-black/10
              "
            >
              <Image
                src={caseData.portrait.src}
                alt={caseData.portrait.alt}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="
    (max-width: 767px) calc(100vw - 5rem),
    (max-width: 1023px) 32vw,
    24vw
  "
                className="
    object-cover
    object-center
  "
              />
            </div>

            <dl
              className="
                mt-8
                space-y-5

                border-t
                border-black/20

                pt-6

                font-[family-name:var(--font-utility)]
                text-xs

                md:text-sm
              "
            >
              <div>
                <dt className="font-bold">
                  Born
                </dt>

                <dd className="mt-1">
                  {caseData.born}
                </dd>
              </div>

              <div>
                <dt className="font-bold">
                  Died
                </dt>

                <dd className="mt-1">
                  {caseData.died}
                </dd>
              </div>
            </dl>
          </aside>

          {/*
            ==============================================
            BIOGRAPHY
            ==============================================
          */}
          <div
            className="
              flex
              flex-col
              justify-center
            "
          >
            <div
              className="
                max-w-[44rem]
                space-y-7

                font-[family-name:var(--font-editorial)]
                text-xl
                leading-[1.45]

                md:text-2xl

                lg:text-[2rem]
              "
            >
              {caseData.bio.map(
                (
                  paragraph,
                  index,
                ) => (
                  <p
                    key={`${caseData.slug}-bio-${index}`}
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/*
        ================================================
        ARCHIVAL COLLAGE
        ================================================

        This replaces the old conventional list of
        ProjectSection components.

        Desktop:
        overlapping archive pieces.

        Mobile / tablet:
        safe stacked composition.
      */}
      {items.length > 0 && (
        <section
          aria-label={`${caseData.name} project archive`}
          className="
            relative
            z-[1]

            bg-[var(--color-bg)]

            px-4
            py-8

            text-[var(--color-text-primary)]

            md:px-6
            md:py-10

            lg:px-8
            lg:py-14
          "
        >
          {/*
            Small archive label remains understated.
          */}
          <div
            className="
              mb-8
              flex
              items-center
              justify-between
              gap-6

              border-b
              border-white/15

              pb-4

              font-[family-name:var(--font-utility)]
              text-[0.6rem]
              uppercase
              tracking-[0.08em]

              text-[var(--color-text-muted)]

              md:mb-10
              md:text-xs

              lg:mb-0
              lg:border-0
              lg:pb-0
            "
          >
            <span>
              Selected archive
            </span>

            <span>
              Click pieces to
              explore
            </span>
          </div>

          <CaseMediaCollage
            items={items}
            desktopHeight={
              desktopHeight
            }
          />
        </section>
      )}
    </div>
  );
}