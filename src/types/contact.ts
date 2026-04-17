import type { ContactModel } from "~/prisma/generated/prisma/models/Contact";
import { ContactStatus } from "~/prisma/generated/prisma/enums";

export type { ContactStatus };
export type Contact = ContactModel;