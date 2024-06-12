import * as React from "react";
import { CentralizedContent, Container } from "@/components";
import { PaymentForm } from "../payment-form/payment-form.component";
import { PaymentList } from "./payment-list.component";
import { FormProvider, useForm } from "react-hook-form";
import { StepperComponentProps } from "../stepper/stepper.types";

export function PaymentListFormProvider({ children }: React.PropsWithChildren) {
    const form = useForm<{ coupon: string }>({
        mode: "onTouched",
        defaultValues: {
            coupon: "",
        }
    });

    return (
        <FormProvider {...form}>
            {children}
        </FormProvider>
    )
}

export function PaymentStep({ session }: StepperComponentProps) {
    return (
        <PaymentListFormProvider>
            <div className="mx-auto grid max-w-lg grid-cols-1 gap-x-[11.63rem] gap-y-16 min-h-screen lg:max-w-none lg:grid-cols-2">
                <div className="mx-auto w-full">
                    <div className="ml-auto max-w-[360px] flex min-h-full flex-col justify-center">
                        <div className="flex flex-col items-center gap-8 [&>*]:self-stretch">
                            <PaymentList />
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-[375px]">
                    <div className="flex min-h-full flex-col justify-center">
                        <h2 className="text-[32px] font-tt-ramillas text-center mb-[32px]">Select payment method</h2>
                        <PaymentForm session={session} />
                    </div>
                </div>
            </div>
        </PaymentListFormProvider>
    )
}

export function PaymentListStep({ session }: StepperComponentProps) {
    return (
        <Container>
            <CentralizedContent centralized="h" className="flex flex-col pt-16 pb-12 sm:pt-0 sm:pb-0" fullHeight={true}>
                <PaymentListFormProvider>
                    <PaymentList />
                </PaymentListFormProvider>
            </CentralizedContent>
        </Container>
    )
}

export function PaymentFormStep({ session }: StepperComponentProps) {
    return (
        <Container>
            <CentralizedContent centralized="h" className="flex flex-col pt-16 pb-12 sm:pt-0 sm:pb-0" fullHeight={true}>
                <PaymentListFormProvider>
                    <PaymentForm session={session} />
                </PaymentListFormProvider>
            </CentralizedContent>
        </Container>
    )
}