import * as React from "react";
import { Container } from "@/components";
import { NavContent } from "./navcontent.component";
import { NavBanner } from "./banner.component";

export function NavBar() {
    return (
        <div className="flex flex-col-reverse sm:flex-col fixed w-full z-[999]">
            <NavBanner />
            <nav className="py-[21px] bg-[#F3F3F3] min-h-[92px]">
                <Container>
                    <NavContent />
                </Container>
            </nav>
        </div>
    )
}