"use client";

import * as React from "react";
import {
    Button,
    Drawer,
    DrawerContent,
    DrawerTrigger
} from "@/components";
import { HiArrowUpRight } from "react-icons/hi2";

export function SignupDrawerWrapper({ children }: React.PropsWithChildren) {
    return (
        <Drawer dismissible={false} modal={false}>
            <DrawerTrigger asChild>
                <Button variant="fatal">
                    Continue With Selected
                    <HiArrowUpRight className="ml-3 h-6 w-4" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-white h-full rounded-none z-[9999]">
                {children}
            </DrawerContent>
        </Drawer>
    )
}
