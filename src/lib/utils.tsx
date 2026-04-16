import { Loader } from "@/components/ui/loader";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSubmitLabel(isPending: boolean, mode: "create" | "edit") {
  if (isPending) {
    return (
      <>
        <Loader />
        {mode === "create" ? "Création en cours..." : "Mise à jour en cours..."}
      </>
    );
  }
  return mode === "create" ? "Créer" : "Mettre à jour";
}
