"use client"

import * as React from "react";
import {
    AuthStep,
    PricingStep,
    AuthFormStep
} from "../auth-step/auth-step.component";
import {
    PaymentFormStep,
    PaymentListStep,
    PaymentStep
} from "../payment-step/payment-step.component";
import { VerifyEmail } from "../verify-email/verify-email.component";
import { VerifyPhone } from "../verify-phone/verify-phone.component";
import { Finish, FinishPayment } from "../finish/finish.component";
import { StepperProvider, useStepperContext } from "./stepper.context";
import { useCheckOutStore } from "@/store";

const stepsMetaWithPayment = [
    AuthStep,
    PaymentStep,
    VerifyEmail,
    FinishPayment
];

const stepsMeta = [
    AuthStep,
    VerifyEmail,
    VerifyPhone,
    Finish
];

const stepsMobileMetaWithPayment = [
    PricingStep,
    AuthFormStep,
    PaymentListStep,
    PaymentFormStep,
    VerifyEmail,
    FinishPayment,
];

const stepsMobileMeta = [
    PricingStep,
    AuthFormStep,
    VerifyEmail,
    VerifyPhone,
    Finish
];

function StepperMain({
    withPayment
}: {
    withPayment: boolean
}) {
    const { step } = useStepperContext();

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

function StepperMobile({
    withPayment
}: {
    withPayment: boolean
}) {
    const { step } = useStepperContext();

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

function Stepper() {
    const [width, setWidth] = React.useState(window.innerWidth);
    const { checkoutFlow } = useCheckOutStore();

    React.useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <StepperProvider>
            {width < 640 ? (
                <StepperMobile withPayment={checkoutFlow === "paid"} />
            ) : (
                <StepperMain withPayment={checkoutFlow === "paid"} />
            )}
        </StepperProvider>
    )
}

export default Stepper;