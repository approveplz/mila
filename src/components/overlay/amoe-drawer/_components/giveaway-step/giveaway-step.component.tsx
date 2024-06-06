import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components";
import { AmoeStepType } from "../../amoe-drawer.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkEligibility, listUpcomingGiveaways } from "@/api/amoes";
import { useFormContext } from "react-hook-form";
import { AMOEFormData } from "../stepper-form/stepper-form.schema";
import { withAsync } from "@/utils";
import { CheckEligibilityPayload } from "@/api/amoes/amoe.types";

export function GiveawayStep({ actions }: AmoeStepType) {
    const { control, trigger, setValue } = useFormContext<AMOEFormData>();
    const { data: giveAwaysData } = useQuery({
        queryKey: ["ListUpcomingGiveaways"],
        queryFn: async () => await listUpcomingGiveaways(),
    });

    // const { mutateAsync } = useMutation({
    //     mutationFn: (payload: CheckEligibilityPayload) => checkEligibility(payload),
    //     onSuccess(data, variables, context) {
    //         console.log("success: ", { data, variables, context })
    //     },
    //     onError(error, variables, context) {
    //         console.log("error: ", { error, variables, context })
    //     },
    // })

    const isValid = async () => {
        const { response: valid } = await withAsync(() => trigger("giveaway.id"));

        return valid as boolean;
    };

    const giveAways = giveAwaysData?.results || [];

    return (
        <div className="flex flex-col gap-12">
            <p className="font-bold text-center">Select the Giveaway you wish</p>

            <FormField
                control={control}
                name="giveaway.id"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Select Giveaway</FormLabel>
                        <Select
                            onValueChange={val => {
                                setValue("giveaway.title", giveAways.find(giveAway => giveAway.id === val)?.prize || "")
                                field.onChange(val);
                            }}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a Giveaway" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {giveAways.map(giveAway => (
                                    <SelectItem key={giveAway.id} value={giveAway.id}>{giveAway.prize}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />


            {actions && actions(isValid, false)}
        </div>
    )
}
