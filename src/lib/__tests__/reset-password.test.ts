import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  default: {
    verification: {
      findFirst: vi.fn(),
    },
  },
}));

import prisma from "@/lib/prisma";

const mockPrisma = prisma as unknown as {
  verification: {
    findFirst: ReturnType<typeof vi.fn>;
  };
};

const mockValidVerification = {
  identifier: "reset-password:valid-token-123",
  expiresAt: new Date(Date.now() + 3600000),
  value: "user-1",
};

const mockExpiredVerification = {
  identifier: "reset-password:expired-token-456",
  expiresAt: new Date(Date.now() - 3600000),
  value: "user-1",
};

async function verifyResetToken(token: string | null): Promise<{
  valid: boolean;
  error?: "missing" | "invalid";
}> {
  if (!token) {
    return { valid: false, error: "missing" };
  }

  const verification = await prisma.verification.findFirst({
    where: {
      identifier: `reset-password:${token}`,
      expiresAt: { gt: new Date() },
    },
    select: {
      identifier: true,
      expiresAt: true,
      value: true,
    },
  });

  if (!verification) {
    return { valid: false, error: "invalid" };
  }

  return { valid: true };
}

describe("Reset Password Token Validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("valide un token correct et non expiré (reset password flow)", async () => {
    mockPrisma.verification.findFirst.mockResolvedValue(mockValidVerification);

    const result = await verifyResetToken("valid-token-123");

    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
    expect(mockPrisma.verification.findFirst).toHaveBeenCalledWith({
      where: {
        identifier: "reset-password:valid-token-123",
        expiresAt: { gt: expect.any(Date) },
      },
      select: {
        identifier: true,
        expiresAt: true,
        value: true,
      },
    });
  });

  it("rejette un token manquant", async () => {
    const result = await verifyResetToken(null);

    expect(result.valid).toBe(false);
    expect(result.error).toBe("missing");
    expect(mockPrisma.verification.findFirst).not.toHaveBeenCalled();
  });

  it("rejette un token expiré", async () => {
    mockPrisma.verification.findFirst.mockResolvedValue(null);

    const result = await verifyResetToken("expired-token-456");

    expect(result.valid).toBe(false);
    expect(result.error).toBe("invalid");
  });

  it("rejette un token invalide (inexistant en base)", async () => {
    mockPrisma.verification.findFirst.mockResolvedValue(null);

    const result = await verifyResetToken("fake-token");

    expect(result.valid).toBe(false);
    expect(result.error).toBe("invalid");
  });

  it("vérifie que le token n'est pas expiré (gt: new Date())", async () => {
    mockPrisma.verification.findFirst.mockResolvedValue(null);

    await verifyResetToken("some-token");

    expect(mockPrisma.verification.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          expiresAt: { gt: expect.any(Date) },
        }),
      })
    );
  });
});
