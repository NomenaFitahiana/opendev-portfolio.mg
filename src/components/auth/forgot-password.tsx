"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "../ui/tanstack-form";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { Loader } from "../ui/loader";

export function ForgotPassword() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const form = useForm({
    schema: z.object({
      email: z.email({ error: "Invalid email" }),
    }),
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ email }) => {
      setPending(true);
      await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
        fetchOptions: {
          onSuccess: () => {
            toast.info("Email envoyé !", { closeButton: true });
            setPending(false);
            router.push(`/verify?email=${email}`);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message ?? "Email non envoyé. Veuillez ré-essayer", {
              description: "Internal server error occured",
              closeButton: true
            });
            setPending(false);
          },
          onRequest: () => {
            setPending(true);
          }
        }
      });
    },
  });

  return (
    <section className="px-4">
      <div className="m-auto w-full max-w-sm">
        <div className="text-center">
        </div>
        <Card className="flex flex-col gap-4 px-0.5 py-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Mot de passe oublie ?</CardTitle>
            <CardDescription>
              Entrer votre email et nous allons envoyer un lien pour
              reinitialiser votre mot de passe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              <form.AppField name="email">
                {(field) => (
                  <field.Field>
                    <field.Label>Email</field.Label>
                    <field.Content>
                      <field.Input type="email" placeholder="m@example.com" disabled={pending} />
                      <field.Message />
                    </field.Content>
                  </field.Field>
                )}
              </form.AppField>
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? <><Loader /> Envoi en cours...</> : <><Send size={18} /> Envoyer le lien</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Vous vous souvenez de votre mot de passe ?{" "}
          <Link href="#" className="text-primary font-medium hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </section>
  );
}
