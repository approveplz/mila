"use client";

import {
    Button,
    CentralizedContent,
    Container
} from "@/components";
import { useCheckOutStore } from "@/store";
import { PricingList } from "./pricing-list.component";
import { AuthForm } from "../auth-form/auth-form.component";
import { useStepperContext } from "../stepper/stepper.context";

export function AuthStep() {
    const { products } = useCheckOutStore(state => state);

    return (
        <div className="mx-auto grid max-w-lg grid-cols-1 gap-x-[11.63rem] gap-y-16 min-h-screen lg:max-w-none lg:grid-cols-2">
            <div className="mx-auto w-full">
                <div className="mx-auto lg:ml-auto lg:mr-0 max-w-[304px] flex min-h-full flex-col justify-center">
                    <PricingList products={products} />
                </div>
            </div>

            <div className="w-full max-w-[346px]">
                <div className="flex flex-col justify-center min-h-full">
                    <h2 className="text-[32px] font-tt-ramillas text-center mb-[32px]">Sign Up</h2>
                    <AuthForm />
                </div>
            </div>
        </div>
    )
}

export function PricingStep() {
    const { products } = useCheckOutStore(state => state);
    const { nextStep } = useStepperContext();

    return (
        <Container className="mx-0 overflow-scroll">
            <CentralizedContent centralized="h" className="flex flex-col py-16 sm:py-0" fullHeight={true}>
                <h2 className="text-[32px] font-tt-ramillas text-center mb-[32px]">You have chosen</h2>
                <PricingList products={products} />
                <Button full className="mt-auto" onClick={nextStep}>Continue</Button>
            </CentralizedContent>
        </Container>
    )
}

export function AuthFormStep() {
    return (
        <Container className="mx-0 overflow-scroll">
            <CentralizedContent centralized="h" className="flex flex-col py-16 sm:py-0" fullHeight={true}>
                <h2 className="text-[32px] font-tt-ramillas text-center mb-[27px]">Sign Up</h2>
                <AuthForm />
            </CentralizedContent>
        </Container>
    )
}