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

export function PersonalStep({ actions }: AmoeStepType) {
    const form = useFormContext();

    const isValid = () => Promise.reject(false);

    return (
        <div className="flex flex-col gap-12">
            <p>Verify your Email Address</p>

            <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="email">First Name</FormLabel>
                        <FormControl>
                            <Input
                                id="email"
                                placeholder="e.g.John"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="email">Last Name</FormLabel>
                        <FormControl>
                            <Input
                                id="email"
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
