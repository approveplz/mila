import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from "@/components";
import { AmoeStepType } from "../../amoe-drawer.type";
import { HiOutlineEnvelopeOpen } from "react-icons/hi2";

export function EmailStep({ actions }: AmoeStepType) {
    const form = useFormContext();

    const isValid = () => Promise.reject(false);

    return (
        <div className="flex flex-col gap-12">
            <p>Verify your Email Address</p>

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <FormControl>
                            <Input
                                id="email"
                                placeholder="e.g.JohnDoe@gmail.com"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* <article className="flex flex-col gap-8 items-stretch sm:items-center justify-between sm:justify-normal max-w-[592px] h-full sm:h-auto pt-16 pb-12 sm:pt-0 sm:pb-0">
                <header className="flex flex-col gap-8 items-center">
                    <HiOutlineEnvelopeOpen className="h-12 w-12 text-primary" />
                    <h2 className="text-3xl text-center font-tt-ramillas">Email verification</h2>
                </header>

                <main className="flex flex-col gap-8 items-center text-center">
                    <p className="text-center">Please enter the code that we sent to: <br /> JohnDoe@gmail.com.</p>

                    <FormField
                        control={form.control}
                        name="email_code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email_code">Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        id="email_code"
                                        placeholder="e.g.Xa89Abc"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center">
                        <p>Didn&apos;t’ get the email?</p>
                        <button className="font-medium ml-1" onClick={() => { }}>Resend verification email</button>
                    </div>
                </main>
            </article> */}

            {actions && actions(isValid, false)}
        </div>
    )
}
