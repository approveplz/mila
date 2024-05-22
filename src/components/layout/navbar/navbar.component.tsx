import * as React from "react";
import { Container } from "@/components";
import { NavContent } from "./navcontent.component";

export function NavBar() {
    return (
        <nav className="py-[21px] bg-[#F3F3F3] fixed w-full min-h-[92px] z-[999]">
            <Container>
                <NavContent />
            </Container>
        </nav>
    )
}