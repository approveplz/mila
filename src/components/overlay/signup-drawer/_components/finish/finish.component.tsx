"use client";

import {
    Button,
    CentralizedContent,
    Container,
    DrawerClose,
    EmailVerificationContent,
    ThankYou
} from "@/components";
import { useRouter } from "next/navigation";
import { StepperComponentProps } from "../stepper/stepper.types";
import { sendVerificationEmail } from "@/api/auth";

export function Finish() {
    const router = useRouter();

    return (
        <Container>
            <CentralizedContent>
                <ThankYou
                    type="narrow"
                    info="Your information was verified!"
                    onFinish={() => {}}
                />
            </CentralizedContent>
        </Container>
    )
}

export function FinishPayment({ session }: StepperComponentProps) {
    const handleVerifyEmail = () => {
        sendVerificationEmail().then(res => {
            console.log("res: ", res);
        }).catch(err => {
            console.log("err: ", err);
        })
    }

    return (
        <Container>
            <CentralizedContent>
                <div className="flex flex-col gap-24 justify-center h-full">
                    <ThankYou
                        type="wider"
                        info="Your payment was successful."
                    />

                    <EmailVerificationContent
                        session={session}
                        type="narrow"
                        onReSend={handleVerifyEmail}
                    />

                    <div className="min-w-[304px] self-center">
                        <DrawerClose className="w-full">
                            <Button full>Home</Button>
                        </DrawerClose>
                    </div>
                </div>
            </CentralizedContent>
        </Container>
    )
}
