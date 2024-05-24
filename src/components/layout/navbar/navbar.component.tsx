import * as React from "react";
import { Container } from "@/components";
import { NavContent } from "./navcontent.component";
import { auth } from "@/auth";

export async function NavBar() {
    const session = await auth();
    
    return (
        <nav className="py-[21px] bg-[#F3F3F3] fixed w-full min-h-[92px] z-[99]">
            <Container>
                <NavContent session={session} />
            </Container>
        </nav>
    )
}