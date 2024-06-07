"use client";

import * as React from "react";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2"
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PatternFormat } from "react-number-format";

const pinFormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});

type PinFormData = z.infer<typeof pinFormSchema>

export function PhoneVerificationContent({
    phone,
    showHeader = true,
    error,
    onReSend,
    onVerify
}: {
    phone: string,
    showHeader?: boolean,
    error?: string,
    onReSend: () => void,
    onVerify: (pin: string) => void,
}) {
    const form = useForm<PinFormData>({
        resolver: zodResolver(pinFormSchema),
        defaultValues: {
            pin: "",
        }
    });

    function onSubmit(data: PinFormData) {
        onVerify(data.pin)
    }

    return (
        <article className="flex flex-col gap-8 items-stretch sm:items-center justify-between sm:justify-normal max-w-[592px] h-full sm:h-auto pt-16 pb-12 sm:pt-0 sm:pb-0">
            {showHeader && (
                <header className="flex flex-col gap-8 items-center">
                    <h2 className="text-4xl font-tt-ramillas">Just one more step!</h2>
                </header>
            )}

            <main className="flex flex-col gap-8 items-center text-center">
                <HiOutlineDevicePhoneMobile className="h-12 w-12 text-primary" />
                <h2 className="text-4xl font-tt-ramillas">Phone number verification</h2>
                <p>Please enter the 6 digit code that we sent to: <br />
                    <PatternFormat
                        displayType="text"
                        format="+1 (###)-####-###"
                        allowEmptyFormatting
                        mask="_"
                        value={phone.split(" ")[1] || ""} />
                </p>

                <Form {...form}>
                    <form id="phone-pin-form" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </main>

            <footer className="flex flex-col items-center gap-8 min-w-[346px]">
                <Button full form="phone-pin-form">Verify</Button>
                <div className="flex items-center">
                    <p>Didn&apos;t get the email?</p>
                    <button className="font-medium ml-1" onClick={onReSend}>Resend verification email</button>
                </div>
            </footer>
        </article>
    )
}