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
