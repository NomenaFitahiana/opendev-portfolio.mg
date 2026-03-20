"use client";

import { ReactNode } from "react"
import { QueryProvider } from "./query-client"
import { Toaster } from "sonner"
import { SidebarProvider } from "@/components/ui/sidebar";

// This file contains all providers that the application needs
export const Providers = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <QueryProvider>
      <SidebarProvider>
        <Toaster position='bottom-right' richColors />
        {children}
      </SidebarProvider>
    </QueryProvider>
  );
}
