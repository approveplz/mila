import * as React from "react";
import { AmoeStepType } from "../../amoe-drawer.type";
import { useFormContext } from "react-hook-form";
import { AMOEFormData } from "../stepper-form/stepper-form.schema";
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

export function FinishStep({ actions }: AmoeStepType) {
    const { control, trigger, getValues } = useFormContext<AMOEFormData>();

    const isValid = async () => {
        return false;
    }

    return (
        <div className="flex flex-col gap-12 items-center">
            <p className="text-center font-bold">Summary</p>

            <div>
                <div className="flex flex-col gap-2 text-center font-medium">
                    <p>First Name: John</p>
                    <p>Last Name: Doe</p>
                    <p>Email Address: JohnDoe@gmail.com</p>
                    <p>Phone: (555) 555-1234</p>
                    <p>Selected Giveaway: Giveaway 3</p>
                    <p>Address: 132, My Street, Kingston, New York, 12401</p>
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

            {actions && actions(isValid, false)}
        </div>
    )
}
