"use client";

import { ComponentPropsWithRef, useState, useTransition } from "react";
import { useForm } from "../ui/tanstack-form";
import { EyeOff, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Loader } from "../ui/loader";
import { toast } from "sonner";
import { loginSchema } from "@/schemas";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export const LoginForm = ({ ...props }: ComponentPropsWithRef<"form">) => {
  const [pending, setPending] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm({
    schema: loginSchema,
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async ({ email, password, rememberMe }) => {
      await new Promise((r) => setTimeout(r, 300));
      authClient.signIn.email({
        email,
        password,
        rememberMe,
        callbackURL: "/dashboard",
        fetchOptions: {
          onRequest: () => {
            setPending(true);
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message ?? "Connexion echoue. Veuillez reessayer.",
              { closeButton: true },
            );
            setPending(false);
          },
          onSuccess: () => {
            toast.success("Identifiants reconnus. Redirection en cours...");
            form.reset();
            setPending(false);
          },
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4"
      {...props}
    >
      <form.AppField name="email">
        {(field) => (
          <field.Field>
            <field.Label>Email</field.Label>
            <field.Content>
              <field.Input
                type="email"
                placeholder="m@gmail.com"
                disabled={pending}
              />
              <field.Message />
            </field.Content>
          </field.Field>
        )}
      </form.AppField>

      <form.AppField name="password">
        {(field) => (
          <field.Field>
            <div className="flex items-center justify-between">
              <field.Label>Mot de passe</field.Label>
              <Link
                href="/forget-password"
                className="text-sm text-muted-foreground hover:underline"
              >
                Mot de passe oublie ?
              </Link>
            </div>
            <field.Content>
              <div className="relative">
                <field.Input
                  type={showPassword ? "text" : "password"}
                  disabled={pending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={pending}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <field.Message />
            </field.Content>
          </field.Field>
        )}
      </form.AppField>

      <form.AppField name="rememberMe">
        {(field) => (
          <field.Content className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <field.Checkbox
                id="sign-in-remember"
                checked={field.state.value}
                onCheckedChange={(checked) =>
                  field.setValue(checked as boolean)
                }
                disabled={pending}
              />
              <field.Label htmlFor="sign-in-remember" className="font-normal">
                Se souvenir de moi
              </field.Label>
            </div>
            <field.Message />
          </field.Content>
        )}
      </form.AppField>

      <Button type="submit" disabled={pending}>
        {pending ? (
          <>
            <Loader /> Connexion
          </>
        ) : (
          <>Se connecter</>
        )}
      </Button>
    </form>
  );
};
