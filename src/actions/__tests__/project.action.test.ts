import { describe, it, expect, vi, beforeEach } from "vitest";
import { createProjectAction, deleteProjectAction, duplicateProjectAction, updateProjectAction } from "../project.action";

vi.mock("@/lib/prisma", () => ({
  default: {
    project: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findFirst: vi.fn(),
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
  project: {
    create: ReturnType<typeof vi.fn>;
    findUnique: ReturnType<typeof vi.fn>;
    findFirst: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
};

describe("createProjectAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("crée un projet avec des données valides", async () => {
    mockPrisma.project.findUnique.mockResolvedValue(null);
    mockPrisma.project.create.mockResolvedValue({
      id: "new-project-id",
      title: "Application RH",
      slug: "application-rh",
      clientName: "Acme Corp",
      shortDescription: "Une app RH moderne",
      longDescription: "Description complète",
      duration: 30,
      teamSize: 3,
      status: "COMPLETED" as const,
      featured: false,
      hideClientName: false,
    });

    await expect(
      createProjectAction({
        title: "Application RH",
        clientName: "Acme Corp",
        shortDescription: "Une app RH moderne",
        longDescription: "Description complète",
        duration: 30,
        teamSize: 3,
        technologyIds: [],
      })
    ).resolves.not.toThrow();

    expect(mockPrisma.project.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        title: "Application RH",
        slug: "application-rh",
        clientName: "Acme Corp",
      }),
    });
  });

  it("rejette si le slug existe déjà", async () => {
    mockPrisma.project.findUnique.mockResolvedValue({
      id: "existing-id",
      title: "Application RH",
      slug: "application-rh",
    });

    const result = await createProjectAction({
      title: "Application RH",
      clientName: "Acme Corp",
      shortDescription: "Une app RH moderne",
      longDescription: "Description complète",
      duration: 30,
      teamSize: 3,
      technologyIds: [],
    });

    expect(result).toHaveProperty("serverError");
  });

  it("génère un slug correct", async () => {
    mockPrisma.project.findUnique.mockResolvedValue(null);
    mockPrisma.project.create.mockResolvedValue({ id: "id", slug: "mon-nouveau-projet" });

    await createProjectAction({
      title: "Mon Nouveau Projet!",
      clientName: "Client A",
      shortDescription: "Short",
      longDescription: "Long",
      duration: 10,
      teamSize: 1,
      technologyIds: [],
    });

    expect(mockPrisma.project.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        slug: "mon-nouveau-projet",
      }),
    });
  });
});

describe("deleteProjectAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("supprime un projet existant", async () => {
    mockPrisma.project.delete.mockResolvedValue({ id: "project-to-delete" });

    await expect(deleteProjectAction({ id: "project-to-delete" })).resolves.not.toThrow();

    expect(mockPrisma.project.delete).toHaveBeenCalledWith({
      where: { id: "project-to-delete" },
    });
  });
});

describe("duplicateProjectAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("duplique un projet existant", async () => {
    const originalProject = {
      id: "original-id",
      title: "Projet Original",
      slug: "projet-original",
      clientName: "Client A",
      shortDescription: "Description",
      longDescription: "Longue description",
      duration: 30,
      teamSize: 3,
      budget: null,
      metrics: null,
      problem: null,
      solution: null,
      status: "COMPLETED" as const,
      featured: false,
      hideClientName: false,
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      technologies: [{ id: "tech-1" }],
    };

    mockPrisma.project.findUnique.mockResolvedValue(originalProject);
    mockPrisma.project.create.mockResolvedValue({
      ...originalProject,
      id: "new-id",
      title: "Projet Original (copie)",
    });

    await expect(duplicateProjectAction({ id: "original-id" })).resolves.not.toThrow();

    expect(mockPrisma.project.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        title: "Projet Original (copie)",
        technologies: { connect: [{ id: "tech-1" }] },
      }),
    });
  });

  it("retourne une erreur si le projet n'existe pas", async () => {
    mockPrisma.project.findUnique.mockResolvedValue(null);

    const result = await duplicateProjectAction({ id: "inexistant" });

    expect(result).toHaveProperty("serverError");
  });
});