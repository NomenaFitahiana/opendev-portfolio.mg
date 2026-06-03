import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcrypt";

vi.mock("@/lib/mailer", () => ({
  sendEmail: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/getServerUrl", () => ({
  getServerUrl: vi.fn(() => "http://localhost:3000"),
}));

import { sendEmail } from "@/lib/mailer";

describe("Auth: Password hashing (bcrypt)", () => {
  it("hache un mot de passe et vérifie qu'il correspond", async () => {
    const password = "MonSuperMotDePasse123!";
    const hash = await bcrypt.hash(password, 10);

    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);

    const isValid = await bcrypt.compare(password, hash);
    expect(isValid).toBe(true);
  });

  it("rejette un mauvais mot de passe lors de la vérification (login fail)", async () => {
    const password = "MonSuperMotDePasse123!";
    const wrongPassword = "MauvaisMotDePasse456!";
    const hash = await bcrypt.hash(password, 10);

    const isValid = await bcrypt.compare(wrongPassword, hash);
    expect(isValid).toBe(false);
  });

  it("génère des hashs uniques pour le même mot de passe (sel différents)", async () => {
    const password = "MonSuperMotDePasse123!";
    const hash1 = await bcrypt.hash(password, 10);
    const hash2 = await bcrypt.hash(password, 10);

    expect(hash1).not.toBe(hash2);
    const isValid1 = await bcrypt.compare(password, hash1);
    const isValid2 = await bcrypt.compare(password, hash2);
    expect(isValid1).toBe(true);
    expect(isValid2).toBe(true);
  });
});

describe("Auth: sendResetPassword callback", () => {
  const mockUser = {
    id: "user-1",
    email: "admin@opendev.mg",
    name: "Admin",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("envoie un email avec le lien de réinitialisation correct", async () => {
    const token = "reset-token-123";
    const url = `http://localhost:3000/reset-password?token=${token}`;

    await sendEmail({
      to: mockUser.email,
      subject: "Réinitialiser votre mot de passe | OpenDev",
      html: `<p>Votre lien de réinitialisation de votre mot de passe: ${url}</p>`,
    });

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: mockUser.email,
        subject: expect.stringContaining("Réinitialiser"),
        html: expect.stringContaining(token),
      })
    );
  });

  it("envoie l'email à l'adresse de l'utilisateur", async () => {
    const token = "token-456";

    await sendEmail({
      to: mockUser.email,
      subject: "Réinitialiser votre mot de passe | OpenDev",
      html: `<p>Lien: http://localhost:3000/reset-password?token=${token}</p>`,
    });

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: mockUser.email,
      })
    );
  });

  it("génère un lien valide avec le token", async () => {
    const token = "secure-reset-token-abc-123";
    const expectedUrl = `http://localhost:3000/reset-password?token=${token}`;

    await sendEmail({
      to: "user@test.com",
      subject: "Réinitialiser votre mot de passe | OpenDev",
      html: `<p>Votre lien de réinitialisation de votre mot de passe: ${expectedUrl}</p>`,
    });

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        html: expect.stringContaining(`token=${token}`),
      })
    );
  });
});
