import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export const QueryProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
