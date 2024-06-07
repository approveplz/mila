"use client"

import * as React from "react";
import { StepperProvider } from "./stepper.context";
import { StepperMain } from "./stepper-desktop.meta";
import { StepperMobile } from "./stepper-mobile.meta";
import { useWidth } from "@/hooks";
import { Session } from "next-auth";

function Stepper({
    session
}: {
    session: Session | null
}) {
    const { width } = useWidth()

    return (
        <StepperProvider>
            {width < 640 ? (
                <StepperMobile session={session} />
            ) : (
                <div className="overflow-auto py-3 tall:overflow-hidden tall:py-0 max-h-screen">
                    <StepperMain session={session} />
                </div>
            )}
        </StepperProvider>
    )
}

export default Stepper;