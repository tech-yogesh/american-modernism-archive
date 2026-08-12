import type { Metadata } from "next";

import { notFound } from "next/navigation";

import CasePage from "@/components/case/CasePage";

import {
  cases,
  getCaseBySlug,
} from "@/data/cases";

import {
  getCategoryById,
} from "@/data/categories";

import {
  getNextArchitect,
} from "@/data/navigation";

interface CaseRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return cases.map(
    (architectCase) => ({
      slug: architectCase.slug,
    }),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: CaseRouteProps): Promise<Metadata> {
  const { slug } = await params;

  const caseData =
    getCaseBySlug(slug);

  if (!caseData) {
    return {};
  }

  return {
    title: caseData.name,

    description: `Explore an original editorial study of ${caseData.name} and selected architectural work.`,
  };
}

export default async function CaseRoute({
  params,
}: CaseRouteProps) {
  const { slug } = await params;

  const caseData =
    getCaseBySlug(slug);

  if (!caseData) {
    notFound();
  }

  const category =
    getCategoryById(
      caseData.categoryId,
    );

  if (!category) {
    notFound();
  }

  const nextArchitect =
    getNextArchitect(slug);

  if (!nextArchitect) {
    notFound();
  }

  return (
    <CasePage
      caseData={caseData}
      category={category}
      nextArchitect={
        nextArchitect
      }
    />
  );
}