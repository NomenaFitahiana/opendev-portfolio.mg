"use client";

import { useForm } from "@/components/ui/tanstack-form";
import { useAction } from "next-safe-action/hooks";
import { createProjectAction } from "@/actions/project.action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { useState } from "react";
import { projectSchema } from "@/schemas";
import { Loader } from "../ui/loader";
import { useRouter } from "next/navigation";

type Technology = { id: string; name: string };

export const ProjectForm = ({
  technologies,
}: {
  technologies: Technology[];
}) => {
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>([]);
  const router = useRouter();

  const { execute, isPending } = useAction(createProjectAction, {
    onSuccess: () => {
      toast.success("Projet créé avec succès.");
      router.push("/projects");
    },
    onError: ({ error }) =>
      toast.error(error.serverError ?? "Une erreur s'est produite."),
  });

  const form = useForm({
    schema: projectSchema,
    defaultValues: {
      title: "",
      clientName: "",
      hideClientName: false,
      shortDescription: "",
      longDescription: "",
      problem: "",
      solution: "",
      duration: 1,
      teamSize: 1,
      budget: undefined as number | undefined,
      metrics: "",
      status: "COMPLETED" as "COMPLETED" | "IN_PROGRESS" | "FEATURED",
      featured: false,
      order: 0,
      technologyIds: [],
    },
    onSubmit: (values) => {
      execute({ ...values, technologyIds: selectedTechIds });
    },
  });

  const toggleTech = (id: string) => {
    setSelectedTechIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

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
            <form.AppField name="title">
              {(field) => (
                <field.Field>
                  <field.Label>Titre du projet *</field.Label>
                  <field.Content>
                    <field.Input placeholder="ex: Plateforme e-commerce RetailMada" />
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>

            <div className="grid grid-cols-2 gap-4">
              <form.AppField name="clientName">
                {(field) => (
                  <field.Field>
                    <field.Label>Nom du client *</field.Label>
                    <field.Content>
                      <field.Input placeholder="RetailMada" />
                      <field.Message />
                    </field.Content>
                  </field.Field>
                )}
              </form.AppField>

              <form.AppField name="hideClientName">
                {(field) => (
                  <field.Field>
                    <field.Label>Visibilité client</field.Label>
                    <span className="flex gap-2">
                      <field.Switch
                        className="w-4 h-4"
                        checked={field.state.value}
                        onCheckedChange={(v) => field.handleChange(!!v)}
                      />
                      <span className="text-sm cursor-pointer">
                        Masquer le nom
                      </span>
                    </span>
                  </field.Field>
                )}
              </form.AppField>
            </div>

            <form.AppField name="shortDescription">
              {(field) => (
                <field.Field>
                  <field.Label>
                    Description courte *
                    <span className="text-muted-foreground ml-2 font-normal text-xs">
                      ({field.state.value.length}/200)
                    </span>
                  </field.Label>
                  <field.Content>
                    <field.Textarea
                      placeholder="Résumé du projet en quelques mots..."
                      maxLength={200}
                      rows={2}
                    />
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>

            <form.AppField name="longDescription">
              {(field) => (
                <field.Field>
                  <field.Label>Description détaillée *</field.Label>
                  <field.Content>
                    <field.Textarea
                      placeholder="Description complète du projet..."
                      rows={6}
                    />
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Problématique & Solution</CardTitle>
            <CardDescription>
              Décrivez le contexte et la valeur ajoutée d'OpenDev sur ce projet.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.AppField name="problem">
              {(field) => (
                <field.Field>
                  <field.Label>Problématique</field.Label>
                  <field.Content>
                    <field.Textarea
                      placeholder="Quel était le problème du client ?"
                      rows={4}
                    />
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>

            <form.AppField name="solution">
              {(field) => (
                <field.Field>
                  <field.Label>Solution apportée</field.Label>
                  <field.Content>
                    <field.Textarea
                      placeholder="Comment OpenDev a résolu ce problème ?"
                      rows={4}
                    />
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Technologies utilisées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => {
                const selected = selectedTechIds.includes(tech.id);
                return (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => toggleTech(tech.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors ${selected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-primary/50"
                      }`}
                  >
                    {tech.name}
                    {selected && <X className="size-3" />}
                  </button>
                );
              })}
            </div>
            {selectedTechIds.length > 0 && (
              <p className="text-muted-foreground text-xs mt-3">
                {selectedTechIds.length} technologie
                {selectedTechIds.length > 1 ? "s" : ""} sélectionnée
                {selectedTechIds.length > 1 ? "s" : ""}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Résultats & KPIs</CardTitle>
            <CardDescription>
              Chiffres clés qui illustrent l'impact du projet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form.AppField name="metrics">
              {(field) => (
                <field.Field>
                  <field.Content>
                    <field.Input placeholder="ex: +40% conversions, -30% temps de chargement" />
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-6">

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Publication</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <form.AppField name="status">
              {(field) => (
                <field.Field>
                  <field.Label>Statut</field.Label>
                  <field.Content>
                    <Select
                      value={field.state.value}
                      onValueChange={(v) =>
                        field.handleChange(
                          v as "COMPLETED" | "IN_PROGRESS" | "FEATURED"
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="COMPLETED">Terminé</SelectItem>
                        <SelectItem value="IN_PROGRESS">En cours</SelectItem>
                        <SelectItem value="FEATURED">Mis en avant</SelectItem>
                      </SelectContent>
                    </Select>
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>

            <form.AppField name="featured">
              {(field) => (
                <field.Field>
                  <span className="flex items-center gap-2">
                    <field.Label className="text-sm cursor-pointer font-normal">
                      Mettre en avant sur la vitrine
                    </field.Label>
                    <field.Switch
                      checked={field.state.value}
                      onCheckedChange={(v) => field.handleChange(!!v)}
                    />
                  </span>
                </field.Field>
              )}
            </form.AppField>

            <Separator />

            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <><Loader /> Création en cours...</> : "Créer le projet"}
              </Button>
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={() => history.back()}
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Détails du projet</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <form.AppField name="duration">
              {(field) => (
                <field.Field>
                  <field.Label>Durée (jours) *</field.Label>
                  <field.Content>
                    <field.Input type="number" min={1} />
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>

            <form.AppField name="teamSize">
              {(field) => (
                <field.Field>
                  <field.Label>Taille de l'équipe *</field.Label>
                  <field.Content>
                    <field.Input type="number" min={1} />
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>

            <form.AppField name="budget">
              {(field) => (
                <field.Field>
                  <field.Label>
                    Budget (€)
                    <span className="text-muted-foreground ml-1 font-normal text-xs">
                      optionnel
                    </span>
                  </field.Label>
                  <field.Content>
                    <field.Input type="number" min={0} placeholder="ex: 5000" />
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>

            <form.AppField name="order">
              {(field) => (
                <field.Field>
                  <field.Label>Ordre d'affichage</field.Label>
                  <field.Content>
                    <field.Input type="number" min={0} />
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};
