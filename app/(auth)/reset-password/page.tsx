import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import { ResetPassword } from "@/components/auth/reset-password";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return <TokenErrorUI errorType="missing" />;
  }

  const verification = await prisma.verification.findFirst({
    where: {
      identifier: `reset-password:${token}`,
      expiresAt: { gt: new Date() },
    },
    select: {
      identifier: true,
      expiresAt: true,
      value: true,
    },
  });

  if (!verification) {
    return <TokenErrorUI errorType="invalid" />;
  }

  return (
    <div className="flex w-full items-center justify-center bg-background p-4 md:max-w-lg">
      <ResetPassword token={token} />
    </div>
  );
}

const ERROR_CONTENT = {
  missing: {
    title: "Lien manquant",
    description: "Le lien de réinitialisation est manquant ou invalide.",
  },
  invalid: {
    title: "Lien expiré",
    description: "Ce lien de réinitialisation de mot de passe a déjà été utilisé ou a expiré.",
  },
} as const;

function TokenErrorUI({ errorType }: { errorType: keyof typeof ERROR_CONTENT }) {
  const { title, description } = ERROR_CONTENT[errorType];

  return (
    <div className="flex items-center justify-center bg-background p-4">
      <div className="flex w-full flex-col items-center gap-4 rounded-xl border bg-card p-8 text-center shadow-sm md:max-w-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle size={22} className="text-destructive" />
        </div>
        <div className="space-y-1">
          <h1 className="text-base font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Link
          href="/forget-password"
          className="flex items-center gap-0.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          Demander un nouveau lien <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
