"use server";

import prisma from "@/lib/prisma";
import { action } from "@/lib/safe-action";
import { testimonialSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createTestimonialAction = action
  .inputSchema(testimonialSchema)
  .action(async ({ parsedInput }) => {
    const { projectId, photo, ...data } = parsedInput;

    await prisma.testimonial.create({
      data: {
        ...data,
        photo: photo || null,
        projectId: projectId || null,
      },
    });

    revalidatePath("/testimonials");
    revalidatePath("/");
  });

export const updateTestimonialAction = action
  .inputSchema(
    testimonialSchema.extend({
      id: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const { id, projectId, photo, ...data } = parsedInput;

    await prisma.testimonial.update({
      where: { id },
      data: {
        ...data,
        photo: photo || null,
        projectId: projectId || null,
      },
    });

    revalidatePath("/testimonials");
    revalidatePath("/");
  });

export const deleteTestimonialAction = action
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    await prisma.testimonial.delete({ where: { id: parsedInput.id } });
    revalidatePath("/testimonials");
    revalidatePath("/");
  });

export const toggleTestimonialActiveAction = action
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: parsedInput.id },
      select: { active: true },
    });

    if (!testimonial) {
      throw new Error("Témoignage introuvable");
    }

    await prisma.testimonial.update({
      where: { id: parsedInput.id },
      data: { active: !testimonial.active },
    });

    revalidatePath("/testimonials");
  });

export const getProjectsForSelectAction = action.action(async () => {
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
  return projects;
});
