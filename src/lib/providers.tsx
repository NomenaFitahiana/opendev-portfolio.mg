"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./query-client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import AppUI from "@/lib/app-ui";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <SidebarProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="theme"
        >
          <AppUI>{children}</AppUI>
        </ThemeProvider>
      </SidebarProvider>
    </QueryProvider>
  );
}