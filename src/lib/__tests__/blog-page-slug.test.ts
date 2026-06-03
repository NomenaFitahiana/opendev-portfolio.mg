import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  default: {
    blogPost: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import prisma from "@/lib/prisma";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";

const mockPrisma = prisma as unknown as {
  blogPost: {
    findUnique: ReturnType<typeof vi.fn>;
    findMany: ReturnType<typeof vi.fn>;
  };
};

const mockPost = {
  id: "post-1",
  slug: "mon-article",
  title: "Mon Article",
  excerpt: "Un résumé intéressant",
  content: "Contenu détaillé de l'article avec **markdown**.",
  coverImage: "https://example.com/image.jpg",
  category: "TECHNOLOGIE",
  tags: ["react", "nextjs"],
  published: true,
  featured: true,
  views: 42,
  authorId: "author-1",
  createdAt: new Date("2025-01-15T10:00:00Z"),
  updatedAt: new Date("2025-01-15T10:00:00Z"),
  author: {
    id: "author-1",
    name: "Jean Dupont",
    image: "https://example.com/avatar.jpg",
  },
};

describe("/blog/[slug] - generateStaticParams", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("génère les paramètres statiques à partir de tous les slugs publiés", async () => {
    mockPrisma.blogPost.findMany.mockResolvedValue([
      { slug: "article-1" },
      { slug: "article-2" },
      { slug: "article-3" },
    ]);

    const slugs = await getAllPostSlugs();

    expect(slugs).toEqual(["article-1", "article-2", "article-3"]);

    const staticParams = slugs.map((slug: string) => ({ slug }));
    expect(staticParams).toEqual([
      { slug: "article-1" },
      { slug: "article-2" },
      { slug: "article-3" },
    ]);
  });

  it("retourne un tableau vide si aucun post publié", async () => {
    mockPrisma.blogPost.findMany.mockResolvedValue([]);

    const slugs = await getAllPostSlugs();

    expect(slugs).toEqual([]);
  });
});

describe("/blog/[slug] - getPostBySlug (data fetching)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne un post complet avec les relations auteur", async () => {
    mockPrisma.blogPost.findUnique.mockResolvedValue(mockPost);

    const post = await getPostBySlug("mon-article");

    expect(post).toBeDefined();
    expect(post?.id).toBe("post-1");
    expect(post?.title).toBe("Mon Article");
    expect(post?.slug).toBe("mon-article");
    expect(post?.author).toBeDefined();
    expect(post?.author.name).toBe("Jean Dupont");
    expect(post?.featured).toBe(true);
    expect(post?.published).toBe(true);
    expect(mockPrisma.blogPost.findUnique).toHaveBeenCalledWith({
      where: { slug: "mon-article" },
      include: { author: { select: { id: true, name: true, image: true } } },
    });
  });

  it("retourne null pour un slug inexistant (déclenche notFound)", async () => {
    mockPrisma.blogPost.findUnique.mockResolvedValue(null);

    const post = await getPostBySlug("article-inexistant");

    expect(post).toBeNull();
  });
});

describe("/blog/[slug] - generateMetadata", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("génère les métadonnées avec le titre et la description du post", async () => {
    mockPrisma.blogPost.findUnique.mockResolvedValue(mockPost);

    const post = await getPostBySlug("mon-article");

    const metadata = {
      title: post?.title ?? "Article non trouvé",
      description: post?.excerpt || undefined,
    };

    expect(metadata.title).toBe("Mon Article");
    expect(metadata.description).toBe("Un résumé intéressant");
  });

  it("génère un titre par défaut si le post n'existe pas", async () => {
    mockPrisma.blogPost.findUnique.mockResolvedValue(null);

    const post = await getPostBySlug("inexistant");

    const metadata = {
      title: post?.title ?? "Article non trouvé",
    };

    expect(metadata.title).toBe("Article non trouvé");
  });
});

describe("/blog/[slug] - post content rendering data", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne le contenu markdown du post", async () => {
    mockPrisma.blogPost.findUnique.mockResolvedValue(mockPost);

    const post = await getPostBySlug("mon-article");

    expect(post?.content).toBe("Contenu détaillé de l'article avec **markdown**.");
  });

  it("retourne l'image de couverture si présente", async () => {
    mockPrisma.blogPost.findUnique.mockResolvedValue(mockPost);

    const post = await getPostBySlug("mon-article");

    expect(post?.coverImage).toBe("https://example.com/image.jpg");
  });

  it("gère l'absence d'image de couverture", async () => {
    mockPrisma.blogPost.findUnique.mockResolvedValue({ ...mockPost, coverImage: null });

    const post = await getPostBySlug("mon-article");

    expect(post?.coverImage).toBeNull();
  });

  it("retourne les tags du post", async () => {
    mockPrisma.blogPost.findUnique.mockResolvedValue(mockPost);

    const post = await getPostBySlug("mon-article");

    expect(post?.tags).toEqual(["react", "nextjs"]);
  });

  it("retourne la catégorie et le badge featured", async () => {
    mockPrisma.blogPost.findUnique.mockResolvedValue(mockPost);

    const post = await getPostBySlug("mon-article");

    expect(post?.category).toBe("TECHNOLOGIE");
    expect(post?.featured).toBe(true);

    const categoryLabels: Record<string, string> = {
      ENTREPRISE: "Entreprise",
      TECHNOLOGIE: "Technologie",
      PROJETS: "Projets",
      CARRIERES: "Carrières",
      EVENEMENTS: "Événements",
    };

    expect(post?.category).toBe("TECHNOLOGIE");
    expect(categoryLabels["TECHNOLOGIE"]).toBe("Technologie");
  });

  it("formate la date de création en français", async () => {
    mockPrisma.blogPost.findUnique.mockResolvedValue(mockPost);

    const post = await getPostBySlug("mon-article");
    const formattedDate = new Date(post!.createdAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    expect(formattedDate).toBe("15 janvier 2025");
  });
});
