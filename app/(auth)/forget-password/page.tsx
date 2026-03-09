import { createMetadata } from "@/lib/metadata";
import { ForgotPassword } from "@/components/auth/forgot-password"

export const metadata = createMetadata({
  title: "Mot de passe oublie",
});

export default function ForgetPasswordPage() {
  return <ForgotPassword />
}