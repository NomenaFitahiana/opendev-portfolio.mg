"use client";

import { ReactNode } from "react"
import { QueryProvider } from "./query-client"
import { Toaster } from "sonner"
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider, useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";

// This file contains all providers that the application needs
export const Providers = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { theme } = useTheme();

  return (
    <QueryProvider>
      <SidebarProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position='bottom-right' richColors />
          <NextTopLoader
            showSpinner={false}
            color={theme === "light" ? "#292524" : "#f5f5f4"}
          />
          {children}
        </ThemeProvider>
      </SidebarProvider>
    </QueryProvider>
  );
}
