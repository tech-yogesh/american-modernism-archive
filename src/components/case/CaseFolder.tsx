import type { ReactNode } from "react";

interface CaseFolderProps {
  fileColor: string;
  sideTabs: ReactNode;
  children: ReactNode;
}

export default function CaseFolder({
  fileColor,
  sideTabs,
  children,
}: CaseFolderProps) {
  return (
    <section
      className="
        px-[var(--page-gutter)]
      "
    >
      {/*
        Responsive folder geometry:

        Mobile:
        folder + small side-tab rail

        Tablet:
        folder uses full width

        Desktop:
        folder + large navigation rail
      */}
      <div
        className="
          grid
grid-cols-[minmax(0,1fr)_3rem]
md:grid-cols-[minmax(0,1fr)_3.25rem]
lg:grid-cols-[minmax(0,1fr)_clamp(17rem,22vw,23rem)]
        "
      >
        {/* Main physical case folder */}
        <div className="relative min-w-0">
          <article
            data-case-folder
            data-case-folder-color={fileColor}
            className="
              relative
              min-h-[42rem]
              overflow-visible
              rounded-[0.25rem]

              p-4
              md:p-6
              lg:p-8
            "
            style={{
              backgroundColor: fileColor,
            }}
          >
            {sideTabs}

            <div
              data-case-paper
              className="
                relative
                min-h-[38rem]
                overflow-hidden
              "
            >
              {children}
            </div>
          </article>
        </div>

        {/*
          Reserved rail.

          Mobile:
          3rem through the grid definition.

          Tablet:
          this becomes a second grid item in the
          same single-column layout, so hide it.

          Desktop:
          it returns as the large right-side rail.
        */}
       <div
  aria-hidden
  className="min-w-0"
/>
      </div>
    </section>
  );
}