"use client";

import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

export default function AppUI({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;


  return (
    <>
      <NextTopLoader
        showSpinner={false}
        color={theme === "light" ? "#292524" : "#f5f5f4"}
      />

      <Toaster position="bottom-right" richColors />

      {children}
    </>
  );
}