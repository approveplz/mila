import { cn } from "@/utils";
import * as React from "react";

// <div className="px-6 md:container md:mx-auto">{children}</div>
export function Container({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("mx-auto max-w-[1312px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>
    )
}