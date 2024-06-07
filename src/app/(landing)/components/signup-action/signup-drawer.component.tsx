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

export function SignupDrawerWrapper({ children }: React.PropsWithChildren) {
    const router = useRouter();
    const { retrieveSession } = useAuthContext();

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
                <Button variant="fatal">
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
