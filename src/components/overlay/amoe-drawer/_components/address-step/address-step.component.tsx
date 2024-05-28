import * as React from "react"
import { useFormContext } from "react-hook-form";
import { AMOEFormData } from "../stepper-form/stepper-form.schema";
import { AmoeStepType } from "../../amoe-drawer.type";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from "@/components";
import states from "@/data/state.data.json" with { type: "json" };

export function AddressStep({ actions }: AmoeStepType) {
    const { control, trigger, getValues } = useFormContext<AMOEFormData>();

    const isValid = async () => {
        return false;
    }

    return (
        <div className="flex flex-col gap-12">
            <p className="text-center font-bold">Enter your Address</p>

            <div className="max-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="address">Address</FormLabel>
                                <FormControl>
                                    <Input
                                        id="address"
                                        placeholder="New York 12401"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="region"
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <FormField
                        control={control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="city">City</FormLabel>
                                <FormControl>
                                    <Input
                                        id="city"
                                        placeholder="New York"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="postal_code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="postal_code">Post code</FormLabel>
                                <FormControl>
                                    <Input
                                        id="postal_code"
                                        placeholder="12401"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            {actions && actions(isValid, false)}
        </div>
    )
}
