"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { AmoeStepType } from "../../amoe-drawer.type";

export function CaptchaStep({}: AmoeStepType) {
    return (
        <div>
            <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                onVerify={(token) => {}}
            />
        </div>
    )
}
