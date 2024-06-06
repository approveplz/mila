import * as React from "react";
import { cn } from "@/utils";

type StepperProps = React.InputHTMLAttributes<HTMLElement> & {
    activeStep: number
    activeTitle: string
};

const Stepper = React.forwardRef<HTMLElement, StepperProps>(({ className, children, activeStep = 1, activeTitle, ...props }, ref) => {
    return (
        <nav
            aria-label="Progress"
            className={cn(className)}
            ref={ref}
            {...props}
        >
            <p className="text-lg text-center font-semibold mb-4">{activeStep} of {React.Children.count(children)}</p>

            <ul data-title={activeTitle} className="relative flex gap-4 before:content-[attr(data-title)] before:sm:content-none before:absolute before:top-4 before:left-1/2 before:-translate-x-1/2 before:text-xs before:text-muted">
                {children}
            </ul>
        </nav>
    )
});
Stepper.displayName = "Stepper";

const Step = React.forwardRef<HTMLLIElement, React.InputHTMLAttributes<HTMLLIElement> & { active: boolean }>(({ className, active, ...props }, ref) => {
    return (
        <li
            data-name={props.children}
            className={cn("relative border-t-4 flex-1 pt-3 border-[#D1D5DB] text-xs", className, {
                "border-fatal": active
            })}
            ref={ref}
            {...props}
        >
            <span className="text-xs text-muted font-medium hidden sm:inline">{props.children}</span>
        </li>
    )
});
Step.displayName = "Step";

const StepLabel = React.forwardRef<HTMLSpanElement, React.InputHTMLAttributes<HTMLSpanElement>>(({ className, ...props }, ref) => {
    return (
        <span
            className={cn("text-xs text-muted font-medium hidden sm:inline", className)}
            ref={ref}
            {...props}
        />
    )
});
StepLabel.displayName = "StepLabel";

export { Stepper, Step, StepLabel }