import { createSafeActionClient } from "next-safe-action";
import { getUser } from "./auth-server";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SafeActionError";
  }
}

export const action = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof ActionError) {
      return error.message;
    }
    console.error("Unexpected error:", error);
    return "Unexpected error occured";
  },
});

export const authAction = action.use(async ({ next }) => {
  const user = await getUser();
  if (!user) {
    throw new ActionError("You need to be connected !");
  }
  return next({ ctx: { user } });
});

export const adminAction = authAction.use(async ({ next, ctx }) => {
  if (ctx.user.role !== "admin") {
    throw new ActionError("Denied access: admin only");
  }
  return next({ ctx });
});
