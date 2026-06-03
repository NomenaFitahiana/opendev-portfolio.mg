import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers({ cookie: "mock-session" })),
}));

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

vi.mock("next/navigation", () => ({
  unauthorized: vi.fn(() => {
    throw new Error("UNAUTHORIZED");
  }),
}));

import { getSession, getUser } from "../auth-server";
import { auth } from "@/lib/auth";

const mockAuth = auth as unknown as {
  api: {
    getSession: ReturnType<typeof vi.fn>;
  };
};

const mockUser = {
  id: "user-1",
  name: "Admin",
  email: "admin@opendev.mg",
  emailVerified: true,
  image: null,
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockSession = {
  user: mockUser,
  session: {
    id: "session-1",
    token: "token-123",
    expiresAt: new Date(Date.now() + 86400000),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user-1",
    ipAddress: null,
    userAgent: null,
  },
};

describe("getSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne la session quand l'utilisateur est connecté (login success)", async () => {
    mockAuth.api.getSession.mockResolvedValue(mockSession);

    const result = await getSession();

    expect(result).toEqual(mockSession);
    expect(mockAuth.api.getSession).toHaveBeenCalledOnce();
  });

  it("retourne null quand l'utilisateur n'est pas connecté (login fail)", async () => {
    mockAuth.api.getSession.mockResolvedValue(null);

    const result = await getSession();

    expect(result).toBeNull();
    expect(mockAuth.api.getSession).toHaveBeenCalledOnce();
  });

  it("passe les en-têtes de la requête à better-auth", async () => {
    mockAuth.api.getSession.mockResolvedValue(mockSession);

    await getSession();

    expect(mockAuth.api.getSession).toHaveBeenCalledWith({
      headers: expect.any(Headers),
    });
  });
});

describe("getUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne l'utilisateur quand une session active existe (session persistence)", async () => {
    mockAuth.api.getSession.mockResolvedValue(mockSession);

    const result = await getUser();

    expect(result).toEqual(mockUser);
  });

  it("lève une exception unauthorized quand l'utilisateur n'est pas connecté", async () => {
    mockAuth.api.getSession.mockResolvedValue(null);

    await expect(getUser()).rejects.toThrow("UNAUTHORIZED");
  });

  it("lève une exception unauthorized quand la session est expirée", async () => {
    mockAuth.api.getSession.mockResolvedValue(null);

    await expect(getUser()).rejects.toThrow("UNAUTHORIZED");
  });
});
