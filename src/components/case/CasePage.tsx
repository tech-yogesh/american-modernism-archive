import CaseContent from "./CaseContent";
import CaseFolder from "./CaseFolder";
import CaseHero from "./CaseHero";
import CaseSideTabs from "./CaseSideTabs";
import NextCaseHandoff from "./NextCaseHandoff";

import type {
  ArchitectCase,
  ArchitectNavigationItem,
  Category,
} from "@/types/content";

interface CasePageProps {
  caseData: ArchitectCase;
  category: Category;
  nextArchitect: ArchitectNavigationItem;
}

export default function CasePage({
  caseData,
  category,
  nextArchitect,
}: CasePageProps) {
  const activeArchitect =
    category.architects.find(
      (architect) =>
        architect.slug ===
        caseData.slug,
    );

  const fileColor =
    activeArchitect?.tabColor ??
    category.color;

  return (
    <div data-case-page>
      <CaseHero
        name={caseData.name}
      />

      <CaseFolder
        fileColor={fileColor}
        sideTabs={
          <CaseSideTabs
            architects={
              category.architects
            }
            activeSlug={
              caseData.slug
            }
            categoryId={
              category.id
            }
            fallbackColor={
              category.color
            }
          />
        }
      >
        <CaseContent
          caseData={caseData}
        />
      </CaseFolder>

      <NextCaseHandoff
        nextArchitect={
          nextArchitect
        }
      />
    </div>
  );
}