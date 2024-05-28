import * as React from "react";
import { Button } from "@/components";

export function StepperAction({
    isValid,
    isLoading,
    onBack,
    onNext,
    showBack
}: {
    isValid: () => Promise<boolean>
    isLoading: boolean,
    showBack: boolean,
    onNext: () => void,
    onBack: () => void
}) {
    const handleNext = async () => {
        if (!(await isValid())) return
        onNext();
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-4 [&>*]:flex-1 w-full max-w-[346px]">
                {showBack && (
                    <Button
                        variant="primary-outline"
                        full
                        onClick={onBack}
                    >
                        Back
                    </Button>
                )}
                <Button
                    full
                    onClick={handleNext}
                    type="button"
                >
                    Next
                </Button>
            </div>

            <p className="mt-[30px] text-sm italic">Entries applied to via this link will not show on your account</p>
        </div>
    )
}
