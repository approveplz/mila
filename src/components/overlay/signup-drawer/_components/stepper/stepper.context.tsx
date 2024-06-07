"use client";

import { useStepper } from "@/hooks";
import { contextFactory } from "@/utils";

type StepperContextValues = Pick<ReturnType<typeof useStepper>, "step" | "nextStep">;

const [useStepperContext, StepperContext] = contextFactory<StepperContextValues>();

const StepperProvider = ({ children }: { children: React.ReactNode }) => {
    const { step, nextStep } = useStepper(1);

    return (
        <StepperContext.Provider
            value={{
                step,
                nextStep
            }}
        >
            {children}
        </StepperContext.Provider>
    )
}

export { useStepperContext, StepperProvider };