"use client";

import * as React from "react";
import * as actions from "@/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Input,
} from "@/components";
import { useFormState } from "react-dom";
import { subscribeToNewsletter } from "@/api/auth";
import { toast } from "sonner"
import * as z from "zod";

const SubscribeToNewsLetterSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Enter a valid email" }),
});

type SubscribeToNewsLetterFormData = z.infer<typeof SubscribeToNewsLetterSchema>

export function SubscribeToNewsletter() {
    const [result, formAction] = useFormState(actions.authSignIn, {
        status: 'idle',
        error: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const formRef = React.useRef<HTMLFormElement>(null);
    const form = useForm<SubscribeToNewsLetterFormData>({
        mode: "onTouched",
        resolver: zodResolver(SubscribeToNewsLetterSchema),
    });

    return (
        <Form {...form}>
            <form
                ref={formRef}
                className="flex flex-col gap-6"
                action={formAction}
                onSubmit={(evt) => {
                    evt.preventDefault();

                    form.handleSubmit(async (data) => {
                        if (
                            !data?.email
                        ) {
                            return;
                        }
                        setIsLoading(true);
                        subscribeToNewsletter({
                            email: data?.email,
                            secret: process.env.NEXT_PUBLIC_API_SECRET as string

                        }).then(res => {
                            toast("You have successfuly subscribed to newsletter", {
                                action: {
                                    label: "X",
                                    onClick: () => console.log("Undo"),
                                },
                            })
                            form.reset();
                            setIsLoading(false);
                        }).catch(e => {
                            toast("Error occured while subscribing newsletter", {
                                action: {
                                    label: "X",
                                    onClick: () => console.log("Undo"),
                                },
                            })
                            setIsLoading(false);
                        })
                    })(evt);
                }}
            >
                <div className="flex flex-row gap-4">
                    <FormField
                        control={form.control}
                        name="email"

                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        id="emailAddress"
                                        placeholder="Enter your email"
                                        {...field}
                                        className="sm:w-[360px] h-[40px] border-[#171614]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="h-[40px]" variant="primary" type="submit" disabled={isLoading}>Subscribe</Button>
                </div>
            </form>
        </Form>
    )
}
