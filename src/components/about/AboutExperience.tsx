"use client";

import {
  useRef,
} from "react";

import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import type {
  AboutPageContent,
} from "@/data/about";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
);

interface AboutExperienceProps {
  content: AboutPageContent;
}

export default function AboutExperience({
  content,
}: AboutExperienceProps) {
  const rootRef =
    useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root =
        rootRef.current;

      if (!root) {
        return;
      }

      const slides =
        Array.from(
          root.querySelectorAll<HTMLElement>(
            "[data-about-slide]",
          ),
        );

      const sections =
        Array.from(
          root.querySelectorAll<HTMLElement>(
            "[data-about-section]",
          ),
        );

      if (
        slides.length === 0 ||
        sections.length === 0
      ) {
        return;
      }

      const prefersReducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

      /*
       * ----------------------------------------------
       * INITIAL CAROUSEL STATE
       * ----------------------------------------------
       *
       * Slide 0 is visible.
       * Every following slide waits below the frame.
       */
      slides.forEach(
        (
          slide,
          index,
        ) => {
          gsap.set(
            slide,
            {
              yPercent:
                index === 0
                  ? 0
                  : 105,

              autoAlpha:
                index === 0
                  ? 1
                  : 0,

              zIndex:
                slides.length -
                index,
            },
          );
        },
      );

      let activeIndex = 0;

      /*
       * ----------------------------------------------
       * CHANGE IMAGE
       * ----------------------------------------------
       *
       * Scrolling DOWN:
       *
       * current
       *   ↑ exits upward
       *
       * next
       *   ↑ enters from below
       *
       *
       * Scrolling UP naturally performs the inverse.
       */
      const showSlide = (
        nextIndex: number,
      ) => {
        if (
          nextIndex ===
            activeIndex ||
          nextIndex < 0 ||
          nextIndex >=
            slides.length
        ) {
          return;
        }

        slides.forEach(
          (
            slide,
            index,
          ) => {
            let yPercent = 105;

            if (
              index <
              nextIndex
            ) {
              yPercent = -105;
            }

            if (
              index ===
              nextIndex
            ) {
              yPercent = 0;
            }

            gsap.to(
              slide,
              {
                yPercent,

                autoAlpha:
                  index ===
                  nextIndex
                    ? 1
                    : 0,

                duration:
                  prefersReducedMotion
                    ? 0
                    : 0.75,

                ease:
                  "power3.inOut",

                overwrite: true,
              },
            );
          },
        );

        activeIndex =
          nextIndex;
      };

      /*
       * ----------------------------------------------
       * RIGHT TEXT CONTROLS LEFT IMAGE
       * ----------------------------------------------
       *
       * About page uses its own scroll container
       * because it overlays the normal site shell.
       */
      sections.forEach(
        (
          section,
          index,
        ) => {
          ScrollTrigger.create({
            trigger: section,

            scroller: root,

            start:
              "top 58%",

            end:
              "bottom 42%",

            onEnter: () => {
              showSlide(index);
            },

            onEnterBack:
              () => {
                showSlide(index);
              },
          });
        },
      );

      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.getAll().forEach(
          (trigger) => {
            /*
             * Only destroy triggers belonging to
             * this About scroll container.
             */
            if (
              trigger.scroller ===
              root
            ) {
              trigger.kill();
            }
          },
        );
      };
    },
    {
      scope: rootRef,
    },
  );

  return (
    <div
      ref={rootRef}
      data-about-page
      className="
        fixed
        inset-0
        z-[999]

        overflow-x-hidden
        overflow-y-auto

        bg-[#171717]
      "
    >
      {/* ==========================================
          ABOUT PAPER / EDITORIAL CANVAS
          ========================================== */}
      <main
        className="
          relative

          mx-auto
          min-h-full
          w-full
          max-w-[85rem]

          bg-[#f2efe9]
          text-[#161616]
        "
      >
        {/* ========================================
            CLOSE
            ======================================== */}
        <Link
          href="/"
          aria-label="Close about page and return home"
          className="
            fixed
            right-4
            top-5
            z-[30]

            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-full

            bg-[#292929]

            text-[2rem]
            font-light
            leading-none
            text-white/70

            transition-transform
            duration-300

            hover:scale-105
            hover:text-white

            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-black

            md:right-6
            md:top-8

            lg:right-[clamp(2rem,4vw,5rem)]
            lg:top-12
            lg:h-16
            lg:w-16
          "
        >
          <span
            aria-hidden="true"
            className="
              -mt-1
              text-white
            "
          >
            ×
          </span>
        </Link>

        {/* ========================================
            DESKTOP TWO-COLUMN COMPOSITION
            ======================================== */}
        <div
          className="
            grid
            min-h-full

            lg:grid-cols-[44%_56%]
          "
        >
          {/* ======================================
              LEFT — STICKY
              ====================================== */}
          <aside
            className="
              relative

              px-6
              pb-12
              pt-16

              md:px-10
              md:pt-20

              lg:sticky
              lg:top-0
              lg:h-[100svh]
              lg:px-[clamp(3rem,5vw,5.5rem)]
              lg:pb-8
              lg:pt-12
            "
          >
            <div
              className="
                flex
                h-full
                flex-col
              "
            >
              {/* Fixed heading */}
              <h1
                className="
                  max-w-[34rem]

                  font-[family-name:var(--font-display)]

                  text-[clamp(2.7rem,6vw,4.4rem)]
                  font-bold
                  uppercase

                  leading-[0.92]
                  tracking-[-0.045em]

                  lg:text-[clamp(3.1rem,3.4vw,4.25rem)]
                "
              >
                {content.heading}
              </h1>

              {/* ==================================
                  IMAGE CAROUSEL
                  ================================== */}
              <div
                className="
                  relative

                  mt-12
                  h-[27rem]
                  w-full

                  overflow-hidden

                  md:mt-14
                  md:h-[32rem]

                  lg:mt-auto
                  lg:h-[31rem]
                  lg:max-w-[34rem]
                "
              >
                {content.slides.map(
                  (
                    slide,
                    index,
                  ) => (
                    <figure
                      key={
                        slide.id
                      }
                      data-about-slide
                      aria-hidden={
                        index !== 0
                      }
                      className="
                        absolute
                        inset-0

                        grid
                        grid-rows-[minmax(0,1fr)_auto]
                      "
                    >
                      <div
                        className="
                          relative
                          min-h-0
                          overflow-hidden

                          bg-[#ddd9d2]
                        "
                      >
                        <Image
                          src={
                            slide
                              .image
                              .src
                          }
                          alt={
                            slide
                              .image
                              .alt
                          }
                          fill
                          priority={
                            index ===
                            0
                          }
                          sizes="
                            (max-width: 1023px) 90vw,
                            34rem
                          "
                          className="
                            object-cover
                            grayscale
                          "
                          onLoad={() => {
                            ScrollTrigger.refresh();
                          }}
                        />
                      </div>

                      <figcaption
                        className="
                          min-h-[4.5rem]

                          pt-4

                          font-[family-name:var(--font-utility)]
                          text-xs
                          leading-[1.35]

                          text-black/50

                          md:text-sm
                        "
                      >
                        {
                          slide.caption
                        }
                      </figcaption>
                    </figure>
                  ),
                )}
              </div>
            </div>
          </aside>

          {/* ======================================
              RIGHT — SCROLLING EDITORIAL COPY
              ====================================== */}
          <article
            className="
              px-6
              pb-28
              pt-6

              md:px-10
              md:pb-36

              lg:px-[clamp(3rem,5vw,6rem)]
              lg:pb-[30vh]
              lg:pt-5
            "
          >
            {content.sections.map(
              (
                section,
                sectionIndex,
              ) => (
                <section
                  key={
                    section.id
                  }
                  data-about-section
                  data-about-section-index={
                    sectionIndex
                  }
                  className="
                    flex
                    min-h-[85svh]
                    flex-col
                    justify-start

                    pb-24

                    lg:min-h-[95svh]
                    lg:pb-32
                  "
                >
                  <div
                    className="
                      max-w-[46rem]

                      font-[family-name:var(--font-editorial)]

                      text-[1.08rem]
                      leading-[1.38]

                      md:text-[1.2rem]
                      md:leading-[1.42]

                      lg:text-[clamp(1.1rem,1.18vw,1.35rem)]
                    "
                  >
                    {section.paragraphs.map(
                      (
                        paragraph,
                        paragraphIndex,
                      ) => (
                        <p
                          key={`${section.id}-${paragraphIndex}`}
                          className="
                            mb-6

                            text-justify

                            md:mb-7
                            lg:mb-8
                          "
                        >
                          {
                            paragraph
                          }
                        </p>
                      ),
                    )}
                  </div>
                </section>
              ),
            )}
          </article>
        </div>
      </main>
    </div>
  );
}