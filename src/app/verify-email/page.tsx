import { verifyEmailOrSMS } from "@/api/auth"

export default async function Page({
    params
}: {
    params: {
        server_code: string
        client_code: string
    }
}) {
    await verifyEmailOrSMS({ server_code: params.server_code });

    return (
        <p>Redirecting...</p>
    )
}