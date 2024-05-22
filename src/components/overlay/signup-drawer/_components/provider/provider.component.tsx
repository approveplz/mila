"use client";

import * as React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function Provider({
    children
}: {
    children: React.ReactNode
}) {
    const options = React.useMemo(() => ({
        fonts: [{
            family: "Inter",
            cssSrc: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap&subset=latin",
            weight: "400"
        }]
    }), []);

    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    )
}
