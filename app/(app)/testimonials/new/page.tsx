import prisma from "@/lib/prisma";
import { createMetadata } from "@/lib/metadata";
import { TestimonialForm } from "@/components/templates/testimonial-form";

export const metadata = createMetadata({ title: "Nouveau témoignage" });

export default async function NewTestimonialPage() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Nouveau témoignage
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Ajoutez un nouveau témoignage client.
        </p>
      </div>

      <TestimonialForm projects={projects} mode="create" />
    </div>
  );
}
