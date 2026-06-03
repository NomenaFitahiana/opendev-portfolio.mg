import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createTechnologyAction,
  updateTechnologyAction,
  deleteTechnologyAction,
} from "../technology.action";

vi.mock("@/lib/prisma", () => ({
  default: {
    technology: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import prisma from "@/lib/prisma";

const mockPrisma = prisma as unknown as {
  technology: {
    findUnique: ReturnType<typeof vi.fn>;
    findFirst: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
};

const mockTechnology = {
  id: "tech-1",
  name: "React",
  category: "FRONTEND",
  logo: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("createTechnologyAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("crée une technologie avec des données valides", async () => {
    mockPrisma.technology.findUnique.mockResolvedValue(null);
    mockPrisma.technology.create.mockResolvedValue(mockTechnology);

    await expect(
      createTechnologyAction({
        name: "React",
        category: "FRONTEND",
      })
    ).resolves.not.toThrow();

    expect(mockPrisma.technology.findUnique).toHaveBeenCalledWith({
      where: { name: "React" },
    });
    expect(mockPrisma.technology.create).toHaveBeenCalledWith({
      data: { name: "React", category: "FRONTEND" },
    });
  });

  it("crée une technologie avec un logo optionnel", async () => {
    mockPrisma.technology.findUnique.mockResolvedValue(null);
    mockPrisma.technology.create.mockResolvedValue({ ...mockTechnology, logo: "https://example.com/logo.svg" });

    await createTechnologyAction({
      name: "Node.js",
      category: "BACKEND",
      logo: "https://example.com/logo.svg",
    });

    expect(mockPrisma.technology.create).toHaveBeenCalledWith({
      data: { name: "Node.js", category: "BACKEND", logo: "https://example.com/logo.svg" },
    });
  });

  it("rejette si le nom existe déjà", async () => {
    mockPrisma.technology.findUnique.mockResolvedValue(mockTechnology);

    const result = await createTechnologyAction({
      name: "React",
      category: "FRONTEND",
    });

    expect(result).toHaveProperty("serverError");
    expect(mockPrisma.technology.create).not.toHaveBeenCalled();
  });
});

describe("updateTechnologyAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("met à jour une technologie existante", async () => {
    mockPrisma.technology.findFirst.mockResolvedValue(null);
    mockPrisma.technology.update.mockResolvedValue({
      ...mockTechnology,
      name: "React 19",
    });

    await expect(
      updateTechnologyAction({
        id: "tech-1",
        name: "React 19",
        category: "FRONTEND",
      })
    ).resolves.not.toThrow();

    expect(mockPrisma.technology.findFirst).toHaveBeenCalledWith({
      where: { name: "React 19", NOT: { id: "tech-1" } },
    });
    expect(mockPrisma.technology.update).toHaveBeenCalledWith({
      where: { id: "tech-1" },
      data: { name: "React 19", category: "FRONTEND" },
    });
  });

  it("rejette si un autre technologie a déjà le même nom", async () => {
    mockPrisma.technology.findFirst.mockResolvedValue({
      id: "other-tech",
      name: "React",
    });

    const result = await updateTechnologyAction({
      id: "tech-1",
      name: "React",
      category: "FRONTEND",
    });

    expect(result).toHaveProperty("serverError");
    expect(mockPrisma.technology.update).not.toHaveBeenCalled();
  });
});

describe("deleteTechnologyAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("supprime une technologie existante", async () => {
    mockPrisma.technology.delete.mockResolvedValue(mockTechnology);

    await expect(
      deleteTechnologyAction({ id: "tech-1" })
    ).resolves.not.toThrow();

    expect(mockPrisma.technology.delete).toHaveBeenCalledWith({
      where: { id: "tech-1" },
    });
  });
});
