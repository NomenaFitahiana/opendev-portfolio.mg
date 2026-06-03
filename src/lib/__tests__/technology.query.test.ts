import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  default: {
    technology: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

import prisma from "@/lib/prisma";
import { getTechnologies, getTechnologyStats } from "@/lib/query/technology.query";

const mockPrisma = prisma as unknown as {
  technology: {
    findMany: ReturnType<typeof vi.fn>;
    count: ReturnType<typeof vi.fn>;
  };
};

const mockTechnology = {
  id: "tech-1",
  name: "React",
  category: "FRONTEND",
  logo: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  _count: { projects: 3 },
};

describe("getTechnologies", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne toutes les technologies sans filtre", async () => {
    mockPrisma.technology.findMany.mockResolvedValue([mockTechnology]);
    mockPrisma.technology.count.mockResolvedValue(1);

    const result = await getTechnologies();

    expect(result.technologies).toHaveLength(1);
    expect(result.total).toBe(1);
    expect(result.pages).toBe(1);
    expect(mockPrisma.technology.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {},
        orderBy: [{ category: "asc" }, { name: "asc" }],
        skip: 0,
        take: 10,
      })
    );
  });

  it("filtre par recherche", async () => {
    mockPrisma.technology.findMany.mockResolvedValue([mockTechnology]);
    mockPrisma.technology.count.mockResolvedValue(1);

    await getTechnologies({ search: "React" });

    expect(mockPrisma.technology.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          name: { contains: "React", mode: "insensitive" },
        },
      })
    );
  });

  it("filtre par catégorie", async () => {
    mockPrisma.technology.findMany.mockResolvedValue([]);
    mockPrisma.technology.count.mockResolvedValue(0);

    await getTechnologies({ category: "BACKEND" });

    expect(mockPrisma.technology.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { category: "BACKEND" },
      })
    );
  });

  it("gère la pagination", async () => {
    mockPrisma.technology.findMany.mockResolvedValue([]);
    mockPrisma.technology.count.mockResolvedValue(25);

    const result = await getTechnologies({ page: 3, limit: 10 });

    expect(mockPrisma.technology.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 20, take: 10 })
    );
    expect(result.pages).toBe(3);
    expect(result.page).toBe(3);
  });

  it("retourne le nombre de projets associés (_count)", async () => {
    mockPrisma.technology.findMany.mockResolvedValue([mockTechnology]);
    mockPrisma.technology.count.mockResolvedValue(1);

    const result = await getTechnologies();

    expect(mockPrisma.technology.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        include: {
          _count: { select: { projects: true } },
        },
      })
    );
    expect(result.technologies[0]._count.projects).toBe(3);
  });

  it("retourne un tableau vide si aucune technologie", async () => {
    mockPrisma.technology.findMany.mockResolvedValue([]);
    mockPrisma.technology.count.mockResolvedValue(0);

    const result = await getTechnologies();

    expect(result.technologies).toEqual([]);
    expect(result.total).toBe(0);
    expect(result.pages).toBe(0);
  });
});

describe("getTechnologyStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne les statistiques globales des technologies", async () => {
    mockPrisma.technology.count.mockResolvedValueOnce(10); // totalTechnologies
    mockPrisma.technology.count.mockResolvedValueOnce(5);  // activeTechnologies
    mockPrisma.technology.findMany.mockResolvedValue([
      { category: "FRONTEND" },
      { category: "BACKEND" },
      { category: "DATABASE" },
    ]);

    const stats = await getTechnologyStats();

    expect(stats.totalTechnologies).toBe(10);
    expect(stats.activeTechnologies).toBe(5);
    expect(stats.categoriesCount).toBe(3);
  });

  it("retourne 0 pour les technologies actives si aucune n'est utilisée", async () => {
    mockPrisma.technology.count.mockResolvedValueOnce(5);
    mockPrisma.technology.count.mockResolvedValueOnce(0);
    mockPrisma.technology.findMany.mockResolvedValue([
      { category: "FRONTEND" },
    ]);

    const stats = await getTechnologyStats();

    expect(stats.totalTechnologies).toBe(5);
    expect(stats.activeTechnologies).toBe(0);
    expect(stats.categoriesCount).toBe(1);
  });

  it("retourne 0 catégories si aucune technologie", async () => {
    mockPrisma.technology.count.mockResolvedValueOnce(0);
    mockPrisma.technology.count.mockResolvedValueOnce(0);
    mockPrisma.technology.findMany.mockResolvedValue([]);

    const stats = await getTechnologyStats();

    expect(stats.totalTechnologies).toBe(0);
    expect(stats.activeTechnologies).toBe(0);
    expect(stats.categoriesCount).toBe(0);
  });
});
