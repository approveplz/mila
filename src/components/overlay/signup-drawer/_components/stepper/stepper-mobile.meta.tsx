import {
    PricingStep,
    AuthFormStep
} from "../auth-step/auth-step.component";
import {
    PaymentFormStep,
    PaymentListStep,
} from "../payment-step/payment-step.component";
import { VerifyEmail } from "../verify-email/verify-email.component";
import { VerifyPhone } from "../verify-phone/verify-phone.component";
import { Finish, FinishPayment } from "../finish/finish.component";
import { useStepperContext } from "./stepper.context";
import { useCheckOutStore } from "@/store";
import { Session } from "next-auth";
import { StepperComponent } from "./stepper.types";

const stepsMobileMetaWithPayment: Array<StepperComponent> = [
    PricingStep,
    AuthFormStep,
    PaymentListStep,
    PaymentFormStep,
    FinishPayment,
];

const stepsMobileMeta: Array<StepperComponent> = [
    PricingStep,
    AuthFormStep,
    VerifyEmail,
    VerifyPhone,
    Finish
];

export function StepperMobile({
    session
}: {
    session: Session | null
}) {
    const { step } = useStepperContext();
    const { checkoutFlow } = useCheckOutStore();
    const withPayment = checkoutFlow === "paid";

    if (withPayment) {
        const Component = stepsMobileMetaWithPayment[step - 1];

        return (
            <Component session={session} />
        )
    } else {
        const Component = stepsMobileMeta[step - 1];

        return (
            <Component session={session} />
        )
    }
}