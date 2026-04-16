import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { TestimonialForm } from "@/components/templates/testimonial-form";

type PageParams = {
  params: Promise<{ id: string }>;
}

export default async function Page({
  params,
}: PageParams) {
  const { id } = await params;

  const testimonial = await prisma.testimonial.findUnique({
    where: { id },
  });

  if (!testimonial) return notFound();

  const projects = await prisma.project.findMany({
    orderBy: { title: "asc" },
    select: { id: true, title: true, slug: true },
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Modifier un témoignage
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Mettez à jour le témoignage de {testimonial.clientName} —{" "}
          {testimonial.company}.
        </p>
      </div>
      <TestimonialForm
        projects={projects}
        defaultValues={{
          id: testimonial.id,
          clientName: testimonial.clientName,
          clientRole: testimonial.clientRole,
          company: testimonial.company,
          content: testimonial.content,
          photo: testimonial.photo ?? "",
          projectId: testimonial.projectId ?? "",
          active: testimonial.active,
        }}
        mode="edit"
      />
    </div>
  );
}
