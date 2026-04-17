"use server";

import { sendEmail } from "@/lib/mailer";
import prisma from "@/lib/prisma";
import { action } from "@/lib/safe-action";
import { contactSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const idSchema = z.object({
  id: z.string().min(1, "ID requis"),
});

export const requestQuoteAction = action
  .inputSchema(contactSchema)
  .action(
    async ({ parsedInput: { name, email, projectDescription, budget } }) => {
      await prisma.contact.create({
        data: {
          name,
          email,
          message: projectDescription,
          budget,
        },
      });

      await sendEmail({
        to: email,
        subject: "Remerciement pour la demande de devis",
        text: "Merci pour votre demande de devis. Vous aurez une reponse d'ici 24 heures."
      });

      revalidatePath("/", "page");
    },
  );

export const updateContactStatusAction = action
  .inputSchema(idSchema)
  .action(async ({ parsedInput: { id } }) => {
    await prisma.contact.updateMany({
      where: { id },
      data: { status: "READ" },
    });
  });

export const markContactAsReadAction = action
  .inputSchema(idSchema)
  .action(async ({ parsedInput: { id } }) => {
    await prisma.contact.updateMany({
      where: { id },
      data: { status: "READ" },
    });
  });

export const archiveContactAction = action
  .inputSchema(idSchema)
  .action(async ({ parsedInput: { id } }) => {
    await prisma.contact.updateMany({
      where: { id },
      data: { status: "ARCHIVED" },
    });
  });

export const markContactAsUnreadAction = action
  .inputSchema(idSchema)
  .action(async ({ parsedInput: { id } }) => {
    await prisma.contact.updateMany({
      where: { id },
      data: { status: "UNREAD" },
    });
  });

export const setContactAwaitingAction = action
  .inputSchema(idSchema)
  .action(async ({ parsedInput: { id } }) => {
    await prisma.contact.updateMany({
      where: { id },
      data: { status: "AWAITING" },
    });
  });

export const deleteContactAction = action
  .inputSchema(idSchema)
  .action(async ({ parsedInput: { id } }) => {
    await prisma.contact.deleteMany({
      where: { id },
    });
    revalidatePath("/contacts");
  });