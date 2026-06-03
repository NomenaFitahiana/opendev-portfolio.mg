import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createTestimonialAction,
  updateTestimonialAction,
  deleteTestimonialAction,
  toggleTestimonialActiveAction,
  getProjectsForSelectAction,
} from "../testimonial.action";

vi.mock("@/lib/prisma", () => ({
  default: {
    testimonial: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findUnique: vi.fn(),
    },
    project: {
      findMany: vi.fn(),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import prisma from "@/lib/prisma";

const mockPrisma = prisma as unknown as {
  testimonial: {
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    findUnique: ReturnType<typeof vi.fn>;
  };
  project: {
    findMany: ReturnType<typeof vi.fn>;
  };
};

const mockTestimonial = {
  id: "test-1",
  clientName: "Jean Dupont",
  clientRole: "CEO",
  company: "Acme Corp",
  content: "Excellent travail ! L'équipe a livré le projet dans les temps avec une qualité remarquable.",
  photo: null,
  projectId: null,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("createTestimonialAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("crée un témoignage avec des données valides", async () => {
    mockPrisma.testimonial.create.mockResolvedValue(mockTestimonial);

    await expect(
      createTestimonialAction({
        clientName: "Jean Dupont",
        clientRole: "CEO",
        company: "Acme Corp",
        content: "Excellent travail ! L'équipe a livré le projet dans les temps avec une qualité remarquable.",
      })
    ).resolves.not.toThrow();

    expect(mockPrisma.testimonial.create).toHaveBeenCalledWith({
      data: {
        clientName: "Jean Dupont",
        clientRole: "CEO",
        company: "Acme Corp",
        content: "Excellent travail ! L'équipe a livré le projet dans les temps avec une qualité remarquable.",
        photo: null,
        projectId: null,
        active: true,
      },
    });
  });

  it("crée un témoignage avec photo et projectId", async () => {
    mockPrisma.testimonial.create.mockResolvedValue({
      ...mockTestimonial,
      photo: "https://example.com/photo.jpg",
      projectId: "project-1",
    });

    await createTestimonialAction({
      clientName: "Alice Martin",
      clientRole: "CTO",
      company: "Tech Inc",
      content: "Une expérience formidable avec une équipe talentueuse et professionnelle.",
      photo: "https://example.com/photo.jpg",
      projectId: "project-1",
    });

    expect(mockPrisma.testimonial.create).toHaveBeenCalledWith({
      data: {
        clientName: "Alice Martin",
        clientRole: "CTO",
        company: "Tech Inc",
        content: "Une expérience formidable avec une équipe talentueuse et professionnelle.",
        photo: "https://example.com/photo.jpg",
        projectId: "project-1",
        active: true,
      },
    });
  });

  it("passe photo et projectId à null si vides", async () => {
    mockPrisma.testimonial.create.mockResolvedValue(mockTestimonial);

    await createTestimonialAction({
      clientName: "Bob",
      clientRole: "Dev",
      company: "Startup",
      content: "Super collaboration, je recommande vivement leurs services de qualité.",
      photo: "",
      projectId: "",
    });

    expect(mockPrisma.testimonial.create).toHaveBeenCalledWith({
      data: {
        clientName: "Bob",
        clientRole: "Dev",
        company: "Startup",
        content: "Super collaboration, je recommande vivement leurs services de qualité.",
        photo: null,
        projectId: null,
        active: true,
      },
    });
  });
});

describe("updateTestimonialAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("met à jour un témoignage existant", async () => {
    mockPrisma.testimonial.update.mockResolvedValue({
      ...mockTestimonial,
      clientName: "Jean Dupont Modifié",
    });

    await expect(
      updateTestimonialAction({
        id: "test-1",
        clientName: "Jean Dupont Modifié",
        clientRole: "CEO",
        company: "Acme Corp",
        content: "Excellent travail ! L'équipe a livré le projet dans les temps avec une qualité remarquable.",
      })
    ).resolves.not.toThrow();

    expect(mockPrisma.testimonial.update).toHaveBeenCalledWith({
      where: { id: "test-1" },
      data: {
        clientName: "Jean Dupont Modifié",
        clientRole: "CEO",
        company: "Acme Corp",
        content: "Excellent travail ! L'équipe a livré le projet dans les temps avec une qualité remarquable.",
        photo: null,
        projectId: null,
        active: true,
      },
    });
  });
});

describe("deleteTestimonialAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("supprime un témoignage existant", async () => {
    mockPrisma.testimonial.delete.mockResolvedValue(mockTestimonial);

    await expect(
      deleteTestimonialAction({ id: "test-1" })
    ).resolves.not.toThrow();

    expect(mockPrisma.testimonial.delete).toHaveBeenCalledWith({
      where: { id: "test-1" },
    });
  });
});

describe("toggleTestimonialActiveAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("désactive un témoignage actif", async () => {
    mockPrisma.testimonial.findUnique.mockResolvedValue({ active: true });
    mockPrisma.testimonial.update.mockResolvedValue({
      ...mockTestimonial,
      active: false,
    });

    await expect(
      toggleTestimonialActiveAction({ id: "test-1" })
    ).resolves.not.toThrow();

    expect(mockPrisma.testimonial.findUnique).toHaveBeenCalledWith({
      where: { id: "test-1" },
      select: { active: true },
    });
    expect(mockPrisma.testimonial.update).toHaveBeenCalledWith({
      where: { id: "test-1" },
      data: { active: false },
    });
  });

  it("active un témoignage désactivé", async () => {
    mockPrisma.testimonial.findUnique.mockResolvedValue({ active: false });
    mockPrisma.testimonial.update.mockResolvedValue({
      ...mockTestimonial,
      active: true,
    });

    await toggleTestimonialActiveAction({ id: "test-1" });

    expect(mockPrisma.testimonial.update).toHaveBeenCalledWith({
      where: { id: "test-1" },
      data: { active: true },
    });
  });

  it("retourne une erreur si le témoignage n'existe pas", async () => {
    mockPrisma.testimonial.findUnique.mockResolvedValue(null);

    const result = await toggleTestimonialActiveAction({ id: "inexistant" });

    expect(result).toHaveProperty("serverError");
    expect(mockPrisma.testimonial.update).not.toHaveBeenCalled();
  });
});

describe("getProjectsForSelectAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne la liste des projets pour le sélecteur", async () => {
    const mockProjects = [
      { id: "proj-1", title: "Application RH", slug: "application-rh" },
      { id: "proj-2", title: "Site E-commerce", slug: "site-ecommerce" },
    ];
    mockPrisma.project.findMany.mockResolvedValue(mockProjects);

    const result = await getProjectsForSelectAction();

    expect(result).toEqual({ data: mockProjects });
    expect(mockPrisma.project.findMany).toHaveBeenCalledWith({
      select: { id: true, title: true, slug: true },
      orderBy: { title: "asc" },
    });
  });

  it("retourne un tableau vide si aucun projet", async () => {
    mockPrisma.project.findMany.mockResolvedValue([]);

    const result = await getProjectsForSelectAction();

    expect(result).toEqual({ data: [] });
  });
});
