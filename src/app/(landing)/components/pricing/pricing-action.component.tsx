"use client";

import { useCheckOutStore } from "@/store";
import * as React from "react";

export function PricingAction({ children }: React.PropsWithChildren) {
    const { products: selectedProducts } = useCheckOutStore();

    return (
        <div>
            {selectedProducts.length > 0 && (
                <>
                    {children}
                </>
            )}
        </div>
    )
}
