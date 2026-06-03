// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    refresh: vi.fn(),
  })),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/components/templates/forward-ref-editor", () => ({
  ForwardRefEditor: vi.fn(() => <div data-testid="mdx-editor" />),
}));

import { BlogPostForm } from "../blog-post-form";

describe("BlogPostForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche le formulaire en mode création avec les valeurs par défaut", () => {
    render(<BlogPostForm mode="create" />);

    expect(screen.getByText("Informations générales")).toBeInTheDocument();
    expect(screen.getByText("Contenu (MDX)")).toBeInTheDocument();
    expect(screen.getByText("Options de publication")).toBeInTheDocument();
    expect(screen.getByText("Prévisualisation")).toBeInTheDocument();
    expect(screen.getByText("Créer l'article")).toBeInTheDocument();
    expect(screen.getByText("Annuler")).toBeInTheDocument();
  });

  it("affiche le formulaire en mode édition avec le texte de bouton approprié", () => {
    render(<BlogPostForm mode="edit" />);

    expect(screen.getByText("Mettre à jour")).toBeInTheDocument();
  });

  it("affiche le mode édition avec les valeurs par défaut fournies", () => {
    render(
      <BlogPostForm
        mode="edit"
        defaultValues={{
          id: "post-1",
          title: "Mon Article",
          slug: "mon-article",
          excerpt: "Un résumé",
          content: "Contenu",
          category: "TECHNOLOGIE",
          tags: ["react", "nextjs"],
          published: true,
          featured: false,
        }}
      />
    );

    expect(screen.getByText("Mettre à jour")).toBeInTheDocument();
  });

  it("affiche les champs du formulaire", () => {
    render(<BlogPostForm mode="create" />);

    expect(screen.getByText("Titre *")).toBeInTheDocument();
    expect(screen.getByText("Slug *")).toBeInTheDocument();
    expect(screen.getByText("Résumé")).toBeInTheDocument();
    expect(screen.getByText("Catégorie *")).toBeInTheDocument();
    expect(screen.getByText("Image de couverture (URL)")).toBeInTheDocument();
    expect(screen.getByText("Tags (séparés par des virgules)")).toBeInTheDocument();
  });

  it("affiche les options de publication (publié et à la une)", () => {
    render(<BlogPostForm mode="create" />);

    expect(screen.getByText("Publié")).toBeInTheDocument();
    expect(screen.getByText("À la une")).toBeInTheDocument();
  });

  it("affiche la zone d'édition MDX", () => {
    render(<BlogPostForm mode="create" />);

    expect(screen.getByTestId("mdx-editor")).toBeInTheDocument();
  });

  it("affiche la prévisualisation avec le titre et le résumé", () => {
    render(
      <BlogPostForm
        defaultValues={{
          id: "post-1",
          title: "Titre de test",
          slug: "titre-de-test",
          excerpt: "Résumé de test",
          content: "Contenu",
          category: "TECHNOLOGIE",
          tags: [],
          published: false,
          featured: false,
        }}
      />
    );

    expect(screen.getByText("Titre de test")).toBeInTheDocument();
    expect(screen.getByText("Résumé de test")).toBeInTheDocument();
    expect(screen.getAllByText("Technologie").length).toBeGreaterThanOrEqual(1);
  });

  it("affiche le nom de la catégorie dans la prévisualisation", () => {
    render(
      <BlogPostForm
        defaultValues={{
          id: "post-1",
          title: "Projet",
          slug: "projet",
          content: "Contenu",
          category: "PROJETS",
          tags: [],
          published: false,
          featured: false,
        }}
      />
    );

    expect(screen.getAllByText("Projets").length).toBeGreaterThanOrEqual(1);
  });
});
