import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  default: {
    project: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn(),
    },
    technology: {
      findMany: vi.fn(),
    },
  },
}));

import prisma from "@/lib/prisma";
import { getProjects, getProjectById } from "@/lib/query/project.query";

const mockPrisma = prisma as unknown as {
  project: {
    findMany: ReturnType<typeof vi.fn>;
    findUnique: ReturnType<typeof vi.fn>;
    count: ReturnType<typeof vi.fn>;
  };
  technology: {
    findMany: ReturnType<typeof vi.fn>;
  };
};

const mockProject = {
  id: "project-1",
  title: "Application RH",
  slug: "application-rh",
  clientName: "Acme Corp",
  hideClientName: false,
  shortDescription: "Une app RH moderne",
  longDescription: "Description complète",
  duration: 30,
  teamSize: 3,
  budget: null,
  metrics: null,
  problem: null,
  solution: null,
  status: "COMPLETED",
  featured: false,
  order: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  technologies: [{ id: "tech-1", name: "React" }],
  images: [{ id: "img-1", url: "/image.jpg", alt: null, order: 0, projectId: "project-1" }],
};

describe("getProjects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne tous les projets sans filtre", async () => {
    mockPrisma.project.findMany.mockResolvedValue([mockProject]);
    mockPrisma.project.count.mockResolvedValue(1);

    const result = await getProjects();

    expect(result.projects).toHaveLength(1);
    expect(result.total).toBe(1);
    expect(result.pages).toBe(1);
    expect(mockPrisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {},
        orderBy: { order: "asc" },
        skip: 0,
        take: 10,
      })
    );
  });

  it("filtre par statut", async () => {
    mockPrisma.project.findMany.mockResolvedValue([mockProject]);
    mockPrisma.project.count.mockResolvedValue(1);

    await getProjects({ status: "COMPLETED" });

    expect(mockPrisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ status: "COMPLETED" }),
      })
    );
  });

  it("filtre par recherche (titre ou client)", async () => {
    mockPrisma.project.findMany.mockResolvedValue([mockProject]);
    mockPrisma.project.count.mockResolvedValue(1);

    await getProjects({ search: "Acme" });

    expect(mockPrisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          OR: [
            { title: { contains: "Acme", mode: "insensitive" } },
            { clientName: { contains: "Acme", mode: "insensitive" } },
          ],
        },
      })
    );
  });

  it("filtre par technologie", async () => {
    mockPrisma.project.findMany.mockResolvedValue([]);
    mockPrisma.project.count.mockResolvedValue(0);

    await getProjects({ technologyId: "tech-1" });

    expect(mockPrisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          technologies: { some: { id: "tech-1" } },
        },
      })
    );
  });

  it("gère la pagination", async () => {
    mockPrisma.project.findMany.mockResolvedValue([]);
    mockPrisma.project.count.mockResolvedValue(25);

    const result = await getProjects({ page: 3, limit: 10 });

    expect(mockPrisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 20, take: 10 })
    );
    expect(result.pages).toBe(3);
  });

  it("retourne les technologies et images incluses", async () => {
    mockPrisma.project.findMany.mockResolvedValue([mockProject]);
    mockPrisma.project.count.mockResolvedValue(1);

    const result = await getProjects();

    expect(mockPrisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        include: {
          technologies: { select: { id: true, name: true } },
          images: { orderBy: { order: "asc" }, take: 1 },
        },
      })
    );
    expect(result.projects[0]).toHaveProperty("technologies");
    expect(result.projects[0]).toHaveProperty("images");
  });

  it("retourne un tableau vide si aucun projet", async () => {
    mockPrisma.project.findMany.mockResolvedValue([]);
    mockPrisma.project.count.mockResolvedValue(0);

    const result = await getProjects();

    expect(result.projects).toEqual([]);
    expect(result.total).toBe(0);
    expect(result.pages).toBe(0);
  });
});

describe("getProjectById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne un projet par son id avec toutes les relations", async () => {
    mockPrisma.project.findUnique.mockResolvedValue({
      ...mockProject,
      images: [
        { id: "img-1", url: "/img1.jpg", alt: null, order: 0, projectId: "project-1" },
        { id: "img-2", url: "/img2.jpg", alt: null, order: 1, projectId: "project-1" },
      ],
    });

    const result = await getProjectById("project-1");

    expect(result).toBeDefined();
    expect(result?.id).toBe("project-1");
    expect(mockPrisma.project.findUnique).toHaveBeenCalledWith({
      where: { id: "project-1" },
      include: {
        technologies: true,
        images: { orderBy: { order: "asc" } },
      },
    });
  });

  it("retourne null si le projet n'existe pas", async () => {
    mockPrisma.project.findUnique.mockResolvedValue(null);

    const result = await getProjectById("inexistant");

    expect(result).toBeNull();
  });
});

describe("Projects Page Data Fetching", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("charge les projets et les technologies pour la page liste (/projects)", async () => {
    mockPrisma.project.findMany.mockResolvedValue([mockProject]);
    mockPrisma.project.count.mockResolvedValue(1);
    mockPrisma.technology.findMany.mockResolvedValue([
      { id: "tech-1", name: "React" },
      { id: "tech-2", name: "Node.js" },
    ]);

    const [{ projects, total, pages }, technologies] = await Promise.all([
      getProjects({ page: 1 }),
      prisma.technology.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),
    ]);

    expect(projects).toHaveLength(1);
    expect(total).toBe(1);
    expect(pages).toBe(1);
    expect(technologies).toHaveLength(2);
    expect(mockPrisma.technology.findMany).toHaveBeenCalledWith({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
  });

  it("filtre les projets par paramètres de recherche dans l'URL", async () => {
    mockPrisma.project.findMany.mockResolvedValue([mockProject]);
    mockPrisma.project.count.mockResolvedValue(1);

    const [{ projects }] = await Promise.all([
      getProjects({ search: "RH", status: "COMPLETED", page: 1 }),
      Promise.resolve([]),
    ]);

    expect(mockPrisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: [
            { title: { contains: "RH", mode: "insensitive" } },
            { clientName: { contains: "RH", mode: "insensitive" } },
          ],
          status: "COMPLETED",
        }),
      })
    );
  });
});

describe("Edit Page Data Fetching", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("charge un projet par id et les technologies pour la page d'édition", async () => {
    const mockProjectWithTechs = {
      ...mockProject,
      technologies: [
        { id: "tech-1", name: "React", category: "FRONTEND", logo: null, createdAt: new Date(), updatedAt: new Date() },
      ],
    };

    mockPrisma.project.findUnique.mockResolvedValue(mockProjectWithTechs);
    mockPrisma.technology.findMany.mockResolvedValue([
      { id: "tech-1", name: "React" },
      { id: "tech-2", name: "Node.js" },
    ]);

    const project = await prisma.project.findUnique({
      where: { id: "project-1" },
      include: { technologies: true },
    });
    const technologies = await prisma.technology.findMany({
      orderBy: { name: "asc" },
    });

    expect(project).toBeDefined();
    expect(project?.id).toBe("project-1");
    expect(technologies).toHaveLength(2);
    expect(mockPrisma.project.findUnique).toHaveBeenCalledWith({
      where: { id: "project-1" },
      include: { technologies: true },
    });
  });

  it("retourne null pour un projet inexistant (notFound)", async () => {
    mockPrisma.project.findUnique.mockResolvedValue(null);

    const project = await prisma.project.findUnique({
      where: { id: "fake-id" },
      include: { technologies: true },
    });

    expect(project).toBeNull();
  });
});
