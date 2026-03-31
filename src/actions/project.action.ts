"use server";

import prisma from "@/lib/prisma";
import { action } from "@/lib/safe-action";
import { projectSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const createProjectAction = action
  .inputSchema(projectSchema)
  .action(async ({ parsedInput }) => {
    const { technologyIds, ...data } = parsedInput;

    const slug = slugify(data.title);

    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      throw new Error("Un projet avec ce titre existe déjà.");
    }

    await prisma.project.create({
      data: {
        ...data,
        slug,
        technologies: {
          connect: technologyIds.map((id) => ({ id })),
        },
      },
    });

    revalidatePath("/projects");
  });

export const updateProjectAction = action
  .inputSchema(
    projectSchema.extend({
      id: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const { id, technologyIds, ...data } = parsedInput;

    const slug = slugify(data.title);

    const existing = await prisma.project.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    });

    if (existing) {
      throw new Error("Un projet avec ce titre existe déjà.");
    }

    await prisma.project.update({
      where: { id },
      data: {
        ...data,
        slug,
        technologies: {
          set: [],
          connect: technologyIds.map((id) => ({ id })),
        },
      },
    });

    revalidatePath("/projects");
  });

export const deleteProjectAction = action
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    await prisma.project.delete({ where: { id: parsedInput.id } });
    revalidatePath("/projects");
  });

export const duplicateProjectAction = action
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    const project = await prisma.project.findUnique({
      where: { id: parsedInput.id },
      include: { technologies: true },
    });

    if (!project) throw new Error("Projet introuvable.");

    const { id, slug, createdAt, updatedAt, technologies, ...data } = project;

    await prisma.project.create({
      data: {
        ...data,
        title: `${data.title} (copie)`,
        slug: `${slug}-copy-${Date.now()}`,
        technologies: {
          connect: technologies.map((t) => ({ id: t.id })),
        },
      },
    });

    revalidatePath("/projects");
  });
