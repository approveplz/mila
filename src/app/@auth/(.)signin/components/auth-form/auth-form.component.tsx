"use client";

import * as React from "react";
import * as actions from "@/actions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigInFormData, sigInSchema } from "./auth-form.schema";
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
    Label
} from "@/components";
import { useFormState, useFormStatus } from "react-dom";
import { WarningCircle } from "@phosphor-icons/react";
import { AUTH_CHECK_COOKIE } from "@/shared/constants/constants";
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/', maxAge: 2 * 24 * 60 * 60, httpOnly: false });

export function AuthForm() {
    const [result, formAction] = useFormState(actions.authSignIn, {
        status: 'idle',
        error: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const formRef = React.useRef<HTMLFormElement>(null);

    const form = useForm<SigInFormData>({
        mode: "onTouched",
        resolver: zodResolver(sigInSchema)
    });

    React.useEffect(() => {
        if (result) {
            if(result.status === "success") {
                setIsLoading(false);
                cookies.set(AUTH_CHECK_COOKIE, "true")
                router.back()
            } else if(result.status === "failed"){
                setIsLoading(false);
            }
        }
    }, [result, router]);

    return (
        <Form {...form}>
            <form
                ref={formRef}
                className="flex flex-col gap-6"
                // action={formAction}
                onSubmit={(evt) => {
                    evt.preventDefault();
                    setIsLoading(true);
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="email">Email Address</FormLabel>
                            <FormControl>
                                <Input
                                    id="email"
                                    type="email"
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="e.g.JohnDoe"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                </div>

                <Button type="submit" disabled={isLoading}>Sign in</Button>
            </form>
        </Form>
    )
}
