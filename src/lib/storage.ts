export type ImageStorage = "local" | "supabase";

export function getImageStorage(): ImageStorage {
  if (process.env.NODE_ENV === "production") {
    return "supabase";
  }
  return "local";
}

export function isLocalStorage(): boolean {
  return getImageStorage() === "local";
}

export function isSupabaseStorage(): boolean {
  return getImageStorage() === "supabase";
}