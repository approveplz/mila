"use client";

import * as React from "react";
import { authSignIn } from "@/actions";
import { useRouter } from "next/navigation";

export function AuthForm({ children }: React.PropsWithChildren) {
    const router = useRouter();
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);

        await authSignIn(data);
        router.back();
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {children}
        </form>
    )
}
