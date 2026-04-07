import Link from "next/link";
import prisma from "@/lib/prisma";
import { createMetadata } from "@/lib/metadata";
import { TestimonialsGrid } from "@/components/templates/testimonials-grid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({ title: "Témoignages" });

export default async function Page() {
  const testimonials = await prisma.testimonial.findMany({
    include: {
      project: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Témoignages</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gérez les témoignages de vos clients.
          </p>
        </div>
        <Button asChild>
          <Link href="/testimonials/new">
            <Plus className="w-4 h-4" />
            Nouveau témoignage
          </Link>
        </Button>
      </div>

      <TestimonialsGrid testimonials={testimonials} />
    </div>
  );
}
