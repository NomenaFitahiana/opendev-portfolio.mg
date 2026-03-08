import z from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Email invalide" }),
  password: z.string().min(8, { error: "Mot de passe trop court" }),
  rememberMe: z.boolean().default(false),
});
