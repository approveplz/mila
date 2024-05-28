"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { AmoeStepType } from "../../amoe-drawer.type";
import { useFormContext } from "react-hook-form";
import { AMOEFormData } from "../stepper-form/stepper-form.schema";
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage
} from "@/components";
import { withAsync } from "@/utils";

export function CaptchaStep({ actions }: AmoeStepType) {
    const { control, trigger } = useFormContext<AMOEFormData>();

    const isValid = async () => {
        const { response: valid } = await withAsync(() => trigger("token"));

        return valid as boolean;
    };

    return (
        <div className="flex flex-col gap-12 items-center">
            <FormField
                control={control}
                name="token"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <HCaptcha
                                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                                onVerify={(token) => field.onChange(token)}
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
