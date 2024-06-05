"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from "@/components/provider/auth/auth.component";
import { Session } from "next-auth";

type Props = React.PropsWithChildren & {
    session: Session | null
}

const queryClient = new QueryClient();

export function Providers({ children, session }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </SessionProvider>
        </QueryClientProvider>
    )
}