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
import { GetProfileResponse } from "@/api/auth/auth.types";
import { toast } from "sonner"
import { HiXMark } from "react-icons/hi2";

interface BasicInfoFormProps {
    session: Session | null;
    profileDetail: GetProfileResponse | undefined;
    refetch: () => void
}

export function BasicInfoForm({ session, profileDetail, refetch }: BasicInfoFormProps) {
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
        values: {
            fullName: profileDetail?.full_name as string,
            // firstName: profileDetail?.first_name as string,
            // lastName: profileDetail?.last_name as string,
            emailAddress: profileDetail?.email as string,
            phone: profileDetail?.phone as string,
        },
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
                        updateProfileDetails(session?.user?.user?.id as string, {
                            // first_name: data?.firstName,
                            // last_name: data?.lastName,
                            full_name: data?.fullName
                        }).then(res => {
                            toast("Information Updated", {
                                action: {
                                    label: "X",
                                    onClick: () => console.log("Undo"),
                                },
                            })
                            refetch();
                            setIsLoading(false);
                        }).catch(e => {
                            toast("Error occured while updating information", {
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
                {result?.error && (
                    <Alert variant="destructive">
                        <WarningCircle className="h-4 w-4" />
                        <AlertTitle>{result?.error}</AlertTitle>
                    </Alert>
                )}
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="fullName">Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    id="fullName"
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
                                    disabled
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
                                    disabled
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button className="w-fit sm:w-[65px] py-2 px-4" type="submit" disabled={isLoading}>Save</Button>
            </form>
        </Form>
    )
}
