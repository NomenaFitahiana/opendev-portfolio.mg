"use server";

import { sendEmail } from "@/lib/mailer";
import prisma from "@/lib/prisma";
import { action } from "@/lib/safe-action";
import { contactSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

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

      // should move to a workflow
      await sendEmail({
        to: email,
        subject: "Remerciement pour la demande de devis",
        text: "Merci pour votre demande de devis. Vous aurez une reponse d'ici 24 heures."
      });

      revalidatePath("/", "page");
    },
  );
