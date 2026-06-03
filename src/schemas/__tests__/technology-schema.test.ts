import { describe, it, expect } from "vitest";
import { technologySchema } from "@/schemas";

describe("technologySchema", () => {
  const validTechnology = {
    name: "React",
    category: "FRONTEND" as const,
  };

  it("accepte des données valides (nom + catégorie)", () => {
    const result = technologySchema.safeParse(validTechnology);
    expect(result.success).toBe(true);
  });

  it("accepte un logo optionnel", () => {
    const result = technologySchema.safeParse({
      ...validTechnology,
      logo: "https://example.com/react.svg",
    });
    expect(result.success).toBe(true);
  });

  it("accepte sans logo", () => {
    const result = technologySchema.safeParse(validTechnology);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.logo).toBeUndefined();
    }
  });

  it("rejette un nom trop court (< 2 caractères)", () => {
    const result = technologySchema.safeParse({
      ...validTechnology,
      name: "A",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un nom trop long (> 50 caractères)", () => {
    const result = technologySchema.safeParse({
      ...validTechnology,
      name: "a".repeat(51),
    });
    expect(result.success).toBe(false);
  });

  it("rejette un nom vide", () => {
    const result = technologySchema.safeParse({
      ...validTechnology,
      name: "",
    });
    expect(result.success).toBe(false);
  });

  it.each([
    "FRONTEND",
    "BACKEND",
    "MOBILE",
    "DATABASE",
    "DEVOPS",
    "DESIGN",
    "OTHER",
  ] as const)("accepte la catégorie valide: %s", (category: string) => {
    const result = technologySchema.safeParse({
      ...validTechnology,
      category,
    });
    expect(result.success).toBe(true);
  });

  it("rejette une catégorie invalide", () => {
    const result = technologySchema.safeParse({
      ...validTechnology,
      category: "INVALID",
    });
    expect(result.success).toBe(false);
  });

  it("rejette une catégorie vide", () => {
    const result = technologySchema.safeParse({
      ...validTechnology,
      category: "",
    });
    expect(result.success).toBe(false);
  });
});
