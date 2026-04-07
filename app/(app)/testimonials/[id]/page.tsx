import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { TestimonialForm } from "@/components/templates/testimonial-form";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({
    where: { id },
    select: { clientName: true },
  });

  if (!testimonial) {
    return createMetadata({ title: "Témoignage non trouvé" });
  }

  return createMetadata({ title: `Modifier: ${testimonial.clientName}` });
}

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params;

  const [testimonial, projects] = await Promise.all([
    prisma.testimonial.findUnique({
      where: { id },
    }),
    prisma.project.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
      orderBy: {
        title: "asc",
      },
    }),
  ]);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Modifier le témoignage
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Modifiez les informations du témoignage.
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
