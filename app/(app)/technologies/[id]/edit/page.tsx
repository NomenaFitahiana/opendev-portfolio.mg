import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { TechnologyForm } from "@/components/templates";

export const metadata = createMetadata({ title: "Modifier une technologie" });

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const technology = await prisma.technology.findUnique({
    where: { id: (await params).id },
  });

  if (!technology) return notFound();

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Modifier une technologie</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Mettez à jour les informations de la technologie {technology.name}.
        </p>
      </div>
      <TechnologyForm
        defaultValues={{
          id: technology.id,
          name: technology.name,
          category: technology.category,
          logo: technology.logo ?? "",
        }}
        mode="edit"
      />
    </div>
  );
}