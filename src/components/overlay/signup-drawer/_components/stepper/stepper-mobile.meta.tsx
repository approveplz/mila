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
import { Finish, FinishPayment, FinishThanks } from "../finish/finish.component";
import { useStepperContext } from "./stepper.context";
import { useCheckOutStore } from "@/store";
import { StepperComponent } from "./stepper.types";

const stepsMobileMetaWithPayment: Array<StepperComponent> = [
    PricingStep,
    AuthFormStep,
    PaymentListStep,
    PaymentFormStep,
    FinishPayment,
    FinishThanks
];

const stepsMobileMeta: Array<StepperComponent> = [
    PricingStep,
    AuthFormStep,
    VerifyEmail,
    VerifyPhone,
    Finish
];

export function StepperMobile() {
    const { step } = useStepperContext();
    const { checkoutFlow } = useCheckOutStore();
    const withPayment = checkoutFlow === "paid";

    if (withPayment) {
        const Component = stepsMobileMetaWithPayment[step - 1];

        return (
            <Component />
        )
    } else {
        const Component = stepsMobileMeta[step - 1];

        return (
            <Component />
        )
    }
}