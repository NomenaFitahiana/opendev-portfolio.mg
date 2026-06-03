import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  default: {
    contact: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

import prisma from "@/lib/prisma";
import { getContacts, getContactById, updateContactStatus, replyToContact } from "@/lib/query/contact.query";

const mockPrisma = prisma as unknown as {
  contact: {
    findMany: ReturnType<typeof vi.fn>;
    findUnique: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
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
  status: "UNREAD" as const,
  createdAt: new Date("2025-01-15T10:00:00Z"),
  updatedAt: new Date("2025-01-15T10:00:00Z"),
};

describe("getContacts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne tous les contacts triés par date décroissante", async () => {
    mockPrisma.contact.findMany.mockResolvedValue([mockContact]);

    const result = await getContacts();

    expect(result.contacts).toHaveLength(1);
    expect(result.contacts[0].id).toBe("contact-1");
    expect(mockPrisma.contact.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: "desc" },
    });
  });

  it("retourne un tableau vide si aucun contact", async () => {
    mockPrisma.contact.findMany.mockResolvedValue([]);

    const result = await getContacts();

    expect(result.contacts).toEqual([]);
  });

  it("retourne plusieurs contacts", async () => {
    const contact2 = {
      ...mockContact,
      id: "contact-2",
      name: "Alice Martin",
      email: "alice@example.com",
    };
    mockPrisma.contact.findMany.mockResolvedValue([mockContact, contact2]);

    const result = await getContacts();

    expect(result.contacts).toHaveLength(2);
    expect(result.contacts[0].name).toBe("Jean Dupont");
    expect(result.contacts[1].name).toBe("Alice Martin");
  });
});

describe("getContactById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne un contact par son id", async () => {
    mockPrisma.contact.findUnique.mockResolvedValue(mockContact);

    const result = await getContactById("contact-1");

    expect(result).toEqual(mockContact);
    expect(mockPrisma.contact.findUnique).toHaveBeenCalledWith({
      where: { id: "contact-1" },
    });
  });

  it("retourne null si le contact n'existe pas", async () => {
    mockPrisma.contact.findUnique.mockResolvedValue(null);

    const result = await getContactById("inexistant");

    expect(result).toBeNull();
  });
});

describe("updateContactStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("met à jour le statut d'un contact", async () => {
    mockPrisma.contact.update.mockResolvedValue({
      ...mockContact,
      status: "READ",
    });

    const result = await updateContactStatus("contact-1", "READ");

    expect(result.status).toBe("READ");
    expect(mockPrisma.contact.update).toHaveBeenCalledWith({
      where: { id: "contact-1" },
      data: { status: "READ" },
    });
  });

  it("passe du statut UNREAD à ARCHIVED", async () => {
    mockPrisma.contact.update.mockResolvedValue({
      ...mockContact,
      status: "ARCHIVED",
    });

    await updateContactStatus("contact-1", "ARCHIVED");

    expect(mockPrisma.contact.update).toHaveBeenCalledWith({
      where: { id: "contact-1" },
      data: { status: "ARCHIVED" },
    });
  });

  it("passe du statut READ à AWAITING", async () => {
    mockPrisma.contact.update.mockResolvedValue({
      ...mockContact,
      status: "AWAITING",
    });

    await updateContactStatus("contact-1", "AWAITING");

    expect(mockPrisma.contact.update).toHaveBeenCalledWith({
      where: { id: "contact-1" },
      data: { status: "AWAITING" },
    });
  });

  it("passe du statut AWAITING à UNREAD", async () => {
    mockPrisma.contact.update.mockResolvedValue({
      ...mockContact,
      status: "UNREAD",
    });

    await updateContactStatus("contact-1", "UNREAD");

    expect(mockPrisma.contact.update).toHaveBeenCalledWith({
      where: { id: "contact-1" },
      data: { status: "UNREAD" },
    });
  });
});

describe("replyToContact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("ajoute une réponse et marque comme lu", async () => {
    const replyText = "Merci pour votre demande. Nous vous contacterons sous 24h.";
    const now = new Date();
    const updatedContact = {
      ...mockContact,
      reply: replyText,
      replyAt: now,
      status: "READ",
    };
    mockPrisma.contact.update.mockResolvedValue(updatedContact);

    const result = await replyToContact("contact-1", replyText);

    expect(result.reply).toBe(replyText);
    expect(result.status).toBe("READ");
    expect(result.replyAt).toBeInstanceOf(Date);
    expect(mockPrisma.contact.update).toHaveBeenCalledWith({
      where: { id: "contact-1" },
      data: {
        reply: replyText,
        replyAt: expect.any(Date),
        status: "READ",
      },
    });
  });
});
