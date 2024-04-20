import * as React from 'react';

export function Container({ children }: React.PropsWithChildren) {
    return (
        <div className="px-6 container lg:px-0 lg:mx-auto">{children}</div>
    )
}
