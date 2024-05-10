import * as React from "react";

export function Container({ children }: React.PropsWithChildren) {
    return (
        // <div className="px-6 md:container md:mx-auto">{children}</div>
        <div className="px-6 md:container md:mx-auto">{children}</div>
    )
}