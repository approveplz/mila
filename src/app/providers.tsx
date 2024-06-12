"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from "@/components/provider/auth/auth.component";
import { Session } from "next-auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Props = React.PropsWithChildren & {
    session: Session | null
}

const queryClient = new QueryClient();

export function Providers({ children, session }: Props) {
    const options = React.useMemo(() => ({
        fonts: [{
            family: "Inter",
            cssSrc: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap&subset=latin",
            weight: "400"
        }]
    }), []);

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
                <Elements stripe={stripePromise} options={options}>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </Elements>
            </SessionProvider>
        </QueryClientProvider>
    )
}