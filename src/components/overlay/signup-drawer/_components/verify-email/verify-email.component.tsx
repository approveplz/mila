import { sendVerificationSms } from "@/api/auth";
import { Button, CentralizedContent, Container, EmailVerificationContent } from "@/components";
import { useCheckOutStore } from "@/store";
import { useStepperContext } from "../stepper/stepper.context";

export function VerifyEmail() {
    const { nextStep } = useStepperContext();
    const { checkoutFlow } = useCheckOutStore();

    const handleVerifyPhone = () => {
        sendVerificationSms().then(res => {
            nextStep();
        }).catch(err => {
            console.log("err: ", err);
        })
    }

    return (
        <Container>
            <CentralizedContent>
                <EmailVerificationContent
                    onReSend={() => { }}
                    action={checkoutFlow === "free" && <Button full onClick={handleVerifyPhone}>Verify Your Phone Number</Button>}
                />
            </CentralizedContent>
        </Container>
    )
}
