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
import { useFormState } from "react-dom";
import { WarningCircle } from "@phosphor-icons/react";
import { BasicInfoFormData, BasicInfoSchema } from "./basic-info.schema";
import { useEffect } from "react";
import { Session } from "next-auth";
import { updateProfileDetails } from "@/api/auth";

export function BasicInfoForm({ session }: { session: Session | null }) {
    const [result, formAction] = useFormState(actions.authSignIn, {
        status: 'idle',
        error: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const formRef = React.useRef<HTMLFormElement>(null);

    const form = useForm<BasicInfoFormData>({
        mode: "onTouched",
        resolver: zodResolver(BasicInfoSchema),
        defaultValues: {
            firstName: session?.user.user.full_name.split(' ')[0] || '',
            lastName: session?.user.user.full_name.split(' ')[1] || '',
            emailAddress: session?.user.user.email || '',
            phone: session?.user.user.phone || '',
        }
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
                    setIsLoading(true);
                    form.handleSubmit(async (data) => {
                        console.log(data);
                        updateProfileDetails({
                            first_name:data?.firstName,
                            last_name:data?.lastName,
                        })
                        setIsLoading(false)
                        // formAction(new FormData(formRef.current!));
                    })(evt);
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
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="firstName">First Name</FormLabel>
                            <FormControl>
                                <Input
                                    id="firstName"
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
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="lastName">Last Name</FormLabel>
                            <FormControl>
                                <Input
                                    id="lastName"
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
                    name="emailAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="emailAddress">Email Address</FormLabel>
                            <FormControl>
                                <Input
                                    id="emailAddress"
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


                <Button className="w-[65px] py-2 px-4" type="submit" disabled={isLoading}>Save</Button>
            </form>
        </Form>
    )
}
