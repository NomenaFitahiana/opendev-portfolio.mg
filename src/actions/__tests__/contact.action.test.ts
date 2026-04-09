import { describe, it, expect, vi, beforeEach } from "vitest";
import { requestQuoteAction } from "../contact.action";

vi.mock("@/lib/prisma", () => ({
  default: {
    contact: {
      create: vi.fn(),
    },
  },
}));

vi.mock("@/lib/mailer", () => ({
  sendEmail: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";

const mockPrisma = prisma as unknown as {
  contact: {
    create: ReturnType<typeof vi.fn>;
  };
};

describe("requestQuoteAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("crée un contact avec des données valides", async () => {
    mockPrisma.contact.create.mockResolvedValue({
      id: "new-contact-id",
      name: "Tsiory Antonio",
      email: "tsiory@opendev.mg",
      message: "Je veux développer une application mobile de gestion RH.",
      budget: "5000-10000",
      status: "UNREAD",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(
      requestQuoteAction({
        name: "Tsiory Antonio",
        email: "tsiory@opendev.mg",
        projectDescription: "Je veux développer une application mobile de gestion RH.",
        budget: "5000-10000",
      })
    ).resolves.not.toThrow();

    expect(mockPrisma.contact.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: "Tsiory Antonio",
        email: "tsiory@opendev.mg",
        message: "Je veux développer une application mobile de gestion RH.",
        budget: "5000-10000",
      }),
    });
  });

  it("envoie un email de confirmation après création", async () => {
    mockPrisma.contact.create.mockResolvedValue({
      id: "new-contact-id",
      name: "John Doe",
      email: "john@example.com",
      message: "Description du projet",
      budget: "1000-5000",
      status: "UNREAD",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await requestQuoteAction({
      name: "John Doe",
      email: "john@example.com",
      projectDescription: "Description du projet",
      budget: "1000-5000",
    });

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "john@example.com",
        subject: "Remerciement pour la demande de devis",
      })
    );
  });

  it("rejette un email invalide", async () => {
    const result = await requestQuoteAction({
      name: "Tsiory",
      email: "pas-un-email",
      projectDescription: "Description très longue du projet",
      budget: "5000-10000",
    });
    expect(result).toHaveProperty("validationErrors");
  });

  it("rejette une description trop courte", async () => {
    const result = await requestQuoteAction({
      name: "Tsiory",
      email: "tsiory@opendev.mg",
      projectDescription: "Court",
      budget: "5000-10000",
    });
    expect(result).toHaveProperty("validationErrors");
  });

  it("rejette un nom trop court", async () => {
    const result = await requestQuoteAction({
      name: "A",
      email: "tsiory@opendev.mg",
      projectDescription: "Description très longue du projet",
      budget: "5000-10000",
    });
    expect(result).toHaveProperty("validationErrors");
  });
});