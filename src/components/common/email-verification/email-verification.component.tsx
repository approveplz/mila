"use client";
import { useSession } from "next-auth/react";
import { HiOutlineEnvelopeOpen } from "react-icons/hi2"

export function EmailVerificationContent({
    type,
    onReSend,
    action
}: {
    type: "wider" | "narrow",
    onReSend: () => void,
    action?: React.ReactNode
}) {
    const { data: session } = useSession();

    return (
        <article className="flex flex-col gap-8 items-stretch sm:items-center justify-between sm:justify-normal max-w-[592px] h-full sm:h-auto pt-16 pb-12 sm:pt-0 sm:pb-0">
            <header className="flex flex-col gap-8 items-center">
                {type === "narrow" ? (
                    <h2 className="text-3xl font-tt-ramillas">Welcome {session?.user.user.full_name}!</h2>
                ) : (
                    <h2 className="text-4xl font-tt-ramillas">Welcome {session?.user.user.full_name}!</h2>
                )}
            </header>

            <main className="flex flex-col gap-8 items-center text-center">
                <HiOutlineEnvelopeOpen className="h-12 w-12 text-primary" />
                {type === "narrow" ? (
                    <h2 className="text-3xl text-center font-tt-ramillas">Email verification</h2>
                ) : (
                    <h2 className="text-4xl text-center font-tt-ramillas">Email verification</h2>
                )}

                <p>We have sent email to {session?.user.user.email} to confirm the validity of your email address. After receiving the email please follow the link provided to complete your registration.</p>
                <div className="flex items-center">
                    <p>Didn&apos;t get the email?</p>
                    <button className="font-medium ml-1" onClick={onReSend}>Resend verification email</button>
                </div>
            </main>

            {action && (
                <footer className="min-w-[346px]">
                    {action}
                </footer>
            )}
        </article>
    )
}