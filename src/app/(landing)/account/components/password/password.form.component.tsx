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
} from "@/components";
import { useFormState } from "react-dom";
import { WarningCircle } from "@phosphor-icons/react";
import { PasswordFormData, PasswordSchema } from "./password.schema";
import { useEffect } from "react";
import { Session } from "next-auth";
import { GetProfileResponse } from "@/api/auth/auth.types";
import { updateProfileDetails } from "@/api/auth";
import { toast } from "sonner"
import { HiXMark } from "react-icons/hi2";

interface PasswordFormProps {
    session: Session | null;
    profileDetail: GetProfileResponse | undefined;
}

export function PasswordForm({ session, profileDetail }: PasswordFormProps) {
    const [result, formAction] = useFormState(actions.authSignIn, {
        status: 'idle',
        error: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const formRef = React.useRef<HTMLFormElement>(null);

    const form = useForm<PasswordFormData>({
        mode: "onTouched",
        resolver: zodResolver(PasswordSchema),
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

                    form.handleSubmit(async (data) => {
                        if (
                            !data?.currentPassword ||
                            data.currentPassword.length < 8 ||
                            !data?.newPassword ||
                            data.newPassword.length < 8 ||
                            !data?.confirmPassword ||
                            data.confirmPassword.length < 8
                        ) {
                            return;
                        }
                        setIsLoading(true);
                        updateProfileDetails(session?.user?.user?.id as string, {
                            first_name: profileDetail?.first_name,
                            last_name: profileDetail?.last_name,
                            address: {
                                line_1: profileDetail?.address?.line_1,
                                line_2: profileDetail?.address?.line_2,
                                city: profileDetail?.address?.city,
                                region: profileDetail?.address?.region,
                                postal_code: profileDetail?.address?.postal_code,
                            },
                            current_password: data?.currentPassword,
                            new_password_1: data?.newPassword,
                            new_password_2: data?.confirmPassword

                        }).then(res => {
                            toast("Information Updated", {
                                action: {
                                    label: "X",
                                    onClick: () => console.log("Undo"),
                                },
                            })
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
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="currentPassword">Current Password</FormLabel>
                            <FormControl>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    placeholder="*********"
                                    autoComplete="on"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="newPassword">New Password</FormLabel>
                            <FormControl>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    placeholder="*********"
                                    autoComplete="on"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="*********"
                                    autoComplete="on"
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
