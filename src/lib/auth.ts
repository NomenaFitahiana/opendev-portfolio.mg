import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import bcrypt from "bcrypt";
import { sendEmail } from "./mailer";
import { getServerUrl } from "./getServerUrl";

export const auth = betterAuth({
  appName: "OpenDev Portfolio",
  baseUrl: process.env.BETTER_AUTH_BASE_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    resetPasswordTokenExpiresIn: 60 * 60 * 24, // expires in a day
    password: {
      hash: async (password) => {
        return await bcrypt.hash(password, 10);
      },
      verify: async ({ hash, password }) => {
        return await bcrypt.compare(password, hash);
      },
    },
    sendResetPassword: async ({ user, token }) => {
      const url = `${getServerUrl()}/reset-password?token=${token}`;
      await sendEmail({
        to: user.email,
        subject: "Réinitialiser votre mot de passe | OpenDev",
        html: `<p>Votre lien de réinitialisation de votre mot de passe: ${url}</p>`,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false
      }
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 2, // 2 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds (5 minutes)
      strategy: "compact", // note about it on https://better-auth.com/docs/concepts/session-management#cookie-cache
    },
  },
});
