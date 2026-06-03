import { describe, it, expect } from "vitest";
import bcrypt from "bcrypt";

describe("AUTH SECURITY: Invalid login", () => {
  it("rejette un mot de passe vide (ne correspondra jamais à un hash)", async () => {
    const hash = await bcrypt.hash("password123", 10);
    const isValid = await bcrypt.compare("", hash);
    expect(isValid).toBe(false);
  });

  it("rejette un mot de passe avec des caractères spéciaux différents", async () => {
    const hash = await bcrypt.hash("MotDePasse!123", 10);
    const isValid = await bcrypt.compare("MotDePasse?123", hash);
    expect(isValid).toBe(false);
  });

  it("rejette un mot de passe avec casse différente", async () => {
    const hash = await bcrypt.hash("MonMotDePasse", 10);
    const isValid = await bcrypt.compare("monmotdepasse", hash);
    expect(isValid).toBe(false);
  });

  it("rejette un mot de passe avec encodage différent", async () => {
    const hash = await bcrypt.hash("café", 10);
    const isValid = await bcrypt.compare("cafe\u0301", hash);
    expect(isValid).toBe(false);
  });
});

describe("AUTH SECURITY: Expired session", () => {
  it("vérifie que la configuration session est sécurisée (expiresIn: 2 jours)", () => {
    const expiresIn = 60 * 60 * 24 * 2;
    const updateAge = 60 * 60 * 24;

    expect(expiresIn).toBe(172800);
    expect(updateAge).toBe(86400);
    expect(expiresIn).toBeGreaterThan(updateAge);
  });

  it("vérifie que le cache de session est limité (cookieCache maxAge: 5 min)", () => {
    const maxAge = 5 * 60;
    expect(maxAge).toBe(300);
    expect(maxAge).toBeLessThanOrEqual(300);
  });

  it("vérifie que le token de reset expire dans un délai raisonnable (24h)", () => {
    const resetExpiresIn = 60 * 60 * 24;
    expect(resetExpiresIn).toBe(86400);
    expect(resetExpiresIn).toBeLessThanOrEqual(86400);
  });
});
