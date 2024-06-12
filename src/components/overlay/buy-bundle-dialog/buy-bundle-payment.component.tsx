import * as React from "react";
import { BuyBundleProvider } from "./buy-bundle.context";
import { ProductList } from "./buy-bundle-product.component";
import { PaymentForm } from "./buy-bundle-form.component";
import { CentralizedContent, Container } from "@/components";

export function BuyBundlePayment() {
    return (
        <div className="overflow-auto py-3 tall:overflow-hidden tall:py-0 max-h-screen">
            <BuyBundleProvider>
                <div className="mx-auto grid max-w-lg grid-cols-1 gap-x-[11.63rem] gap-y-16 min-h-screen lg:max-w-none lg:grid-cols-2">
                    <div className="mx-auto w-full">
                        <div className="ml-auto max-w-[360px] flex min-h-full flex-col justify-center">
                            <div className="flex flex-col items-center gap-8 [&>*]:self-stretch">
                                <ProductList />
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
            </BuyBundleProvider>
        </div>
    )
}

export function PaymentListStep() {
    return (
        <Container>
            <CentralizedContent centralized="h" className="flex flex-col pt-16 pb-12 sm:pt-0 sm:pb-0">
                <BuyBundleProvider>
                    <ProductList />
                </BuyBundleProvider>
            </CentralizedContent>
        </Container>
    )
}

export function PaymentFormStep() {
    return (
        <Container>
            <CentralizedContent centralized="h" className="flex flex-col pt-16 pb-12 sm:pt-0 sm:pb-0">
                <BuyBundleProvider>
                    <PaymentForm />
                </BuyBundleProvider>
            </CentralizedContent>
        </Container>
    )
}
