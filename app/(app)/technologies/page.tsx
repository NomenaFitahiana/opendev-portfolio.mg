import { createMetadata } from "@/lib/metadata";
import { getTechnologies, getTechnologyStats } from "@/lib/query/technology.query";
import { TechCategory } from "~/prisma/generated/prisma/enums";
import { RichSalesStat } from "@/components/templates";
import { TechnologiesFilters } from "@/components/templates/technology-filters";
import { TechnologiesDataTable } from "@/components/templates/technologies-data-table";

export const metadata = createMetadata({ title: "Technologies" });

type SearchParams = {
  search?: string;
  category?: TechCategory;
  page?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;

  const [data, stats] = await Promise.all([
    getTechnologies({
      search: params.search,
      category: params.category,
      page,
    }),
    getTechnologyStats(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Technologies</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <RichSalesStat
          title="Technologies"
          value={stats.totalTechnologies}
          trendValue={0}
          footerLabel="Toutes technologies"
          footerSubtext="Dans la base de données"
        />
        <RichSalesStat
          title="Actives"
          value={stats.activeTechnologies}
          trendValue={0}
          footerLabel="Utilisées dans les projets"
          footerSubtext="Technologies mises en œuvre"
        />
        <RichSalesStat
          title="Catégories"
          value={stats.categoriesCount}
          trendValue={0}
          footerLabel="Toutes catégories"
          footerSubtext="Frontend, Backend, etc."
        />
      </div>

      <TechnologiesFilters />
      <TechnologiesDataTable
        technologies={data.technologies}
        total={data.total}
        pages={data.pages}
      />
    </div>
  );
}
