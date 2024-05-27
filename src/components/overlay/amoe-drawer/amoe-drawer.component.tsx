"use client";

import * as React from "react";
import {
    Button,
    CentralizedContent,
    Drawer,
    DrawerContent,
    DrawerTrigger,
    Form
} from "@/components";
import { cn } from "@/utils";
import { VariantProps, cva } from "class-variance-authority";
import { useForm } from "react-hook-form";

import { CaptchaStep } from "./_components/captcha-step/captcha-step.component";
import { EmailStep } from "./_components/email-step/email-step.component";
import { PhoneStep } from "./_components/phone-step/phone-step.component";
import { PersonalStep } from "./_components/personal-step/personal-step.component";
import { GiveawayStep } from "./_components/giveaway-step/giveaway-step.component";

const steps = [
    { id: '1', name: 'Capcha', status: 'current' },
    { id: '2', name: 'Giveaway', status: 'upcoming' },
    { id: '4', name: 'Email', status: 'upcoming' },
    { id: '5', name: 'Phone Number', status: 'upcoming' },
    { id: '6', name: 'Name', status: 'upcoming' },
    { id: '7', name: 'Address', status: 'upcoming' },
    { id: '8', name: 'Finish', status: 'upcoming' },
]

// function Stepper({
//     children
// }: {
//     children: React.ReactNode
// }) {
//     return (
//         <nav aria-label="Progress" className="max-w-[896px] w-full">
//             <p className="text-lg text-center font-semibold mb-4">1 of 7</p>

//             <ol role="list" className="space-y-0 flex space-x-4 w-full">
//                 {children}
//             </ol>
//         </nav>
//     )
// }

// const stepClasses = cva("group flex flex-col border-t-4 pt-3 min-w-[114.29px]", {
//     variants: {
//         status: {
//             current: "border-fatal",
//             upcoming: "border-[#D1D5DB]",
//             complete: "border-fatal",
//         }
//     }
// })

// function Step({
//     status,
//     children
// }: {
//     children: React.ReactNode
// } & VariantProps<typeof stepClasses>) {
//     return (
//         <li className="flex-1">
//             <div
//                 className={cn(stepClasses({ status }))}
//             >
//                 <span className="text-xs text-muted font-medium">
//                     {children}
//                 </span>
//             </div>
//         </li>
//     )
// }

export function AmoeDrawer() {
    const form = useForm();

    return (
        <Drawer open={false} dismissible={false} nested={true}>
            <DrawerContent className="bg-white h-full rounded-none z-[9999] pt-24">
                {/* <CentralizedContent centralized="v" fullHeight={false}>
                    <Stepper>
                        {steps.map((step) => (
                            <Step key={step.name} status={step.status as VariantProps<typeof stepClasses>["status"]}>
                                {step.name}
                            </Step>
                        ))}
                    </Stepper>
                </CentralizedContent> */}
                <CentralizedContent centralized="v" fullHeight={false}>
                    <nav aria-label="Progress" className="w-[896px]">
                        <p className="text-lg text-center font-semibold mb-4">1 of 7</p>

                        <ul className="flex gap-4">
                            {steps.map((step) => (
                                <li key={step.name} className="border-t-4 flex-1 border-fatal pt-3 text-xs text-muted font-medium">
                                    {step.name}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </CentralizedContent>

                <Form {...form}>
                    <CentralizedContent as="form" centralized="v" fullHeight={false} className="mt-24">
                        <CaptchaStep
                            actions={(isValid, isLoading) => (
                                <div className="flex flex-col items-center">
                                    <div className="flex gap-4 [&>*]:flex-1 w-full">
                                        <Button variant="primary-outline" full>Back</Button>
                                        <Button full>Next</Button>
                                    </div>

                                    <p className="mt-[30px]">Entries applied to via this link will not show on your account</p>
                                </div>
                            )}
                        />
                    </CentralizedContent>
                </Form>
            </DrawerContent>
        </Drawer>
    )
}
