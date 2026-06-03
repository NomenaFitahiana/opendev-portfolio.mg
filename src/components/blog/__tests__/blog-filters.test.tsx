// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogFilters } from "../blog-filters";

describe("BlogFilters - category filtering UI", () => {
  it("affiche le bouton 'Tous' avec le variant default quand aucune catégorie sélectionnée", () => {
    render(<BlogFilters />);

    const tousButton = screen.getByText("Tous");
    expect(tousButton).toBeInTheDocument();
  });

  it("affiche toutes les catégories disponibles", () => {
    render(<BlogFilters />);

    expect(screen.getByText("Entreprise")).toBeInTheDocument();
    expect(screen.getByText("Technologie")).toBeInTheDocument();
    expect(screen.getByText("Projets")).toBeInTheDocument();
    expect(screen.getByText("Carrières")).toBeInTheDocument();
    expect(screen.getByText("Événements")).toBeInTheDocument();
  });

  it("affiche le lien 'Tous' pointant vers /blog quand une catégorie est active", () => {
    render(<BlogFilters currentCategory="TECHNOLOGIE" />);

    const tousLink = screen.getByText("Tous");
    expect(tousLink.closest("a")).toHaveAttribute("href", "/blog");
  });

  it("affiche les liens de catégorie vers /blog/category/[category]", () => {
    render(<BlogFilters />);

    const technologieLink = screen.getByText("Technologie").closest("a");
    expect(technologieLink).toHaveAttribute("href", "/blog/category/technologie");

    const projetsLink = screen.getByText("Projets").closest("a");
    expect(projetsLink).toHaveAttribute("href", "/blog/category/projets");
  });

  it("n'affiche pas les tags quand le tableau est vide", () => {
    render(<BlogFilters tags={[]} />);

    expect(screen.queryByText(/#/)).not.toBeInTheDocument();
  });

  it("affiche les tags quand ils sont fournis", () => {
    render(<BlogFilters tags={["react", "nextjs", "typescript"]} />);

    expect(screen.getByText("#react")).toBeInTheDocument();
    expect(screen.getByText("#nextjs")).toBeInTheDocument();
    expect(screen.getByText("#typescript")).toBeInTheDocument();
  });

  it("affiche 5 boutons de catégories au total", () => {
    render(<BlogFilters />);

    const categoryButtons = [
      "Entreprise",
      "Technologie",
      "Projets",
      "Carrières",
      "Événements",
    ];
    categoryButtons.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
