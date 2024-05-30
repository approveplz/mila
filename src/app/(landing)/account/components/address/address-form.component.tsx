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
    Textarea,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components";
import { useFormState } from "react-dom";
import { WarningCircle } from "@phosphor-icons/react";
import { AddressFormData, AddressSchema } from "./address.schema";
import { useEffect } from "react";
import states from "@/data/state.data.json" with { type: "json" };

export function AddressForm() {
    const [result, formAction] = useFormState(actions.authSignIn, {
        status: 'idle',
        error: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const formRef = React.useRef<HTMLFormElement>(null);

    const form = useForm<AddressFormData>({
        mode: "onTouched",
        resolver: zodResolver(AddressSchema)
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
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="address">Address</FormLabel>
                            <FormControl>
                                <Input
                                    id="address"
                                    placeholder="123, My street"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="city">City</FormLabel>
                            <FormControl>
                                <Input
                                    id="city"
                                    placeholder="Kingston"
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
                                        <SelectItem key={states.abbreviation} value={states.abbreviation}>{states.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="postCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="postCode">Post COde</FormLabel>
                            <FormControl>
                                <Input
                                    id="postCode"
                                    placeholder="12401"
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
