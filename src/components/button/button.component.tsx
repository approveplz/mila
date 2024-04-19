import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background border px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "bg-primary text-primary-foreground",
                "ghost-dark": "text-primary-800 border-primary-800 font-medium leading-5 text-sm hover:bg-primary-800 hover:text-white"
                // destructive:
                //     "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                // outline:
                //     "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                // secondary:
                //     "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                // ghost: "hover:bg-accent hover:text-accent-foreground",
                // link: "text-primary underline-offset-4 hover:underline",
            },
        },
        defaultVariants: {
            variant: "primary"
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
