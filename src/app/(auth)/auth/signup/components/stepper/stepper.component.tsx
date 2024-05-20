"use client";

import { useState, useEffect } from "react";
import {
    AuthStep,
    PricingStep,
    AuthFormStep
} from "../auth-step/auth-step.component";
import { PricingList } from "../auth-step/pricing-list.component";
import { PaymentStep } from "../payment-step/payment-step.component";
import { VerifyEmail } from "../verify-email/verify-email.component";
import { VerifyPhone } from "../verify-phone/verify-phone.component";
import { Finish } from "../finish/finish.component";
import { StepperProvider, useStepperContext } from "./stepper.context";

// PaymentStep,
const stepsMeta = [
    AuthStep,
    VerifyEmail,
    VerifyPhone,
    Finish
];

// PaymentStep,
const stepsMobileMeta = [
    PricingStep,
    AuthFormStep,
    VerifyEmail,
    VerifyPhone,
    Finish
];

export function StepperMain() {
    const { step } = useStepperContext();
    const Component = stepsMeta[step - 1];

    return (
        <Component />
    )
}

export function StepperMobile() {
    const { step } = useStepperContext();
    const Component = stepsMobileMeta[step - 1];

    return (
        <Component />
    )
}

export function Stepper() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <StepperProvider>
            {width < 640 ? <StepperMobile /> : <StepperMain />}
        </StepperProvider>
    )
}