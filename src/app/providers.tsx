"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: React.PropsWithChildren) {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
    )
}