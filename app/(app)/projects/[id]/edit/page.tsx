import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/templates";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const project = await prisma.project.findUnique({
    where: { id: (await params).id },
    include: {
      technologies: true,
    },
  });

  if (!project) return notFound();

  const technologies = await prisma.technology.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Modifier un projet</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Mettez à jour les informations liees au projet {project.title} du client {project.clientName}.
        </p>
      </div>
      <ProjectForm
        technologies={technologies}
        defaultValues={{
          id: project.id,
          title: project.title,
          clientName: project.clientName,
          hideClientName: project.hideClientName,
          shortDescription: project.shortDescription,
          longDescription: project.longDescription,
          problem: project.problem ?? undefined,
          solution: project.solution ?? undefined,
          duration: project.duration,
          teamSize: project.teamSize,
          budget: project.budget ?? undefined,
          metrics: project.metrics ?? undefined,
          status: project.status,
          featured: project.featured,
          order: project.order,
          technologyIds: project.technologies.map((t) => t.id),
        }}
        mode="edit"
      />
    </div>
  );
}
