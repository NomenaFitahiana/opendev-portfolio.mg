import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  default: {
    blogPost: {
      findMany: vi.fn(),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import prisma from "@/lib/prisma";
import { getPublishedPosts, getAllTags } from "@/lib/blog";

const mockPrisma = prisma as unknown as {
  blogPost: {
    findMany: ReturnType<typeof vi.fn>;
  };
};

describe("Category filtering - getPublishedPosts avec filtre catégorie", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("filtre les posts par catégorie spécifique", async () => {
    mockPrisma.blogPost.findMany.mockResolvedValue([]);

    await getPublishedPosts({ category: "TECHNOLOGIE" });

    expect(mockPrisma.blogPost.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          published: true,
          category: "TECHNOLOGIE",
        }),
      })
    );
  });

  it("retourne tous les posts publiés sans filtre catégorie", async () => {
    mockPrisma.blogPost.findMany.mockResolvedValue([
      { id: "1", category: "TECHNOLOGIE", published: true },
      { id: "2", category: "PROJETS", published: true },
    ]);

    const result = await getPublishedPosts();

    expect(result).toHaveLength(2);
    expect(mockPrisma.blogPost.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { published: true },
      })
    );
  });

  it("retourne les posts de la catégorie ENTREPRISE", async () => {
    mockPrisma.blogPost.findMany.mockResolvedValue([
      { id: "1", category: "ENTREPRISE", published: true, title: "Vie chez OpenDev" },
    ]);

    const result = await getPublishedPosts({ category: "ENTREPRISE" });

    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("ENTREPRISE");
  });

  it("retourne un tableau vide si aucun post dans la catégorie", async () => {
    mockPrisma.blogPost.findMany.mockResolvedValue([]);

    const result = await getPublishedPosts({ category: "CARRIERES" });

    expect(result).toEqual([]);
  });
});

describe("Category page - category labels mapping", () => {
  const categoryLabels: Record<string, string> = {
    ENTREPRISE: "Entreprise",
    TECHNOLOGIE: "Technologie",
    PROJETS: "Projets",
    CARRIERES: "Carrières",
    EVENEMENTS: "Événements",
  };

  it("mappe toutes les catégories vers leur libellé français", () => {
    expect(categoryLabels["ENTREPRISE"]).toBe("Entreprise");
    expect(categoryLabels["TECHNOLOGIE"]).toBe("Technologie");
    expect(categoryLabels["PROJETS"]).toBe("Projets");
    expect(categoryLabels["CARRIERES"]).toBe("Carrières");
    expect(categoryLabels["EVENEMENTS"]).toBe("Événements");
  });

  it("retourne la clé elle-même si le libellé n'existe pas", () => {
    const label = categoryLabels["UNKNOWN" as keyof typeof categoryLabels];
    expect(label).toBeUndefined();
  });
});

describe("Category page - getAllTags pour les filtres", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne tous les tags uniques pour le filtrage", async () => {
    mockPrisma.blogPost.findMany.mockResolvedValue([
      { tags: ["react", "nextjs"] },
      { tags: ["react", "typescript"] },
      { tags: ["nextjs", "tailwind"] },
    ]);

    const tags = await getAllTags();

    expect(tags).toEqual(["nextjs", "react", "tailwind", "typescript"]);
  });

  it("retourne un tableau vide si aucun post", async () => {
    mockPrisma.blogPost.findMany.mockResolvedValue([]);

    const tags = await getAllTags();

    expect(tags).toEqual([]);
  });
});
