import { PaymentForm } from "../payment-form/payment-form.component";

export function PaymentStep() {
    return (
        <div className="mx-auto grid max-w-lg grid-cols-1 gap-x-[11.63rem] gap-y-16 min-h-screen lg:max-w-none lg:grid-cols-2">
            <div className="mx-auto w-full">
                <div className="ml-auto max-w-[304px] flex min-h-full flex-col justify-center">
                    <div className="flex flex-col items-center gap-8 [&>*]:self-stretch">
                        {/* <div className="flex justify-end [&>*]:flex-1">
                            <SubCard type="bronze" count={40} />
                        </div>

                        <div className="flex justify-center">
                            <HiPlus className="h-6 w-6" />
                        </div>

                        <div className="flex justify-end [&>*]:flex-1">
                            <SubCard type="bronze" count={40} />
                        </div>

                        <div className="flex justify-end [&>*]:flex-1">
                            <p className="text-lg text-center font-semibold">Total amount: $120</p>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[346px]">
                <div className="flex min-h-full flex-col justify-center">
                    <h2 className="text-[32px] font-tt-ramillas text-center mb-[32px]">Sign Up</h2>
                    <PaymentForm />
                </div>
            </div>
        </div>
    )
}