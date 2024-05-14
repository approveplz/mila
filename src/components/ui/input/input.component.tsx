import * as React from "react";
import { cn } from "@/utils";
import { VariantProps, cva } from "class-variance-authority";

const inputClasses = cva("flex h-11 w-full border shadow-sm border-[#D1D5DB] bg-white p-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted placeholder:text-sm placeholder:font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", {
    variants: {
        rounded: {
            full: "rounded-full",
            md: "rounded-md"
        }
    },
    defaultVariants: {
        rounded: "full"
    }
})

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputClasses>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(inputClasses({ className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
