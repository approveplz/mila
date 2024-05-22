"use client";

import { authSignOut } from "@/actions";
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components";
import { signOut } from "next-auth/react";
import {
    HiOutlineGift,
    HiUserCircle,
    HiMiniArrowRightOnRectangle
} from "react-icons/hi2";

export function NavAction() {
    return (
        <div className="flex items-center gap-4">
            <Button variant="fatal">
                <HiOutlineGift className="h-4 w-4 mr-2" />
                Your entries: 53
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button>
                        <HiUserCircle className="h-12 w-12" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-20 z-[9999]">
                    <DropdownMenuItem onClick={() => signOut()}>
                        <HiMiniArrowRightOnRectangle className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
