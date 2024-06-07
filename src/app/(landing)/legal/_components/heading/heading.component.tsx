import { cn } from "@/utils";
import * as React from "react";

export function Heading({ className, children }: React.ComponentPropsWithoutRef<"h1">) {
    return (
        <h1 className={cn("text-4xl sm:text-8xl font-tt-ramillas font-light text-center leading-10 sm:leading-[115.2px]", className)}>{children}</h1>
    )
}