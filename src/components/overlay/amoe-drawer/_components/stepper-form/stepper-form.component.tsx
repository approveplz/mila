import * as React from "react";
import { CentralizedContent, Form } from "@/components";
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
            region: "",
            city: "",
            postal_code: "",
            is_over_18_and_agrees_tc: false,
        }
    });

    return (
        <Form {...form}>
            <CentralizedContent as="form" centralized="v" fullHeight={false} className="mt-24">
                {children}
            </CentralizedContent>
        </Form>
    )
}
