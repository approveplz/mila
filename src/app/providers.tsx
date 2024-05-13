"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: React.PropsWithChildren) {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}