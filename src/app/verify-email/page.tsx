import { redirect } from "next/navigation";
import { verifyEmailOrSMS } from "@/api/auth";

export default async function Page({
    searchParams
}: {
    searchParams: {
        server_code: string
        client_code: string
    }
}) {
    const res = await verifyEmailOrSMS({ client_code: searchParams.client_code, server_code: searchParams.server_code });

    if(res) {
        redirect('/')
    }

    return (
        <p>Redirecting...</p>
    )
}