"use client";

import { ReactNode } from "react"
import { QueryProvider } from "./query-client"
import { Toaster } from "sonner"

// This file contains all providers that the application needs
export const Providers = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <QueryProvider>
      <Toaster position='bottom-right' richColors />
      {children}
    </QueryProvider>
  );
}
