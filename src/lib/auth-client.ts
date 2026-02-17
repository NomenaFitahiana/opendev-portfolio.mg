import { createAuthClient } from "better-auth/react";
import { getServerUrl } from "./getServerUrl";

export const authClient = createAuthClient({
  baseURL: getServerUrl(),
});
