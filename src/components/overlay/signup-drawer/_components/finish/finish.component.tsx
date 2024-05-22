"use client";

import { Button, CentralizedContent, Container, EmailVerificationContent, ThankYou } from "@/components";
import { useRouter } from "next/navigation";

export function Finish() {
    const router = useRouter();

    return (
        <Container>
            <CentralizedContent>
                <ThankYou
                    info="Your information was verified!"
                    onFinish={() => router.push("/")}
                />
            </CentralizedContent>
        </Container>
    )
}

export function FinishPayment() {
    const router = useRouter();

    return (
        <Container>
            <CentralizedContent>
                <div className="flex flex-col justify-between h-full py-[124px]">
                    <ThankYou
                        info="Your payment was successful."
                    />

                    <EmailVerificationContent
                        onReSend={() => { }}
                    />

                    <div className="min-w-[304px] self-center">
                        <Button full onClick={() => router.push("/")}>Home</Button>
                    </div>
                </div>
            </CentralizedContent>
        </Container>
    )
}
