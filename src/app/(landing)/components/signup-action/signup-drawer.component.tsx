"use client";

import * as React from "react";
import {
    Button,
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components";
import { HiArrowUpRight } from "react-icons/hi2";
import { useAuthContext } from "@/components/provider/auth/auth.component";
import useTotalAmount from "@/hooks/useTotalAmount";
import { sendGTMEvent } from '@next/third-parties/google'
import { Session } from "next-auth";

export function SignupDrawerWrapper({ session, children }: { session: Session | null } & React.PropsWithChildren) {
    const { retrieveSession } = useAuthContext();
    const { totalAmount } = useTotalAmount();

    const triggerGTMEvent = () => {
        sendGTMEvent({
            event: 'begin_checkout', value: { checkout_total: totalAmount, currency: 'USD' }
        })
    }

    return (
        <Sheet
            onOpenChange={state => {
                if (state === false) {
                    retrieveSession()
                    window.location.reload();
                }
            }}
        >
            <SheetTrigger asChild>
                {!!!session && (
                    <Button onClick={triggerGTMEvent} variant="fatal">
                        <span className="select-none">Continue With Selected</span>
                        <HiArrowUpRight className="ml-3 h-6 w-4" />
                    </Button>
                )}
            </SheetTrigger>
            <SheetContent side="bottom" className="z-[9999] max-h-screen">
                {children}
            </SheetContent>
        </Sheet>
    )
}
