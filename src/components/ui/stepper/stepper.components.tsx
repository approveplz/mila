import { cn } from "@/utils";
import * as React from "react";

// className="w-[896px]"
type StepperProps =  React.InputHTMLAttributes<HTMLElement> & {
    activeStep: number
};

const Stepper = React.forwardRef<HTMLElement, StepperProps>(({ className, children, activeStep = 1, ...props }, ref) => {
    return (
        <nav
            aria-label="Progress"
            className={cn(className)}
            {...props}
        >
            <p className="text-lg text-center font-semibold mb-4">{activeStep} of {React.Children.count(children)}</p>

            <ul className="flex gap-4">
                {children}
            </ul>
        </nav>
    )
});
Stepper.displayName = "Stepper";

const Step = React.forwardRef<HTMLLIElement, React.InputHTMLAttributes<HTMLLIElement>>(({ className, ...props }, ref) => {
    return (
        <li
            className={cn("border-t-4 flex-1 border-fatal pt-3 text-xs text-muted font-medium", className)}
            {...props}
        />
    )
});
Step.displayName = "Step";

export { Stepper, Step }