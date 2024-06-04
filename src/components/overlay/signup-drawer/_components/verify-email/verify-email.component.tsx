import { sendVerificationEmail, sendVerificationSms } from "@/api/auth";
import { Button, CentralizedContent, Container, EmailVerificationContent } from "@/components";
import { useCheckOutStore } from "@/store";
import { useStepperContext } from "../stepper/stepper.context";
import { StepperComponentProps } from "../stepper/stepper.types";

export function VerifyEmail({ session }: StepperComponentProps) {
    const { nextStep } = useStepperContext();
    const { checkoutFlow } = useCheckOutStore();

    const handleVerifyPhone = () => {
        sendVerificationSms().then(res => {
            nextStep();
        }).catch(err => {
            console.log("err: ", err);
        })
    }

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
                <EmailVerificationContent
                    type="wider"
                    session={session}
                    onReSend={handleVerifyEmail}
                    action={checkoutFlow === "free" && <Button full onClick={handleVerifyPhone}>Verify Your Phone Number</Button>}
                />
            </CentralizedContent>
        </Container>
    )
}
