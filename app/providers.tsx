// In Next.js, this file would be called: app/providers.jsx
"use client";

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ThemeRegistry from "./theme/ThemeRegistry";

import { useRef } from "react";
import { Provider as StoreProvider } from "react-redux";
import { AppStore, makeStore } from "./lib/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <StoreProvider store={storeRef.current}>
      <QueryClientProvider client={queryClient}>
        <ThemeRegistry>{children}</ThemeRegistry>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StoreProvider>
  );
}
