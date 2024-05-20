import * as React from "react";
import { cn } from "@/utils";
import { VariantProps, cva } from "class-variance-authority";

const centralizedContentClasses = cva("flex h-screen", {
    variants: {
        centralized: {
            h: "items-center",
            v: "justify-center",
            hv: "items-center justify-center"
        }
    },
    defaultVariants: {
        centralized: "hv"
    }
})


type Props = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof centralizedContentClasses>;

export function CentralizedContent({ className, centralized, ...props }: Props) {
    return (
        <div
            className={cn(centralizedContentClasses({ centralized, className }))}
            {...props}
        />
    )
}
