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

export function FinishStep({ actions }: AmoeStepType) {
    const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
    const { control, trigger, getValues } = useFormContext<AMOEFormData>();
    const values = getValues();

    const { mutateAsync } = useMutation({
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
                giveaway,
                secret: "F83C63FEB5E3E6768D86281E2B2F7",
                is_over_18_and_agrees_tc,
                user: {
                    email,
                    first_name,
                    last_name,
                    phone,
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
                    <p>Phone: {values.phone}</p>
                    <p>Selected Giveaway: {values.giveaway}</p>
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
                            <FormLabel>I am over 18 and I agree to Terms of Use, Privacy Policy <br /> and Sweeps Rules</FormLabel>
                        </FormItem>
                    )}
                />
            </div>

            <DrawerClose className="w-full">
                <button className="opacity-0" ref={closeButtonRef}>Home</button>
            </DrawerClose>

            {actions && actions(isValid, false)}
        </div>
    )
}
