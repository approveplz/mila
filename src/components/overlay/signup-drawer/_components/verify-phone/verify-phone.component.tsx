"use client";

import { sendVerificationSms, verifyEmailOrSMS } from "@/api/auth";
import { CentralizedContent, Container } from "@/components";
import { PhoneVerificationContent } from "@/components";
import { useStepperContext } from "../stepper/stepper.context";
// import { useFormContext } from "react-hook-form";
import { StepperComponentProps } from "../stepper/stepper.types";

export function VerifyPhone({ session }: StepperComponentProps) {
    const { nextStep } = useStepperContext();
    // const { getValues } = useFormContext();

    const handleVerifyPhone = (pin: string) => {
        verifyEmailOrSMS({ server_code: pin })
            .then(res => {
                nextStep();
            }).catch(err => {
                console.log("err: ", err);
            })
    }

    const handleSendVerifyPhone = () => {
        sendVerificationSms().then(res => {
            console.log("res: ", res);
        }).catch(err => {
            console.log("err: ", err);
        })
    }

    console.log(session)
    return (
        <Container>
            <CentralizedContent>
                <PhoneVerificationContent
                    onReSend={handleSendVerifyPhone}
                    onVerify={handleVerifyPhone}
                    phone={session?.user.user.phone || ""}
                />
            </CentralizedContent>
        </Container>
    )
}
