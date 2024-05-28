import * as React from "react";
import { Form } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { amoeSchema, AMOEFormData } from "./stepper-form.schema";

export function StepperForm({ children }: React.PropsWithChildren) {
    const form = useForm<AMOEFormData>({
        mode: "all",
        resolver: zodResolver(amoeSchema),
        defaultValues: {
            token: "",
            giveaway: "",
            email: "",
            phone: "",
            first_name: "",
            last_name: "",
            address: "",
            state: "",
            city: "",
            post_code: "",
            is_over_18: false,
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => { })}>
                {children}
            </form>
        </Form>
    )
}
