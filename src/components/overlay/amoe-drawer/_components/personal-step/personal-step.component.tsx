import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from "@/components";
import { AmoeStepType } from "../../amoe-drawer.type";
import { AMOEFormData } from "../stepper-form/stepper-form.schema";
import { withAsync } from "@/utils";

export function PersonalStep({ actions }: AmoeStepType) {
    const { control, trigger } = useFormContext<AMOEFormData>();

    const isValid = async () => {
        const { response: valid } = await withAsync(() => trigger(["first_name", "last_name"]));

        return valid as boolean
    };

    return (
        <div className="flex flex-col gap-12">
            <p className="text-center font-bold">Enter your Name</p>

            <FormField
                control={control}
                name="first_name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="first_name">First Name</FormLabel>
                        <FormControl>
                            <Input
                                id="first_name"
                                placeholder="e.g.John"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="last_name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="last_name">Last Name</FormLabel>
                        <FormControl>
                            <Input
                                id="last_name"
                                placeholder="e.g.Doe"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {actions && actions(isValid, false)}
        </div>
    )
}
