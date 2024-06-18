"use client";

import * as React from "react";
import {
    Button,
    Drawer,
    DrawerContent,
    DrawerTrigger,
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components";
import { HiArrowUpRight } from "react-icons/hi2";
import { useAuthContext } from "@/components/provider/auth/auth.component";
import { useRouter } from "next/navigation";
import useTotalAmount from "@/hooks/useTotalAmount";
import { sendGTMEvent } from '@next/third-parties/google'


export function SignupDrawerWrapper({ children }: React.PropsWithChildren) {
    const router = useRouter();
    const { retrieveSession } = useAuthContext();
    const { totalAmount } = useTotalAmount();

    const triggerGTMEvent = () => {
        sendGTMEvent(
            { event: 'begin_checkout', value: { checkout_total: totalAmount, currency: 'USD' } })
    }

    return (
        // <Drawer
        //     dismissible={false}
        //     nested={true}
        //     onClose={() => {
        //         retrieveSession()
        //         window.location.reload();
        //     }}
        // >
        //     <DrawerTrigger asChild>
        //         <Button onClick={triggerGTMEvent} variant="fatal">
        //             <span className="select-none" >Continue With Selected </span>
        //             <HiArrowUpRight className="ml-3 h-6 w-4" />
        //         </Button>
        //     </DrawerTrigger>
        //     <DrawerContent className="bg-white h-full rounded-none z-[9999] max-h-screen">
        //         {children}
        //     </DrawerContent>
        // </Drawer>
        <Sheet
            onOpenChange={state => {
                if (state === false) {
                    retrieveSession()
                    window.location.reload();
                }
            }}
        >
            <SheetTrigger asChild>
                <Button onClick={triggerGTMEvent} variant="fatal">
                    <span className="select-none">Continue With Selected</span>
                    <HiArrowUpRight className="ml-3 h-6 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="z-[9999] max-h-screen">
                {children}
            </SheetContent>
        </Sheet>
    )
}
