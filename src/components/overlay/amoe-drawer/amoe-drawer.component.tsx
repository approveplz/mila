"use client";

import * as React from "react";
import {
    CentralizedContent,
    Drawer,
    DrawerContent,
    Step,
    Stepper
} from "@/components";
import { CaptchaStep } from "./_components/captcha-step/captcha-step.component";
import { GiveawayStep } from "./_components/giveaway-step/giveaway-step.component";
import { EmailStep } from "./_components/email-step/email-step.component";
import { PhoneStep } from "./_components/phone-step/phone-step.component";
import { PersonalStep } from "./_components/personal-step/personal-step.component";
import { StepperAction } from "./_components/stepper-action/stepper-action.component";
import { useStepper } from "@/hooks";
import { StepperForm } from "./_components/stepper-form/stepper-form.component";

const stepsMeta = [
    {
        id: '1',
        name: 'Capcha',
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
        component: CaptchaStep
    },
    {
        id: '7',
        name: 'Finish',
        component: GiveawayStep
    }
];

const MAX_STEPS = stepsMeta.length;
const INITIAL_STEP = 1;
const STEP_OFFSET = 1;

export function AmoeDrawer() {
    const { step, nextStep, prevStep } = useStepper(2, MAX_STEPS);
    const CurrentStep = stepsMeta[step - STEP_OFFSET].component;

    return (
        <Drawer open={true} dismissible={false} nested={true}>
            <DrawerContent className="bg-white h-full rounded-none z-[9999] pt-24">
                <CentralizedContent centralized="v" fullHeight={false}>
                    <Stepper
                        className="w-[896px]"
                        activeStep={step}
                    >
                        {stepsMeta.map((step) => (
                            <Step key={step.name}>
                                {step.name}
                            </Step>
                        ))}
                    </Stepper>
                </CentralizedContent>

                <StepperForm>
                    <CentralizedContent as="form" centralized="v" fullHeight={false} className="mt-24">
                        <CurrentStep
                            actions={(isValid, isLoading) => (
                                <StepperAction
                                    isValid={isValid}
                                    isLoading={isLoading}
                                    onNext={nextStep}
                                    onBack={prevStep}
                                />
                            )}
                        />
                    </CentralizedContent>
                </StepperForm>
            </DrawerContent>
        </Drawer>
    )
}
