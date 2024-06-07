import { cn } from "@/utils";
import * as React from "react";

// Tailwind md:container md:mx-auto
// Custom mid [1312px] lg [1440]
// Stable mx-auto max-w-[1312px] px-4 sm:px-6 lg:px-8
export function Container({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("container mx-auto max-w-[1312px] px-4 2xl:px-0", className)}>{children}</div>
    )
}