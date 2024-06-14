"use client";

import {
    Button,
    CentralizedContent,
    Container,
    DrawerClose,
    EmailVerificationContent,
    ThankYou
} from "@/components";
import { useRouter } from "next/navigation";
import { StepperComponentProps } from "../stepper/stepper.types";
import { sendVerificationEmail } from "@/api/auth";
import { HiOutlineHeart } from "react-icons/hi2";
import { useStepperContext } from "../stepper/stepper.context";
import useTotalAmount from "@/hooks/useTotalAmount";
import { sendGTMEvent } from '@next/third-parties/google'


export function Finish() {
    const router = useRouter();


    return (
        <Container>
            <CentralizedContent fullHeight={true}>
                <ThankYou
                    type="narrow"
                    info=""
                    onFinish={() => { }}
                />
            </CentralizedContent>
        </Container>
    )
}

export function FinishPayment({ session }: StepperComponentProps) {
    const { nextStep } = useStepperContext();
    const { totalAmount } = useTotalAmount();

    const handleVerifyEmail = () => {
        sendVerificationEmail().then(res => {
            console.log("res: ", res);
        }).catch(err => {
            console.log("err: ", err);
        })
    }

    return (
        <Container>
            <CentralizedContent className="py-16 sm:py-0" fullHeight={true}>
                <div className="flex flex-col gap-20 sm:gap-24 justify-center h-full">
                    <ThankYou
                        type="wider"
                        info="Your payment was successful."
                    />

                    <EmailVerificationContent
                        type="narrow"
                        onReSend={handleVerifyEmail}
                    />

                    <div className="min-w-[304px] self-center hidden sm:flex">
                        <DrawerClose className="w-full">
                            <Button
                                onClick={() => {
                                    sendGTMEvent({ event: 'subscribed', value: { checkout_total: totalAmount} });
                                }} full>Home</Button>
                        </DrawerClose>
                    </div>

                    <div className="min-w-[304px] self-center flex sm:hidden pb-12">
                        <Button full onClick={nextStep}>Proceed to Check-out</Button>
                    </div>
                </div>
            </CentralizedContent>
        </Container>
    )
}

export function FinishThanks({ session }: StepperComponentProps) {
    return (
        <Container>
            <CentralizedContent>
                <article className="flex flex-col items-stretch justify-between gap-8 h-full sm:h-auto pt-16 pb-12 sm:pt-0 sm:pb-0">
                    <div></div>
                    <main>
                        <header className="flex flex-col items-center gap-8">
                            <HiOutlineHeart className="h-12 w-12 text-primary" />
                            <h2 className="text-4xl font-tt-ramillas">Thank you!</h2>
                        </header>
                        <p className="text-center mt-6">Your payment was successful.</p>
                    </main>


                    <footer className="min-w-[346px]">
                        <DrawerClose className="w-full">
                            <Button full>Home</Button>
                        </DrawerClose>
                    </footer>

                </article>
            </CentralizedContent>
        </Container>
    )
}
