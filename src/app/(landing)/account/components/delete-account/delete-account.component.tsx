"use client";

import * as React from "react";
import * as actions from "@/actions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Alert,
    AlertTitle,
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
import { DeleteAccountFormData, DeleteAccountSchema } from "./delete-account.schema";
import { useEffect } from "react";

interface DeleteAccountFormProps {
    footer?: React.ReactNode;
}

export const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({ footer }) => {
    const [result, formAction] = useFormState(actions.authSignIn, {
        status: 'idle',
        error: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const formRef = React.useRef<HTMLFormElement>(null);

    const form = useForm<DeleteAccountFormData>({
        mode: "onTouched",
        resolver: zodResolver(DeleteAccountSchema)
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
                    form.handleSubmit(async () => {
                        formAction(new FormData(formRef.current!));
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl>
                                <Input
                                    id="password"
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

                <div className="font-normal text-base leading-6">
                    Please enter your password to confirm this action
                </div>

                {footer && <div className="dialog-footer">{footer}</div>}
            </form>
        </Form>
    )
}
