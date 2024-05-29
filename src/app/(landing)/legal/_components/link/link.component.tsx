import * as React from "react";
import { cn } from "@/utils";

export function Link({ className, ...props }: React.ComponentPropsWithoutRef<"a">) {
    return (
        <a
            className={cn("text-primary font-medium", className)}
            target="_blank"
            {...props} />
    )
}
