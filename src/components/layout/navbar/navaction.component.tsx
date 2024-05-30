"use client";

import { authSignOut } from "@/actions";
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components";
import { Session } from "next-auth";
import {
    HiOutlineGift,
    HiUserCircle,
    HiMiniArrowRightOnRectangle
} from "react-icons/hi2";

export function NavAction({
    session
}: {
    session: Session | null
}) {
    console.log("session: ", session);
    
    return (
        <div className="flex items-center gap-4">
            <Button variant="fatal">
                <HiOutlineGift className="h-4 w-4 mr-2" />
                Your entries: {session?.user?.user?.metadata.total_entries_count || 0}
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button>
                        <HiUserCircle className="h-12 w-12" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-20 z-[9999]">
                    <DropdownMenuItem>
                        <form action={authSignOut}>
                            <button className="flex">
                                <HiMiniArrowRightOnRectangle className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
