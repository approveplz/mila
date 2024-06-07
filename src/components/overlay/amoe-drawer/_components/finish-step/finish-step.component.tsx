import * as React from "react";
import { AmoeStepType } from "../../amoe-drawer.type";
import { useFormContext } from "react-hook-form";
import { AMOEFormData } from "../stepper-form/stepper-form.schema";
import {
    Button,
    Checkbox,
    DrawerClose,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@/components";
import { withAsync } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { createAMOE } from "@/api/amoes";
import { CreateAMOEPayload } from "@/api/amoes/amoe.types";
import { PatternFormat } from "react-number-format";
import Link from "next/link";

export function FinishStep({ actions }: AmoeStepType) {
    const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
    const { control, trigger, getValues } = useFormContext<AMOEFormData>();
    const values = getValues();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: CreateAMOEPayload) => createAMOE(payload),
        onSuccess(data, variables, context) {
            console.log("success: ", { data, variables, context })
        },
        onError(error, variables, context) {
            console.log("error: ", { error, variables, context })
        },
    });

    const isValid = async () => {
        const { response: valid } = await withAsync(() => trigger(["is_over_18_and_agrees_tc"]));

        if (valid) {
            const {
                giveaway,
                email,
                first_name,
                last_name,
                phone,
                line_1,
                region,
                city,
                postal_code,
                is_over_18_and_agrees_tc
            } = getValues();

            const { response } = await withAsync(() => mutateAsync({
                giveaway: giveaway.id,
                secret: process.env.NEXT_PUBLIC_API_SECRET!,
                is_over_18_and_agrees_tc,
                user: {
                    email,
                    first_name,
                    last_name,
                    phone: `1 ${phone}`,
                },
                address: {
                    line_1,
                    line_2: "",
                    region,
                    city,
                    postal_code,
                    country: "USA",
                }
            }))

            if (response) {
                closeButtonRef.current?.click()
            }
        }

        return false;
    }

    return (
        <div className="flex flex-col gap-12 items-center">
            <p className="text-center font-bold">Summary</p>

            <div>
                <div className="flex flex-col gap-2 text-center font-medium">
                    <p>First Name: {values.first_name}</p>
                    <p>Last Name: {values.last_name}</p>
                    <p>Email Address: {values.email}</p>
                    <p>
                        Phone: {" "}
                        <PatternFormat
                            displayType="text"
                            format="+1 (###)-###-####"
                            allowEmptyFormatting
                            mask="_"
                            value={values.phone}
                        />
                    </p>
                    <p>Selected Giveaway: {values.giveaway.title}</p>
                    <p>Address: {values.line_1}, {values.city}, {values.region}, {values.postal_code}</p>
                </div>

                <FormField
                    control={control}
                    name="is_over_18_and_agrees_tc"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0 mt-6">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel>
                                I am over 18 and I agree to {" "}
                                <Link href="/legal/terms-of-use" target="_blank" className="underline">Terms of Use</Link>, {" "}
                                <Link href="/legal/privacy-policy" target="_blank" className="underline">Privacy Policy</Link><br /> and {" "}
                                <Link href="/legal/sweeps-rules" target="_blank" className="underline">Sweeps Rules</Link>
                            </FormLabel>
                        </FormItem>
                    )}
                />
            </div>

            <DrawerClose className="w-full hidden">
                <button type="button" ref={closeButtonRef}>Home</button>
            </DrawerClose>

            {actions && actions(isValid, isPending)}
        </div>
    )
}
