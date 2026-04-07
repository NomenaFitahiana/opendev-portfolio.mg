"use client";

import { useForm } from "@/components/ui/tanstack-form";
import { useAction } from "next-safe-action/hooks";
import {
  createTestimonialAction,
  updateTestimonialAction,
} from "@/actions/testimonial.action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader } from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { testimonialSchema } from "@/schemas";
import { FileUpload } from "@/components/ui/file-upload";
import { z } from "zod";

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

type Project = {
  id: string;
  title: string;
  slug: string;
};

type TestimonialFormProps = {
  projects: Project[];
  defaultValues?: TestimonialFormValues & {
    id: string;
  };
  mode?: "create" | "edit";
};

export function TestimonialForm({
  projects,
  defaultValues,
  mode = "create",
}: TestimonialFormProps) {
  const router = useRouter();

  const { execute: create, isPending: isCreating } = useAction(
    createTestimonialAction,
    {
      onSuccess: () => {
        toast.success("Témoignage créé.");
        router.push("/testimonials");
      },
      onError: ({ error }) =>
        toast.error(error.serverError ?? "Erreur lors de la création"),
    }
  );

  const { execute: update, isPending: isUpdating } = useAction(
    updateTestimonialAction,
    {
      onSuccess: () => {
        toast.success("Témoignage mis à jour.");
        router.push("/testimonials");
      },
      onError: ({ error }) =>
        toast.error(error.serverError ?? "Erreur lors de la mise à jour"),
    }
  );

  const isPending = isCreating || isUpdating;

  const form = useForm({
    schema: testimonialSchema,
    defaultValues: {
      clientName: "",
      clientRole: "",
      company: "",
      content: "",
      photo: "",
      projectId: "",
      active: true,
      ...defaultValues,
    },
    onSubmit: (values) => {
      if (mode === "edit" && defaultValues) {
        update({
          id: defaultValues.id,
          ...values,
        });
      } else {
        create(values);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      className="grid grid-cols-1 gap-6 lg:grid-cols-3"
    >
      <div className="flex flex-col gap-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Informations client</CardTitle>
            <CardDescription>
              Les coordonnées du client qui a donné le témoignage.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <form.AppField name="clientName">
                {(field) => (
                  <field.Field>
                    <field.Label>Nom complet *</field.Label>
                    <field.Content>
                      <field.Input placeholder="Jean Rakoto" />
                      <field.Message />
                    </field.Content>
                  </field.Field>
                )}
              </form.AppField>

              <form.AppField name="clientRole">
                {(field) => (
                  <field.Field>
                    <field.Label>Poste *</field.Label>
                    <field.Content>
                      <field.Input placeholder="Directeur Marketing" />
                      <field.Message />
                    </field.Content>
                  </field.Field>
                )}
              </form.AppField>
            </div>

            <form.AppField name="company">
              {(field) => (
                <field.Field>
                  <field.Label>Entreprise *</field.Label>
                  <field.Content>
                    <field.Input placeholder="RetailMada SARL" />
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Témoignage</CardTitle>
            <CardDescription>
              Le contenu du témoignage du client.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <form.AppField name="content">
              {(field) => (
                <field.Field>
                  <field.Label>
                    Contenu *
                    <span className="text-muted-foreground ml-2 font-normal text-xs">
                      ({field.state.value.length}/500)
                    </span>
                  </field.Label>
                  <field.Content>
                    <field.Textarea
                      placeholder="Partagez l'expérience de ce client avec OpenDev..."
                      rows={4}
                      maxLength={500}
                    />
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
            <CardTitle className="text-base">Photo</CardTitle>
            <CardDescription>
              Photo du client (optionnel)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload
              value={form.getFieldValue("photo")}
              onChange={(url) => form.setFieldValue("photo", url)}
              bucket="testimonials"
              path="avatars"
              maxSizeMB={2}
              disabled={isPending}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Projet lié</CardTitle>
            <CardDescription>
              Lier ce témoignage à un projet (optionnel)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <form.AppField name="projectId">
              {(field) => (
                <field.Field>
                  <field.Label>Projet</field.Label>
                  <field.Content>
                    <select
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    >
                      <option value="">Aucun projet</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.title}
                        </option>
                      ))}
                    </select>
                    <field.Message />
                  </field.Content>
                </field.Field>
              )}
            </form.AppField>

            <Separator />

            <form.AppField name="active">
              {(field) => (
                <field.Field>
                  <span className="flex items-center justify-between">
                    <field.Label className="text-sm cursor-pointer font-normal">
                      Afficher sur le site
                    </field.Label>
                    <field.Switch
                      checked={field.state.value}
                      onCheckedChange={(v) => field.handleChange(Boolean(v))}
                    />
                  </span>
                </field.Field>
              )}
            </form.AppField>

            <Separator />

            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <Loader /> Enregistrement...
                  </>
                ) : mode === "edit" ? (
                  "Mettre à jour"
                ) : (
                  "Créer le témoignage"
                )}
              </Button>
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={() => router.back()}
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
