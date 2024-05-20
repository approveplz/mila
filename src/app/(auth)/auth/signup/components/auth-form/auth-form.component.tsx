"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Checkbox,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@/components";
import { signIn } from "next-auth/react";
import { useCheckOutStore } from "@/store";
import { signUpWithPrices } from "@/api/auth";
import {
    SignUpFormData,
    signUpSchema
} from "./auth-form.schema";
import { useStepperContext } from "../stepper/stepper.context";

type K = keyof SignUpFormData;

export function AuthForm() {
    const { nextStep } = useStepperContext();
    const form = useForm<SignUpFormData>({
        mode: "onTouched",
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            full_name: "",
            phone: "",
            state: "",
            is_outside_of_us: false,
            is_over_18: false
        }
    });

    const onSubmit = (data: SignUpFormData) => {
        const prices = [
            {
                price: "ppr_bd393da27a524bd6ab68e7395b84e9",
                quantity: 0
            }
        ];

        // nextStep();
        signUpWithPrices({
            ...data,
            prices
        })
            .then(res => {
                return signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: false
                })
            })
            .then(() => {
                nextStep()
            })
            .catch(err => {
                const errors = err.response.data;

                Object.entries(errors).forEach((error) => {
                    const [key, val] = error as [K, [string]];

                    form.setError(key, {
                        message: val[0]
                    });
                });
            });
    }

    return (
        <Form {...form}>
            <form
                // className="flex flex-col flex-1 justify-center gap-6 mt-0 sm:mt-auto"
                className="flex flex-col flex-1 sm:flex-initial justify-center gap-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="full_name">Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    id="full_name"
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

                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="state">State</FormLabel>
                            <FormControl>
                                <Input
                                    id="state"
                                    placeholder="New York 12401"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="is_outside_of_us"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel>Out Side of US</FormLabel>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="is_over_18"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel>I am over 18 and I agree to Terms of Use, Privacy Policy and Sweeps Rules</FormLabel>
                        </FormItem>
                    )}
                />

                <Button
                    className="mt-auto sm:mt-0"
                    type="submit"
                    disabled={!form.watch("is_over_18")}
                >
                    Sign Up
                </Button>
            </form>
        </Form>
    )
}
