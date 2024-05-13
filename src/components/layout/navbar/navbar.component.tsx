import React from "react";
import Image from "next/image"
import { Button, Container } from "@/components";
import { NavList } from "./navlist.component";
import Link from "next/link";
import { auth } from "@/auth";
import { authSignOut } from "@/actions";

export async function NavBar() {
    const session = await auth();
    console.log("session: ", session);

    return (
        <nav className="py-[21px] bg-[#F3F3F3]">
            <Container>
                <div className="flex justify-between">
                    <NavList />

                    <div className="relative h-10 w-[234px]">
                        <Image src="/images/logo-black.svg" alt="logo" fill />
                    </div>

                    {session ? (
                        <form action={authSignOut}>
                            <Button type="submit">Sign Out</Button>
                            {/* {JSON.stringify(session)} */}
                        </form>
                    ) : (
                        <div className="flex gap-4">
                            <Button>Sign Up</Button>
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