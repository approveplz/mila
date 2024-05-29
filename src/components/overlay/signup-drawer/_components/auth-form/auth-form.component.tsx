"use client";

import * as React from "react";
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
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components";
import { useCheckOutStore } from "@/store";
import { signUpWithPrices } from "@/api/auth";
import {
    SignUpFormData,
    signUpSchema
} from "./auth-form.schema";
import { useStepperContext } from "../stepper/stepper.context";
import { getProductPriceInfo, prefixObjectKeys, withAsync } from "@/utils";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import * as actions from "@/actions";
import { serialize } from "object-to-formdata";
import states from "@/data/state.data.json" with { type: "json" };

type K = keyof SignUpFormData;

export function AuthForm() {
    const { nextStep } = useStepperContext();
    const { products } = useCheckOutStore();
    const formRef = React.useRef<HTMLFormElement>(null);

    const form = useForm<SignUpFormData>({
        mode: "onTouched",
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            full_name: "",
            phone: "",
            state: "",
            is_over_18_and_agrees_tc: false,
            token: ""
        }
    });

    const onSubmit = (signUpFormData: SignUpFormData) => {
        const { token: _, ...data } = signUpFormData;

        const prices = products
            .map(product => {
                const { discountedPrice, defaultPrice } = getProductPriceInfo(product.data.prices)

                if (!!discountedPrice) {
                    return {
                        price: discountedPrice.id,
                        quantity: product.quantity
                    }
                } else {
                    return {
                        price: defaultPrice.id,
                        quantity: product.quantity
                    }
                }
            })

        signUpWithPrices({
            ...data,
            prices
        })
            .then(async (res) => {
                const user = prefixObjectKeys(res.user, "userpre_")
                const metadata = prefixObjectKeys(res.user.metadata, "metadatapre_")

                const payload = JSON.parse(JSON.stringify(res));
                delete payload.user;

                // authSignUp(serialize({
                //     ...payload,
                //     ...user,
                //     ...metadata,
                // }))
                // const { response, error } = await withAsync(() => actions.signUp(serialize({
                //     ...payload,
                //     ...user,
                //     ...metadata,
                // })));
                const data = {
                    ...payload,
                    ...user,
                    ...metadata,
                    redirect: false
                };

                const { response, error } = await withAsync(() => actions.signUp(serialize(data)));

                nextStep();
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
                className="flex flex-col flex-1 sm:flex-initial justify-center gap-4"
                ref={formRef}
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
                            <FormLabel>State</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="e.g. New York" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {states.map(states => (
                                        <SelectItem key={states.abbreviation} value={states.name}>{states.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="is_over_18_and_agrees_tc"
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

                <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                        <FormItem className="flex justify-center w-full z-[99999]">
                            <FormControl>
                                <HCaptcha
                                    sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                                    onVerify={(token) => field.onChange(token)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    className="mt-auto sm:mt-0"
                    type="submit"
                    disabled={!form.watch("is_over_18_and_agrees_tc") || !!!form.watch("token")}
                >
                    Sign Up
                </Button>
            </form>
        </Form>
    )
}
