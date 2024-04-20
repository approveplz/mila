import * as React from 'react';

export function Container({ children }: React.PropsWithChildren) {
    return (
        <div className="px-6 container mx-auto">{children}</div>
    )
}
