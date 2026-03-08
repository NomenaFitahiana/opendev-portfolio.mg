import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Connectez-vous a votre compte"
});

export default function LoginPage() {
  return (
    <Card className="md:max-w-md w-full">
      <CardHeader>
        <CardTitle className="text-xl">👋 Bon retour</CardTitle>
        <CardDescription>Entrer vos identifiants pour pouvoir vous connecter</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}