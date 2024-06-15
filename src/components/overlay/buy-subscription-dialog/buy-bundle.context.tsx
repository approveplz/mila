"use client";

import { useStepper } from "@/hooks";
import { contextFactory } from "@/utils";

type BuyBundleContextValues = Pick<ReturnType<typeof useStepper>, "step" | "nextStep">;

const [useBuyBundleContext, BuyBundleContext] = contextFactory<BuyBundleContextValues>();

const BuyBundleProvider = ({ children }: { children: React.ReactNode }) => {
    const { step, nextStep } = useStepper(1);

    return (
        <BuyBundleContext.Provider
            value={{
                step,
                nextStep
            }}
        >
            {children}
        </BuyBundleContext.Provider>
    )
}

export { useBuyBundleContext, BuyBundleProvider };