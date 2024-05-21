"use client";

import * as React from "react";
import * as actions from "@/actions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Alert,
    AlertTitle,
    Button,
    Checkbox,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Label,
    Textarea
} from "@/components";
import { useFormState, useFormStatus } from "react-dom";
import { WarningCircle } from "@phosphor-icons/react";
import { BecomeAPartnerFormData, BecomeAPartnerSchema } from "./form.schema";
import { useEffect } from "react";

export function BecomeAPartnerForm() {
    const [result, formAction] = useFormState(actions.authSignIn, {
        status: 'idle',
        error: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const formRef = React.useRef<HTMLFormElement>(null);

    const form = useForm<BecomeAPartnerFormData>({
        mode: "onTouched",
        resolver: zodResolver(BecomeAPartnerSchema)
    });

    useEffect(() => {
        if (result) {
            if (result.status === "success") {
                setIsLoading(false);
                router.back()
            } else if (result.status === "failed") {
                setIsLoading(false);
            }
        }
    }, [result, router]);

    return (
        <Form {...form}>
            <form
                ref={formRef}
                className="flex flex-col gap-6"
                action={formAction}
                onSubmit={(evt) => {
                    evt.preventDefault();
                    // setIsLoading(true);
                    // form.handleSubmit(async () => {
                    //     formAction(new FormData(formRef.current!));
                    // })(evt);
                }}
            >
                {result?.error && (
                    <Alert variant="destructive">
                        <WarningCircle className="h-4 w-4" />
                        <AlertTitle>{result?.error}</AlertTitle>
                    </Alert>
                )}
                <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="businessName">Business Name</FormLabel>
                            <FormControl>
                                <Input
                                    id="businessName"
                                    placeholder="e.g.JohnDoe"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="contactName">Contact Name</FormLabel>
                            <FormControl>
                                <Input
                                    id="contactName"
                                    placeholder="e.g.JohnDoe"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="contactEmail">Email Address</FormLabel>
                            <FormControl>
                                <Input
                                    id="contactEmail"
                                    placeholder="e.g.JohnDoe@gmail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="optional"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="optional">Optional</FormLabel>
                            <FormControl>
                                <Textarea
                                    id="optional"
                                    placeholder="e.g.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button type="submit" disabled={isLoading}>Send</Button>
            </form>
        </Form>
    )
}
