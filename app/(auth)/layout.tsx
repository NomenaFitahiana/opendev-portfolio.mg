import { Header, Footer } from "@/components/landing";
import { Logo } from "@/components/logo";
import { ReactNode } from "react";

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[90vh] md:gap-4 gap-2">
        <Logo withLabel />
        {children}
      </div>
      <Footer />
    </div>
  )
}