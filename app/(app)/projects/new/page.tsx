import prisma from "@/lib/prisma";
import { createMetadata } from "@/lib/metadata";
import { ProjectForm } from "@/components/templates";

export const metadata = createMetadata({ title: "Nouveau projet" });

export default async function Page() {
  const technologies = await prisma.technology.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nouveau projet</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Remplissez les informations du projet à ajouter au portfolio.
        </p>
      </div>
      <ProjectForm technologies={technologies} />
    </div>
  );
}
