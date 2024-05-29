import * as React from "react";
import { cn } from "@/utils";
import { VariantProps, cva } from "class-variance-authority";

const centralizedContentClasses = cva("flex", {
    variants: {
        centralized: {
            h: "items-center",
            v: "justify-center",
            hv: "items-center justify-center"
        },
        fullHeight: {
            true: "h-screen",
            false: "h-auto"
        }
    },
    defaultVariants: {
        centralized: "hv",
        fullHeight: true
    }
})


type Props = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof centralizedContentClasses> & {
    as?: React.ElementType;
};

export function CentralizedContent({ as: Component = "div", className, centralized, fullHeight, ...props }: Props) {
    return (
        <Component
            className={cn(centralizedContentClasses({ centralized, fullHeight, className }))}
            {...props}
        />
    )
}
