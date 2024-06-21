import { AuthStep } from "../auth-step/auth-step.component";
import { PaymentStep } from "../payment-step/payment-step.component";
import { VerifyEmail } from "../verify-email/verify-email.component";
import { VerifyPhone } from "../verify-phone/verify-phone.component";
import { Finish, FinishPayment } from "../finish/finish.component";
import { useStepperContext } from "./stepper.context";
import { useCheckOutStore } from "@/store";
import { Session } from "next-auth";
import { StepperComponent } from "./stepper.types";

const stepsMetaWithPayment: Array<StepperComponent> = [
    AuthStep,
    PaymentStep,
    FinishPayment
];

const stepsMeta: Array<StepperComponent> = [
    AuthStep,
    VerifyEmail,
    VerifyPhone,
    Finish
];

export function StepperMain() {
    const { step } = useStepperContext();
    const { checkoutFlow } = useCheckOutStore();
    const withPayment = checkoutFlow === "paid";

    if (withPayment) {
        const Component = stepsMetaWithPayment[step - 1];

        return (
            <Component />
        )
    } else {
        const Component = stepsMeta[step - 1];

        return (
            <Component />
        )
    }
}