import { redirect } from "next/navigation";
import { verifyEmailOrSMS } from "@/api/auth";
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

    console.log("session: ", session);
    console.log("res: ", res);

    if (res) {
        if (session) {
            redirect('/');
        } else {
            try {
                const formData = new FormData();
                formData.append("access", res.access);
                formData.append("refresh", res.refresh);

                const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL!}/api/auth/authSignInToken`, {
                    method: "POST",
                    body: formData
                });

                console.log("response: ", response);
                const data = await response.json();

                console.log("data: ", data);
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