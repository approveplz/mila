import * as React from "react";
import { SignupDrawerWrapper } from "./signup-drawer.component";
import { SignUpDrawer } from "@/components";
import { Session } from "next-auth";

export function SignUpAction({ session }: { session: Session | null }) {
    return (
        <SignupDrawerWrapper session={session}>
            <SignUpDrawer />
        </SignupDrawerWrapper>
    )
}