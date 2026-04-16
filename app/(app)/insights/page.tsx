import prisma from "@/lib/prisma";
import { RichSalesStat } from "@/components/templates/rich-sales-stat";
import {
  ProjectsByTechChart,
  ProjectsChartOverTime,
} from "@/components/templates";
import { createMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Dashboard analytique | OpenDev",
  description:
    "Visualisez les statistiques clés d’OpenDev : projets réalisés, technologies utilisées et évolution dans le temps.",
  keywords: [
    "dashboard dev",
    "analytics projets",
    "statistiques développement",
  ],
});

export default async function Page() {
  const [projectsCount, techWithProjects, projectsByMonth, testimonialsCount] =
    await Promise.all([
      prisma.project.count(),

      prisma.technology.findMany({
        select: {
          name: true,
          category: true,
          _count: { select: { projects: true } },
        },
        orderBy: { projects: { _count: "desc" } },
        take: 5,
      }),

      prisma.project.groupBy({
        by: ["createdAt"],
        _count: { id: true },
        orderBy: { createdAt: "asc" },
      }),

      prisma.testimonial.count({ where: { active: true } }),
    ]);

  const poolSize = 24;
  const clientsServed = 31;

  return (
    <div className="flex flex-col gap-8 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Dashboard analytique
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Analyse des performances, technologies utilisées et évolution des
          projets.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <RichSalesStat
          title="Développeurs"
          value={poolSize}
          trendValue={3}
          footerLabel="Pool actif"
          footerSubtext="Mis à jour manuellement"
        />

        <RichSalesStat
          title="Projets livrés"
          value={projectsCount}
          trendValue={5}
          footerLabel="Total cumulé"
          footerSubtext="Calcul automatique"
        />

        <RichSalesStat
          title="Clients servis"
          value={clientsServed}
          trendValue={2}
          footerLabel="Clients uniques"
          footerSubtext="Mis à jour manuellement"
        />

        <RichSalesStat
          title="Témoignages actifs"
          value={testimonialsCount}
          trendValue={0}
          footerLabel="Publiés"
          footerSubtext="Visibles sur la plateforme"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProjectsByTechChart
          data={techWithProjects.map((t) => ({
            name: t.name,
            count: t._count.projects,
            category: t.category,
          }))}
        />

        <ProjectsChartOverTime data={projectsByMonth} />
      </div>
    </div>
  );
}
