import * as React from "react";
import { SignupDrawerWrapper } from "./signup-drawer.component";
import { SignUpDrawer } from "@/components";

export function SignUpAction() {
    return (
        <SignupDrawerWrapper>
            <SignUpDrawer />
        </SignupDrawerWrapper>
    )
}