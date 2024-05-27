import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components";
import { AmoeStepType } from "../../amoe-drawer.type";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";

export function PhoneStep({ actions }: AmoeStepType) {
    const form = useFormContext();

    const isValid = () => Promise.reject(false);

    return (
        <div className="flex flex-col gap-12">
            {/* {/* <p>Verify your Phone Number</p> */}

            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="phone">Phone</FormLabel>
                        <FormControl>
                            <Input
                                id="phone"
                                placeholder="(555) 555-1234"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* <article className="flex flex-col gap-8 items-stretch sm:items-center justify-between sm:justify-normal max-w-[592px] h-full sm:h-auto pt-16 pb-12 sm:pt-0 sm:pb-0">
                <header className="flex flex-col gap-8 items-center">
                    <HiOutlineDevicePhoneMobile className="h-12 w-12 text-primary" />
                    <h2 className="text-4xl font-tt-ramillas">Phone number verification</h2>
                </header>

                <main className="flex flex-col gap-8 items-center text-center">
                    <p>Please enter the 6 digit code that we sent to: <br /> +385-846-588-952</p>

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
                </main>

                <footer className="flex flex-col items-center gap-8 min-w-[346px]">
                    <div className="flex items-center">
                        <p>Didn&apos;t’ get the email?</p>
                        <button className="font-medium ml-1" onClick={() => {}}>Resend verification email</button>
                    </div>
                </footer>
            </article> */}

            {actions && actions(isValid, false)}
        </div>
    )
}
