import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import { createMetadata } from "@/lib/metadata";
import { VerifyEmailContent } from "@/components/auth/verify-email";

export const metadata = createMetadata({
  title: "Verification de votre email",
  description: "Un lien de verification a ete envoye a votre adresse email",
  noIndex: true,
});

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader /> Chargement...
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
