import { verifyEmailOrSMS } from "@/api/auth";
import { CentralizedContent, Container } from "@/components";
import { PhoneVerificationContent } from "@/components";
import { useStepperContext } from "../stepper/stepper.context";

export function VerifyPhone() {
    const { nextStep } = useStepperContext();

    const handleVerifyPhone = (pin: string) => {
        // nextStep()
        verifyEmailOrSMS({ server_code: pin })
            .then(res => {
                nextStep();
            }).catch(err => {
                console.log("err: ", err);
            })
    }

    return (
        <Container>
            <CentralizedContent>
                <PhoneVerificationContent
                    onReSend={() => { }}
                    onVerify={handleVerifyPhone}
                />
            </CentralizedContent>
        </Container>
    )
}
