"use server";

import { headers } from "next/headers";
import { Session, User } from "../types/auth";
import { auth } from "./auth";
import { unauthorized } from "next/navigation";

// Get the active session
export const getSession = async (): Promise<Session | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

// Get the authenticated user
export const getUser = async (): Promise<User> => {
  const session = await getSession();

  if (!session?.user) {
    unauthorized(); // throw an unauthorized page if not connected
  }

  return session.user;
};
