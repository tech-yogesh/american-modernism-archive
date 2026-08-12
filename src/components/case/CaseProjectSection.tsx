import type {
  CaseProject,
} from "@/types/content";

interface CaseProjectSectionProps {
  project: CaseProject;
}

export default function CaseProjectSection({
  project,
}: CaseProjectSectionProps) {
  return (
    <section
      className="
        border-t
        border-black/20
        py-10
        md:py-14
        lg:py-16
      "
    >
      <div
        className="
          mb-8
          grid
          gap-4
          md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]
          md:gap-10
        "
      >
        <div>
          <p
            className="
              mb-2
              font-[family-name:var(--font-utility)]
              text-xs
              uppercase
              tracking-[0.06em]
            "
          >
            {project.year}
          </p>

          <h2
            className="
              max-w-[18ch]
              font-[family-name:var(--font-editorial)]
              text-2xl
              leading-tight
              md:text-3xl
              lg:text-4xl
            "
          >
            {project.title}
          </h2>
        </div>

        <p
          className="
            max-w-[42rem]
            font-[family-name:var(--font-editorial)]
            text-base
            leading-relaxed
            md:text-lg
          "
        >
          {project.description}
        </p>
      </div>

      <div
        className={`
          grid
          gap-4
          md:gap-6

          ${
            project.layout ===
            "large"
              ? "grid-cols-1"
              : project.layout ===
                  "split"
                ? "md:grid-cols-2"
                : "grid-cols-2 md:grid-cols-3"
          }
        `}
      >
        {project.images.map(
          (image, index) => (
            <div
              key={image.src}
              role="img"
              aria-label={image.alt}
              className="
                relative
                min-h-[16rem]
                overflow-hidden
                bg-black/10
                bg-cover
                bg-center
                md:min-h-[22rem]
              "
              style={{
                backgroundImage: `url("${image.src}")`,
              }}
            >
              <span
                className="
                  absolute
                  bottom-3
                  left-3
                  font-[family-name:var(--font-utility)]
                  text-[0.6rem]
                  uppercase
                  tracking-[0.06em]
                  opacity-60
                "
              >
                Image{" "}
                {String(
                  index + 1,
                ).padStart(2, "0")}
              </span>
            </div>
          ),
        )}
      </div>
    </section>
  );
}