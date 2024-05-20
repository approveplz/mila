"use client";

import { CentralizedContent, Container, ThankYou } from "@/components";
import { useRouter } from "next/navigation";

export function Finish() {
    const router = useRouter();

    return (
        <Container>
            <CentralizedContent>
                <ThankYou onFinish={() => router.push("/")} />
            </CentralizedContent>
        </Container>
    )
}
