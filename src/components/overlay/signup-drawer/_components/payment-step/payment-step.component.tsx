import { CentralizedContent, Container } from "@/components";
import { PaymentForm } from "../payment-form/payment-form.component";
import { PaymentList } from "./payment-list.component";

export function PaymentStep() {
    return (
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
                    <PaymentForm />
                </div>
            </div>
        </div>
    )
}

export function PaymentListStep() {
    return (
        <Container>
            <CentralizedContent centralized="h" className="flex flex-col pt-16 pb-12 sm:pt-0 sm:pb-0">
                <PaymentList />
            </CentralizedContent>
        </Container>
    )
}

export function PaymentFormStep() {
    return (
        <Container>
            <CentralizedContent centralized="h" className="flex flex-col pt-16 pb-12 sm:pt-0 sm:pb-0">                
                <PaymentForm />
            </CentralizedContent>
        </Container>
    )
}