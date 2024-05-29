import { cn } from "@/utils";
import * as React from "react";

export function Container({ className, children }: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("container mx-auto max-w-[902px] py-[25px] sm:py-16 px-6 sm:px-0", className)}>{children}</div>
    )
}