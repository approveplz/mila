"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { verifyEmailOrSMS } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { VerifyEmailOrSMSPayload } from "@/api/auth/auth.types";
import * as React from "react";
import { serialize } from "object-to-formdata";
import { useAuthContext } from "@/components/provider/auth/auth.component";

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { resultAuthTokenFormAction, authTokenFormAction, session } = useAuthContext();

    const client_code = searchParams.get("client_code");
    const server_code = searchParams.get("server_code");

    const { mutate } = useMutation({
        mutationFn: (payload: VerifyEmailOrSMSPayload) => verifyEmailOrSMS(payload),
        async onSuccess(data, variables, context) {
            if (!!!session) {
                await authTokenFormAction(serialize({
                    access: data.access,
                    refresh: data.refresh,
                }));
            }

            toast.success("Email verified successfully");
        },
        onError(error, variables, context) {
            toast.error("Error verifying email!");
            router.push("/")
        },
    })

    React.useEffect(() => {
        if (client_code && server_code) {
            mutate({ server_code: server_code, client_code: client_code })
        }
    }, [mutate, server_code, client_code])

    React.useEffect(() => {
        if (resultAuthTokenFormAction.status === "success") {
            router.push("/")
        }
    }, [resultAuthTokenFormAction, router])


    return (
        <p>Redirecting...</p>
    )
}