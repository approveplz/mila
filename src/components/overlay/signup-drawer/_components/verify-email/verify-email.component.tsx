import { sendVerificationEmail, sendVerificationSms } from "@/api/auth";
import { Button, CentralizedContent, Container, EmailVerificationContent, Spinner } from "@/components";
import { useCheckOutStore } from "@/store";
import { useStepperContext } from "../stepper/stepper.context";
import { StepperComponentProps } from "../stepper/stepper.types";
import { useMutation } from "@tanstack/react-query";

export function VerifyEmail({ session }: StepperComponentProps) {
    const { nextStep } = useStepperContext();
    const { checkoutFlow } = useCheckOutStore();

    const { mutate: verifyPhoneMutate, isPending } = useMutation({
        mutationFn: () => {
            return sendVerificationSms()
                .then(res => res)
        },
        onSuccess(data, variables, context) {
            nextStep();
        },
    })

    // const handleVerifyPhone = () => {
    //     sendVerificationSms().then(res => {
    //         nextStep();
    //     }).catch(err => {
    //         console.log("err: ", err);
    //     })
    // }

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
                    onReSend={handleVerifyEmail}
                    action={checkoutFlow === "free" && (
                        <Button full onClick={() => verifyPhoneMutate()} disabled={isPending}>
                            Verify Your Phone Number
                            {isPending && <Spinner className="w-4 h-4 ml-4" />}
                        </Button>
                    )}
                />
            </CentralizedContent>
        </Container>
    )
}
