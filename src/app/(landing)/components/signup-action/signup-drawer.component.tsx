"use client";

import * as React from "react";
import {
    Button,
    Drawer,
    DrawerContent,
    DrawerTrigger
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
        console.log('in GTM event')
        sendGTMEvent({ event: 'begin_checkout', value: { checkout_total: totalAmount,  }  })
    }

    return (
        <Drawer
            dismissible={false}
            nested={true}
            onClose={() => {
                retrieveSession()
                window.location.reload();
            }}
        >
            <DrawerTrigger asChild>
                <Button onClick={triggerGTMEvent} variant="fatal">
                    <span className="select-none" >Continue With Selected </span>
                    <HiArrowUpRight className="ml-3 h-6 w-4" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-white h-full rounded-none z-[9999] max-h-screen">
                {children}
            </DrawerContent>
        </Drawer>
    )
}
