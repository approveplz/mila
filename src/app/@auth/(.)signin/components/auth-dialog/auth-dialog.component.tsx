"use client";

import { Dialog } from "@/components";
import { useRouter } from "next/navigation";

export function AuthDialog({ children }: React.PropsWithChildren) {
    const router = useRouter();

    return (
        <Dialog open={true} onOpenChange={open => {
            if (!open) router.back()
        }}>
            {children}
        </Dialog>
    )
}
