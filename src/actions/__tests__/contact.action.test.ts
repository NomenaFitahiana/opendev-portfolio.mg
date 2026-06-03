import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  default: {
    contact: {
      create: vi.fn(),
      updateMany: vi.fn(),
      deleteMany: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
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
import {
  requestQuoteAction,
  updateContactStatusAction,
  markContactAsReadAction,
  archiveContactAction,
  markContactAsUnreadAction,
  setContactAwaitingAction,
  deleteContactAction,
} from "../contact.action";

const mockPrisma = prisma as unknown as {
  contact: {
    create: ReturnType<typeof vi.fn>;
    updateMany: ReturnType<typeof vi.fn>;
    deleteMany: ReturnType<typeof vi.fn>;
    findMany: ReturnType<typeof vi.fn>;
    findUnique: ReturnType<typeof vi.fn>;
  };
};

const mockContact = {
  id: "contact-1",
  name: "Jean Dupont",
  email: "jean@example.com",
  message: "Je veux développer une application mobile de gestion RH.",
  budget: "5000-10000",
  reply: null,
  replyAt: null,
  status: "UNREAD",
  createdAt: new Date("2025-01-15T10:00:00Z"),
  updatedAt: new Date("2025-01-15T10:00:00Z"),
};

describe("requestQuoteAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("crée un contact avec des données valides", async () => {
    mockPrisma.contact.create.mockResolvedValue({
      ...mockContact,
      id: "new-contact-id",
    });

    await expect(
      requestQuoteAction({
        name: "Jean Dupont",
        email: "jean@example.com",
        projectDescription: "Je veux développer une application mobile de gestion RH.",
        budget: "5000-10000",
      })
    ).resolves.not.toThrow();

    expect(mockPrisma.contact.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: "Jean Dupont",
        email: "jean@example.com",
        message: "Je veux développer une application mobile de gestion RH.",
        budget: "5000-10000",
      }),
    });
  });

  it("envoie un email de confirmation après création", async () => {
    mockPrisma.contact.create.mockResolvedValue(mockContact);

    await requestQuoteAction({
      name: "Jean Dupont",
      email: "jean@example.com",
      projectDescription: "Description du projet",
      budget: "1000-5000",
    });

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "jean@example.com",
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

describe("updateContactStatusAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("marque le contact comme READ", async () => {
    mockPrisma.contact.updateMany.mockResolvedValue({ count: 1 });

    await expect(
      updateContactStatusAction({ id: "contact-1" })
    ).resolves.not.toThrow();

    expect(mockPrisma.contact.updateMany).toHaveBeenCalledWith({
      where: { id: "contact-1" },
      data: { status: "READ" },
    });
  });
});

describe("markContactAsReadAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("marque le contact comme READ", async () => {
    mockPrisma.contact.updateMany.mockResolvedValue({ count: 1 });

    await expect(
      markContactAsReadAction({ id: "contact-1" })
    ).resolves.not.toThrow();

    expect(mockPrisma.contact.updateMany).toHaveBeenCalledWith({
      where: { id: "contact-1" },
      data: { status: "READ" },
    });
  });
});

describe("archiveContactAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("archive le contact (status ARCHIVED)", async () => {
    mockPrisma.contact.updateMany.mockResolvedValue({ count: 1 });

    await expect(
      archiveContactAction({ id: "contact-1" })
    ).resolves.not.toThrow();

    expect(mockPrisma.contact.updateMany).toHaveBeenCalledWith({
      where: { id: "contact-1" },
      data: { status: "ARCHIVED" },
    });
  });
});

describe("markContactAsUnreadAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("remet le contact comme non lu (UNREAD)", async () => {
    mockPrisma.contact.updateMany.mockResolvedValue({ count: 1 });

    await expect(
      markContactAsUnreadAction({ id: "contact-1" })
    ).resolves.not.toThrow();

    expect(mockPrisma.contact.updateMany).toHaveBeenCalledWith({
      where: { id: "contact-1" },
      data: { status: "UNREAD" },
    });
  });
});

describe("setContactAwaitingAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("passe le contact en attente (AWAITING)", async () => {
    mockPrisma.contact.updateMany.mockResolvedValue({ count: 1 });

    await expect(
      setContactAwaitingAction({ id: "contact-1" })
    ).resolves.not.toThrow();

    expect(mockPrisma.contact.updateMany).toHaveBeenCalledWith({
      where: { id: "contact-1" },
      data: { status: "AWAITING" },
    });
  });
});

describe("deleteContactAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("supprime un contact", async () => {
    mockPrisma.contact.deleteMany.mockResolvedValue({ count: 1 });

    await expect(
      deleteContactAction({ id: "contact-1" })
    ).resolves.not.toThrow();

    expect(mockPrisma.contact.deleteMany).toHaveBeenCalledWith({
      where: { id: "contact-1" },
    });
  });
});

describe("Action + Query consistency (cycle de vie complet)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("simule le cycle de vie: création → listing → lecture → status change → archivage", async () => {
    // 1. Création (requestQuoteAction)
    mockPrisma.contact.create.mockResolvedValue(mockContact);

    await requestQuoteAction({
      name: "Jean Dupont",
      email: "jean@example.com",
      projectDescription: "Je veux développer une application mobile de gestion RH.",
      budget: "5000-10000",
    });

    expect(mockPrisma.contact.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ email: "jean@example.com" }),
    });
    expect(sendEmail).toHaveBeenCalledOnce();

    // 2. Listing (getContacts - on simule que le contact apparaît dans la liste)
    mockPrisma.contact.findMany.mockResolvedValue([mockContact]);
    const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
    expect(contacts).toHaveLength(1);
    expect(contacts[0].status).toBe("UNREAD");

    // 3. Lecture du détail (getContactById)
    mockPrisma.contact.findUnique.mockResolvedValue(mockContact);
    const detail = await prisma.contact.findUnique({ where: { id: "contact-1" } });
    expect(detail).toBeDefined();
    expect(detail?.email).toBe("jean@example.com");

    // 4. Changement de statut: UNREAD → READ
    mockPrisma.contact.updateMany.mockResolvedValue({ count: 1 });
    await markContactAsReadAction({ id: "contact-1" });
    expect(mockPrisma.contact.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ data: { status: "READ" } })
    );

    // 5. Changement de statut: READ → AWAITING
    vi.clearAllMocks();
    mockPrisma.contact.updateMany.mockResolvedValue({ count: 1 });
    await setContactAwaitingAction({ id: "contact-1" });
    expect(mockPrisma.contact.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ data: { status: "AWAITING" } })
    );

    // 6. Changement de statut: AWAITING → UNREAD
    vi.clearAllMocks();
    mockPrisma.contact.updateMany.mockResolvedValue({ count: 1 });
    await markContactAsUnreadAction({ id: "contact-1" });
    expect(mockPrisma.contact.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ data: { status: "UNREAD" } })
    );

    // 7. Archivage: UNREAD → ARCHIVED
    vi.clearAllMocks();
    mockPrisma.contact.updateMany.mockResolvedValue({ count: 1 });
    await archiveContactAction({ id: "contact-1" });
    expect(mockPrisma.contact.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ data: { status: "ARCHIVED" } })
    );

    // 8. Suppression
    vi.clearAllMocks();
    mockPrisma.contact.deleteMany.mockResolvedValue({ count: 1 });
    await deleteContactAction({ id: "contact-1" });
    expect(mockPrisma.contact.deleteMany).toHaveBeenCalledWith({
      where: { id: "contact-1" },
    });
  });

  it("vérifie la cohérence des statuts entre les actions", async () => {
    const statusActions = [
      { action: markContactAsReadAction, expected: "READ" },
      { action: markContactAsUnreadAction, expected: "UNREAD" },
      { action: setContactAwaitingAction, expected: "AWAITING" },
      { action: archiveContactAction, expected: "ARCHIVED" },
    ];

    for (const { action, expected } of statusActions) {
      vi.clearAllMocks();
      mockPrisma.contact.updateMany.mockResolvedValue({ count: 1 });

      await action({ id: "contact-1" });

      expect(mockPrisma.contact.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({ data: { status: expected } })
      );
    }
  });
});
