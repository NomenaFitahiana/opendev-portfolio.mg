"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Technology = { id: string; name: string };

export const ProjectsFilters = ({
  technologies,
}: {
  technologies: Technology[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [__, startTransition] = useTransition();

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  const hasFilters =
    searchParams.has("search") ||
    searchParams.has("status") ||
    searchParams.has("technologyId");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        placeholder="Rechercher un projet ou client..."
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => updateParam("search", e.target.value || null)}
        className="max-w-xs"
      />

      <Select
        value={searchParams.get("status") ?? "all"}
        onValueChange={(v) => updateParam("status", v === "all" ? null : v)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="COMPLETED">Terminé</SelectItem>
          <SelectItem value="IN_PROGRESS">En cours</SelectItem>
          <SelectItem value="FEATURED">Mis en avant</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("technologyId") ?? "all"}
        onValueChange={(v) =>
          updateParam("technologyId", v === "all" ? null : v)
        }
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Technologie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les technos</SelectItem>
          {technologies.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(pathname)}
          className="text-muted-foreground"
        >
          <X className="size-4 mr-1" />
          Réinitialiser
        </Button>
      )}
    </div>
  );
};
