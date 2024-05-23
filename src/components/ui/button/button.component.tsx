import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-base font-normal ring-offset-background border px-6 py-3 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                // primary: "bg-primary text-primary-foreground",
                // accent: "bg-accent text-white border-accent",
                // "ghost-dark": "text-primary-800 border-primary-800 font-medium leading-5 text-sm hover:bg-primary-800 hover:text-white",
                // "ghost-light": "text-primary-600 border-primary-600 font-medium leading-5 text-sm hover:bg-primary-600 hover:text-white",
                // link: "text-primary-800 underline-offset-4 border-none",
                primary: "bg-[#B06E6A] border-[#B06E6A] text-white",
                "primary-outline": "border-[#171614] text-[#171614] hover:bg-[#B06E6A] hover:border-[#B06E6A] hover:text-white",
                secondary: "bg-white border-white text-[#171614]",
                "secondary-outline": "border-white text-white hover:bg-white hover:border-white hover:text-[#171614]",
                fatal: "bg-fatal text-white",
                "fatal-outline": "bg-transparent text-fatal border-fatal hover:bg-fatal hover:text-white",
                tertiary:"bg-transparent border-[#171614] text-[#171614]"

            },
            full: {
                true: "w-full",
                false: "w-auto"
            }
        },
        defaultVariants: {
            variant: "primary",
            full: false
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, full, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, full, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }