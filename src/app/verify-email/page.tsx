import { redirect } from "next/navigation";
import { verifyEmailOrSMS } from "@/api/auth";
import * as actions from "@/actions";
import { serialize } from "object-to-formdata";
import { auth } from "@/auth";

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

    if (res) {
        if (session) {
            redirect('/');
        } else {
            try {
                await actions.authSignInToken(serialize({
                    access: res.access,
                    refresh: res.refresh,
                }))

                redirect('/');
            } catch (error) {
                if (isRedirectError(error as Error)) {
                    redirect('/');
                } else {
                    throw error;
                }
            }
        }
    }

    return (
        <p>Redirecting...</p>
    )
}