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
import { Session } from "next-auth";
import { GetProfileResponse } from "@/api/auth/auth.types";
import { updateProfileDetails } from "@/api/auth";
import states from "@/data/state.data.json" with { type: "json" };
import { toast } from "sonner"
import { HiXMark } from "react-icons/hi2";

interface BasicInfoFormProps {
    session: Session | null;
    profileDetail: GetProfileResponse | undefined;
    refetch: () => void
}

export function AddressForm({ session, profileDetail, refetch }: BasicInfoFormProps) {
    const [result, formAction] = useFormState(actions.authSignIn, {
        status: 'idle',
        error: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const formRef = React.useRef<HTMLFormElement>(null);

    const form = useForm<AddressFormData>({
        mode: "onTouched",
        resolver: zodResolver(AddressSchema),
        values: {
            address: profileDetail?.address?.line_1 as string,
            city: profileDetail?.address?.city as string,
            state: profileDetail?.address?.region as string,
            postCode: profileDetail?.address?.postal_code as string

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

                    form.handleSubmit(async (data) => {
                        setIsLoading(true);
                        updateProfileDetails(session?.user?.user?.id as string, {
                            first_name: profileDetail?.first_name,
                            last_name: profileDetail?.last_name,
                            full_name: profileDetail?.full_name,
                            address: {
                                line_1: data?.address,
                                line_2: data?.address,
                                city: data?.city,
                                region: data?.state,
                                postal_code: data?.postCode
                            }
                        }).then(res => {
                            toast("Information Updated", {
                                action: {
                                    // label: <HiXMark size={20} color="black" />,
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
                            <Select onValueChange={field.onChange} value={field.value} >
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
                            <FormLabel htmlFor="postCode">Post Code</FormLabel>
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


                <Button className="w-fit sm:w-[65px] py-2 px-4" type="submit" disabled={isLoading}>Save</Button>
            </form>
        </Form>
    )
}
