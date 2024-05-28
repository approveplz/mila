"use client";

import * as React from "react";
import {
    Button,
    CentralizedContent,
    Drawer,
    DrawerContent,
    DrawerTrigger,
    Step,
    StepLabel,
    Stepper
} from "@/components";
import { CaptchaStep } from "./_components/captcha-step/captcha-step.component";
import { GiveawayStep } from "./_components/giveaway-step/giveaway-step.component";
import { EmailStep } from "./_components/email-step/email-step.component";
import { PhoneStep } from "./_components/phone-step/phone-step.component";
import { PersonalStep } from "./_components/personal-step/personal-step.component";
import { AddressStep } from "./_components/address-step/address-step.component";
import { FinishStep } from "./_components/finish-step/finish-step.component";
import { StepperAction } from "./_components/stepper-action/stepper-action.component";
import { useStepper } from "@/hooks";
import { StepperForm } from "./_components/stepper-form/stepper-form.component";

const stepsMeta = [
    {
        id: '1',
        name: 'Captcha',
        component: CaptchaStep
    },
    {
        id: '2',
        name: 'Giveaway',
        component: GiveawayStep
    },
    {
        id: '3',
        name: 'Email',
        component: EmailStep
    },
    {
        id: '4',
        name: 'Phone Number',
        component: PhoneStep
    },
    {
        id: '5',
        name: 'Name',
        component: PersonalStep
    },
    {
        id: '6',
        name: 'Address',
        component: AddressStep
    },
    {
        id: '7',
        name: 'Finish',
        component: FinishStep
    }
];

const MAX_STEPS = stepsMeta.length;
const INITIAL_STEP = 1;
const STEP_OFFSET = 1;

export function AmoeDrawer() {
    const { step, nextStep, prevStep } = useStepper(INITIAL_STEP, MAX_STEPS);
    const currentStep = stepsMeta[step - STEP_OFFSET];
    const currentTitle = currentStep.name;
    const CurrentComponent = currentStep.component;

    return (
        <Drawer dismissible={false} nested={true}>
            <DrawerTrigger asChild>
                <Button variant="secondary">
                    AMOE
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-white h-full rounded-none z-[9999] pt-[52px] pl-6 pr-6 sm:pt-24 sm:pl-0 sm:pr-0">
                <CentralizedContent centralized="v" fullHeight={false}>
                    <Stepper
                        className="w-[896px]"
                        activeStep={step}
                        activeTitle={currentTitle}
                    >
                        {stepsMeta.map((st, idx) => (
                            <Step key={st.name} active={(idx + 1) <= step}>
                                {st.name}
                            </Step>
                        ))}
                    </Stepper>
                </CentralizedContent>

                <StepperForm>
                    <CurrentComponent
                        actions={(isValid, isLoading) => (
                            <StepperAction
                                isValid={isValid}
                                isLoading={isLoading}
                                onNext={nextStep}
                                onBack={prevStep}
                                showBack={step !== 1}
                            />
                        )}
                    />
                </StepperForm>
            </DrawerContent>
        </Drawer>
    )
}
