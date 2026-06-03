// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogCard } from "../blog-card";

const mockPost = {
  id: "post-1",
  slug: "mon-article",
  title: "Mon Article de Blog",
  excerpt: "Un résumé intéressant de l'article.",
  content: "Contenu complet de l'article avec beaucoup de détails.",
  coverImage: "https://example.com/image.jpg",
  category: "TECHNOLOGIE",
  tags: ["react", "nextjs"],
  published: true,
  featured: true,
  views: 42,
  authorId: "author-1",
  author: {
    id: "author-1",
    name: "Jean Dupont",
    image: null,
  },
  createdAt: new Date("2025-01-15T10:00:00Z"),
  updatedAt: new Date("2025-01-15T10:00:00Z"),
};

describe("BlogCard", () => {
  it("affiche le titre de l'article", () => {
    render(<BlogCard post={mockPost} />);

    expect(screen.getByText("Mon Article de Blog")).toBeInTheDocument();
  });

  it("affiche le résumé de l'article", () => {
    render(<BlogCard post={mockPost} />);

    expect(screen.getByText("Un résumé intéressant de l'article.")).toBeInTheDocument();
  });

  it("affiche le badge de catégorie", () => {
    render(<BlogCard post={mockPost} />);

    expect(screen.getByText("Technologie")).toBeInTheDocument();
  });

  it("affiche le badge 'À la une' pour les articles featured", () => {
    render(<BlogCard post={mockPost} />);

    expect(screen.getByText("À la une")).toBeInTheDocument();
  });

  it("n'affiche pas le badge 'À la une' si l'article n'est pas featured", () => {
    render(<BlogCard post={{ ...mockPost, featured: false }} />);

    expect(screen.queryByText("À la une")).not.toBeInTheDocument();
  });

  it("affiche le nom de l'auteur", () => {
    render(<BlogCard post={mockPost} />);

    expect(screen.getByText("Jean Dupont")).toBeInTheDocument();
  });

  it("contient un lien vers la page de l'article", () => {
    render(<BlogCard post={mockPost} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/blog/mon-article");
  });
});
