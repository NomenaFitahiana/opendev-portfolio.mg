"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Mail size={28} className="text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">Verifier votre email</CardTitle>
            <CardDescription className="text-base">
              Nous avons envoye un lien de verification a
            </CardDescription>
            {email && (
              <p className="font-semibold text-foreground">{email}</p>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="pt-1 border-t">
            <p className="text-xs text-center text-muted-foreground">
              Veuillez verifier votre spam si l'email n'apparait pas dans votre boite de reception.
              Ce lien va expirer dans 24 heures
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
