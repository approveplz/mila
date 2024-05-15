import React from "react";
import Image from "next/image"
import Link from "next/link";
import { Button, Container } from "@/components";
import { auth } from "@/auth";
import { NavList } from "./navlist.component";
import { NavAction } from "./navaction.component";

export async function NavBar() {
    const session = await auth();

    return (
        <nav className="py-[21px] bg-[#F3F3F3]">
            <Container>
                <div className="flex justify-between">
                    <NavList />

                    <div className="relative h-12 w-[234px]">
                        <Image src="/images/logo-fatal.svg" alt="logo" fill />
                    </div>

                    {session ? (
                        <NavAction />
                    ) : (
                        <div className="flex gap-4">
                            {/* <Button asChild>
                                <Link href="/signup">Sign Up</Link>
                            </Button> */}
                            <Button>
                                Sign Up
                            </Button>
                            <Button variant="primary-outline" asChild>
                                <Link href="/signin">Sign In</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </nav>
    )
}