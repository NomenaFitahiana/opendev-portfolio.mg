"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppUI from "@/lib/app-ui";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { PostHogProvider } from "./analytics/provider";
import { QueryProvider } from "./query-client";

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
          <PostHogProvider>
            <AppUI>{children}</AppUI>
          </PostHogProvider>
        </ThemeProvider>
      </SidebarProvider>
    </QueryProvider>
  );
}
