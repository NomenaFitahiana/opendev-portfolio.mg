import { describe, it, expect } from "vitest";
import { testimonialSchema } from "@/schemas";

describe("testimonialSchema", () => {
  const validTestimonial = {
    clientName: "Jean Dupont",
    clientRole: "CEO",
    company: "Acme Corp",
    content: "Excellent travail ! L'équipe a livré le projet dans les temps avec une qualité remarquable.",
  };

  it("accepte des données valides", () => {
    const result = testimonialSchema.safeParse(validTestimonial);
    expect(result.success).toBe(true);
  });

  it("applique la valeur par défaut active=true", () => {
    const result = testimonialSchema.safeParse(validTestimonial);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.active).toBe(true);
    }
  });

  it("accepte active=false", () => {
    const result = testimonialSchema.safeParse({
      ...validTestimonial,
      active: false,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.active).toBe(false);
    }
  });

  it("accepte un photo URL valide", () => {
    const result = testimonialSchema.safeParse({
      ...validTestimonial,
      photo: "https://example.com/photo.jpg",
    });
    expect(result.success).toBe(true);
  });

  it("accepte photo vide", () => {
    const result = testimonialSchema.safeParse({
      ...validTestimonial,
      photo: "",
    });
    expect(result.success).toBe(true);
  });

  it("accepte un projectId", () => {
    const result = testimonialSchema.safeParse({
      ...validTestimonial,
      projectId: "project-1",
    });
    expect(result.success).toBe(true);
  });

  it("rejette un clientName trop court", () => {
    const result = testimonialSchema.safeParse({
      ...validTestimonial,
      clientName: "A",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un clientName trop long (>60)", () => {
    const result = testimonialSchema.safeParse({
      ...validTestimonial,
      clientName: "a".repeat(61),
    });
    expect(result.success).toBe(false);
  });

  it("rejette un clientRole trop court", () => {
    const result = testimonialSchema.safeParse({
      ...validTestimonial,
      clientRole: "A",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un clientRole trop long (>80)", () => {
    const result = testimonialSchema.safeParse({
      ...validTestimonial,
      clientRole: "a".repeat(81),
    });
    expect(result.success).toBe(false);
  });

  it("rejette un company trop court", () => {
    const result = testimonialSchema.safeParse({
      ...validTestimonial,
      company: "A",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un company trop long (>80)", () => {
    const result = testimonialSchema.safeParse({
      ...validTestimonial,
      company: "a".repeat(81),
    });
    expect(result.success).toBe(false);
  });

  it("rejette un content trop court (<20)", () => {
    const result = testimonialSchema.safeParse({
      ...validTestimonial,
      content: "Trop court",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un content trop long (>500)", () => {
    const result = testimonialSchema.safeParse({
      ...validTestimonial,
      content: "a".repeat(501),
    });
    expect(result.success).toBe(false);
  });

  it("rejette un photo URL invalide", () => {
    const result = testimonialSchema.safeParse({
      ...validTestimonial,
      photo: "pas-une-url",
    });
    expect(result.success).toBe(false);
  });
});
