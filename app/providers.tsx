"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import AuthBootstrap from "./components/auth/AuthBootstrap";
import ClientErrorBoundary from "./components/error/ClientErrorBoundary";
import GlobalClientErrorLogger from "./components/error/GlobalClientErrorLogger";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalClientErrorLogger />
      <AuthBootstrap />
      <ClientErrorBoundary>{children}</ClientErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
