import { redirect } from "next/navigation";
import { verifyEmailOrSMS } from "@/api/auth";
import { auth } from "@/auth";
import api from "@/api";

function isRedirectError(error: Error & { digest?: string }) {
    return !!error.digest?.startsWith("NEXT_REDIRECT")
}

export default async function Page({
    searchParams
}: {
    searchParams: {
        server_code: string
        client_code: string
    }
}) {
    const session = await auth();
    const res = await verifyEmailOrSMS({ client_code: searchParams.client_code, server_code: searchParams.server_code });

    console.log("session: ", session);
    console.log("res: ", res);

    if (res) {
        if (session) {
            redirect('/');
        } else {
            try {
                const response = await api.post("/api/authSignInToken", {
                    access: res.access,
                    refresh: res.refresh,
                });

                console.log("response: ", response);
                redirect('/');
            } catch (error) {
                throw error;
            }
        }
    }

    return (
        <p>Redirecting...</p>
    )
}