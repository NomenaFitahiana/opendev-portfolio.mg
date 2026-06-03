import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/auth-server", () => ({
  getUser: vi.fn(),
}));

import { ActionError, action, authAction, adminAction } from "@/lib/safe-action";
import { getUser } from "@/lib/auth-server";

const mockedGetUser = vi.mocked(getUser);

const mockAdminUser = {
  id: "user-1",
  name: "Admin",
  email: "admin@opendev.mg",
  emailVerified: true,
  image: null,
  role: "admin" as const,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockRegularUser = {
  ...mockAdminUser,
  id: "user-2",
  role: "user" as const,
};

describe("ActionError", () => {
  it("crée une erreur avec le message fourni", () => {
    const error = new ActionError("Test error");
    expect(error.message).toBe("Test error");
    expect(error.name).toBe("SafeActionError");
  });
});

describe("authAction (middleware)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("autorise l'accès quand l'utilisateur est connecté", async () => {
    mockedGetUser.mockResolvedValue(mockAdminUser);

    const testAction = authAction.action(async ({ ctx }) => {
      return { userId: ctx.user.id, email: ctx.user.email };
    });

    const result = await testAction();

    expect(result).toEqual({
      data: { userId: "user-1", email: "admin@opendev.mg" },
    });
    expect(mockedGetUser).toHaveBeenCalledOnce();
  });

  it("bloque l'accès quand l'utilisateur n'est pas connecté", async () => {
    mockedGetUser.mockRejectedValue(new Error("UNAUTHORIZED"));

    const testAction = authAction.action(async ({ ctx }) => {
      return { userId: ctx.user.id };
    });

    const result = await testAction();

    expect(result).toHaveProperty("serverError");
    expect(result.serverError).toBe("Unexpected error occured");
  });
});

describe("adminAction (middleware)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("autorise l'accès à un utilisateur admin", async () => {
    mockedGetUser.mockResolvedValue(mockAdminUser);

    const testAction = adminAction.action(async ({ ctx }) => {
      return { role: ctx.user.role, userId: ctx.user.id };
    });

    const result = await testAction();

    expect(result).toEqual({
      data: { role: "admin", userId: "user-1" },
    });
  });

  it("refuse l'accès à un utilisateur non-admin", async () => {
    mockedGetUser.mockResolvedValue(mockRegularUser);

    const testAction = adminAction.action(async ({ ctx }) => {
      return { success: true };
    });

    const result = await testAction();

    expect(result).toHaveProperty("serverError");
    expect(result.serverError).toBe("Denied access: admin only");
  });

  it("bloque l'accès si l'utilisateur n'est pas connecté (avant même le check admin)", async () => {
    mockedGetUser.mockRejectedValue(new Error("UNAUTHORIZED"));

    const testAction = adminAction.action(async ({ ctx }) => {
      return { success: true };
    });

    const result = await testAction();

    expect(result).toHaveProperty("serverError");
  });
});

describe("base action (sans middleware)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("permet l'accès sans authentification", async () => {
    const publicAction = action.action(async () => {
      return { public: true };
    });

    const result = await publicAction();

    expect(result).toEqual({ data: { public: true } });
  });
});
