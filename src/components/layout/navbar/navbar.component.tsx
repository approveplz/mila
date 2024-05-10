import React from "react";
import Image from "next/image"
import { Button, Container, SignInDialog } from "@/components";
import { NavList } from "./navlist.component";

export function NavBar() {
    return (
        <nav className="py-[21px] bg-[#F3F3F3]">
            <Container>
                <div className="flex justify-between">
                    <NavList />

                    <div className="relative h-10 w-[234px]">
                        <Image src="/images/logo-black.svg" alt="logo" fill />
                    </div>

                    <div className="flex gap-4">
                        <Button>Sign Up</Button>
                        <SignInDialog triggerComponent={<Button variant="primary-outline">Sign In</Button>} />
                        {/* <Button variant="primary-outline">Sign In</Button> */}
                    </div>
                </div>
            </Container>
        </nav>
    )
}