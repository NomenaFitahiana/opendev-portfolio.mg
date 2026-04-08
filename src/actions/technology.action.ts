"use server";

import prisma from "@/lib/prisma";
import { action } from "@/lib/safe-action";
import { technologySchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createTechnologyAction = action
  .inputSchema(technologySchema)
  .action(async ({ parsedInput }) => {
    const existing = await prisma.technology.findUnique({
      where: { name: parsedInput.name },
    });
    if (existing) {
      throw new Error("Une technologie avec ce nom existe déjà.");
    }

    await prisma.technology.create({
      data: parsedInput,
    });

    revalidatePath("/technologies");
  });

export const updateTechnologyAction = action
  .inputSchema(technologySchema.extend({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    const { id, ...data } = parsedInput;

    const existing = await prisma.technology.findFirst({
      where: { name: data.name, NOT: { id } },
    });
    if (existing) {
      throw new Error("Une technologie avec ce nom existe déjà.");
    }

    await prisma.technology.update({
      where: { id },
      data,
    });

    revalidatePath("/technologies");
  });

export const deleteTechnologyAction = action
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    await prisma.technology.delete({
      where: { id: parsedInput.id },
    });

    revalidatePath("/technologies");
  });