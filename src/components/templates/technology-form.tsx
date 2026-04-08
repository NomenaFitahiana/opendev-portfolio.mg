"use client";

import { useForm } from "@/components/ui/tanstack-form";
import { useAction } from "next-safe-action/hooks";
import { createTechnologyAction, updateTechnologyAction } from "@/actions/technology.action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { technologySchema } from "@/schemas";
import { Icons } from "../icons";
import { useRouter } from "next/navigation";
import z from "zod";

type TechnologyFormValues = z.infer<typeof technologySchema>;

type TechnologyFormProps = {
  defaultValues?: TechnologyFormValues & { id: string };
  mode?: "create" | "edit";
};

const TECH_CATEGORIES = [
  { value: "FRONTEND", label: "Frontend" },
  { value: "BACKEND", label: "Backend" },
  { value: "MOBILE", label: "Mobile" },
  { value: "DATABASE", label: "Database" },
  { value: "DEVOPS", label: "DevOps" },
  { value: "DESIGN", label: "Design" },
  { value: "OTHER", label: "Autre" },
] as const;

const ICON_OPTIONS = Object.keys(Icons).map((key) => ({
  value: key,
  label: key,
}));

export const TechnologyForm = ({
  defaultValues,
  mode = "create",
}: TechnologyFormProps) => {
  const router = useRouter();

  const { execute: create, isPending: isCreating } = useAction(
    createTechnologyAction,
    {
      onSuccess: () => {
        toast.success("Technologie créée.");
        router.push("/technologies");
      },
      onError: ({ error }) =>
        toast.error(error.serverError ?? "Erreur lors de la création"),
    }
  );

  const { execute: update, isPending: isUpdating } = useAction(
    updateTechnologyAction,
    {
      onSuccess: () => {
        toast.success("Technologie mise à jour.");
        router.push("/technologies");
      },
      onError: ({ error }) =>
        toast.error(error.serverError ?? "Erreur lors de la mise à jour"),
    }
  );

  const isPending = isCreating || isUpdating;

  const form = useForm({
    schema: technologySchema,
    defaultValues: {
      name: "",
      category: "FRONTEND" as const,
      logo: "",
      ...defaultValues,
    },
    onSubmit: (values) => {
      const payload = {
        ...values,
        logo: values.logo || undefined,
      };

      if (mode === "edit" && defaultValues) {
        update({
          id: defaultValues.id,
          ...payload,
        });
      } else {
        create(payload);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="grid grid-cols-1 gap-6 lg:grid-cols-3"
    >
      <div className="flex flex-col gap-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <form.AppField name="name">
              {(field) => (
                <field.Field>
                  <field.Label>Nom de la technologie *</field.Label>
                  <field.Content>
                    <field.Input placeholder="ex: React, Next.js, Node.js" />
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>

            <form.AppField name="category">
              {(field) => (
                <field.Field>
                  <field.Label>Catégorie *</field.Label>
                  <field.Content>
                    <Select
                      value={field.state.value}
                      onValueChange={(v) => field.setValue(v as typeof field.state.value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {TECH_CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>

            <form.AppField name="logo">
              {(field) => (
                <field.Field>
                  <field.Label>Icône</field.Label>
                  <field.Content>
                    <Select
                      value={field.state.value || ""}
                      onValueChange={(v) => field.setValue(v || "")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une icône" />
                      </SelectTrigger>
                      <SelectContent>
                        {ICON_OPTIONS.map((icon) => {
                          const IconComponent = Icons[icon.value];
                          return (
                            <SelectItem key={icon.value} value={icon.value}>
                              <div className="flex items-center gap-2">
                                <IconComponent className="size-4" />
                                <span>{icon.label}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Prévisualisation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50">
              {form.state.values.logo && Icons[form.state.values.logo] ? (
                (() => {
                  const IconComponent = Icons[form.state.values.logo as keyof typeof Icons];
                  return <IconComponent className="size-8" />;
                })()
              ) : (
                <div className="flex size-8 items-center justify-center rounded-md border bg-muted text-xs font-medium text-muted-foreground">
                  {form.state.values.name ? form.state.values.name.slice(0, 2).toUpperCase() : "??"}
                </div>
              )}
              <span className="text-sm font-medium">
                {form.state.values.name || "Nom de la techno"}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending} className="flex-1">
            {isPending ? "Enregistrement..." : mode === "edit" ? "Mettre à jour" : "Créer"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/technologies")}
          >
            Annuler
          </Button>
        </div>
      </div>
    </form>
  );
};