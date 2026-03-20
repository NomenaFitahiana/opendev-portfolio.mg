import z from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Email invalide" }),
  password: z.string().min(8, { error: "Mot de passe trop court" }),
  rememberMe: z.boolean().default(false),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { error: "Le mot de passe doit contenir au moins 8 caractères" })
      .max(60, { error: "Le mot de passe ne doit pas dépasser 60 caractères" }),
    confirmPassword: z
      .string()
      .min(1, { error: "Veuillez confirmer votre mot de passe" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(80, "Le nom est trop long."),
  email: z.email("Adresse email invalide.").min(1, "L'email est requis."),
  projectDescription: z
    .string()
    .min(20, "Décrivez votre projet en au moins 20 caractères.")
    .max(1000, "La description ne doit pas dépasser 1000 caractères."),
  budget: z.string().min(1, "Veuillez sélectionner une fourchette de budget."),
});

export const projectSchema = z.object({
  title: z.string().min(2, "Titre requis"),
  clientName: z.string().min(1, "Nom du client requis"),
  hideClientName: z.boolean().default(false),
  shortDescription: z.string().max(200, "Maximum 200 caractères"),
  longDescription: z.string().min(1, "Description détaillée requise"),
  problem: z.string().optional(),
  solution: z.string().optional(),
  technologyIds: z.array(z.string()).default([]),
  duration: z.coerce.number().min(1),
  teamSize: z.coerce.number().min(1),
  budget: z.coerce.number().optional(),
  metrics: z.string().optional(),
  status: z.enum(["IN_PROGRESS", "COMPLETED", "FEATURED"]).default("COMPLETED"),
  featured: z.boolean().default(false),
  order: z.coerce.number().default(0),
});
