import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { ProjectsDataTable, ProjectsFilters } from "@/components/templates";
import { getProjects } from "@/lib/query/project.query";
import { ProjectStatus } from "~/prisma/generated/prisma/enums";

export const metadata = createMetadata({ title: "Projets" });

type SearchParams = {
  search?: string;
  status?: ProjectStatus;
  technologyId?: string;
  page?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const [{ projects, total, pages }, technologies] = await Promise.all([
    getProjects({
      search: params.search,
      status: params.status,
      technologyId: params.technologyId,
      page: params.page ? Number(params.page) : 1,
    }),
    prisma.technology.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projets</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {total} projet{total > 1 ? "s" : ""} au total
          </p>
        </div>
        <Button asChild>
          <Link href="/projects/new">
            <Plus className="size-4" />
            Nouveau projet
          </Link>
        </Button>
      </div>

      <ProjectsFilters technologies={technologies} />
      <ProjectsDataTable projects={projects} pages={pages} />
    </div>
  );
}
