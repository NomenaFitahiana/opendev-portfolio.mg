"use client";

import { useForm } from "../ui/tanstack-form";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye, EyeOff, RotateCw } from "lucide-react";
import { Button } from "../ui/button";
import { Loader } from "../ui/loader";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resetPasswordSchema } from "@/schemas";

type Props = {
  token: string // required to verify if token still valid
}

export const ResetPassword = ({ token }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const router = useRouter();
  const [pending, setPending] = useState<boolean>(false);
  const form = useForm({
    schema: resetPasswordSchema,
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ newPassword }) => {
      await new Promise(r => setTimeout(r, 300));
      authClient.resetPassword({
        newPassword,
        token,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Mot de passe reinitialise !");
            setPending(false);
            setTimeout(() => {
              router.push("/login");
            }, 1000);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message ?? "Erreur de serveur interne", { description: "Veuillez re-essayer plus tard" });
            setPending(false);
          },
          onRequest: () => {
            setPending(true);
          }
        }
      })
    },
  });

  return (
    <Card className="w-full flex flex-col gap-2">
      <CardHeader>
        <CardTitle className="text-xl">Reinitialiser votre mot de passe</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-3"
        >
          <form.AppField name="newPassword">
            {(field) => (
              <field.Field>
                <field.Label>Nouveau mot de passe</field.Label>
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

          <form.AppField name="confirmPassword">
            {(field) => (
              <field.Field>
                <field.Label>Confirmer votre nouveau mot de passe</field.Label>
                <field.Content>
                  <div className="relative">
                    <field.Input
                      type={showConfirmPassword ? "text" : "password"}
                      disabled={pending}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      disabled={pending}
                    >
                      {showConfirmPassword ? (
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

          <Button type="submit" disabled={pending}>
            {pending ? (
              <>
                <Loader /> Réinitialisation en cours...
              </>
            ) : (
              <><RotateCw size={18} /> Réinitialiser</>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
