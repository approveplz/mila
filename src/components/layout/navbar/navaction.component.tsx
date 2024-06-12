"use client";

import { authSignOut } from "@/actions";
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components";
import { useCurrentSession } from "@/hooks";
import { useAuthStore, useCheckOutStore } from "@/store";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    HiOutlineGift,
    HiUserCircle,
    HiMiniArrowRightOnRectangle,
    HiOutlineUserCircle
} from "react-icons/hi2";

export function NavAction({ session }: { session: Session | null }) {
    // const { session } = useCurrentSession();
    const router = useRouter();
    const { user } = useAuthStore();
    const { setAccountTab } = useCheckOutStore();

    function handleSignOut() {
        signOut({ redirect: true });
    }

    const navigateToEntries = () => {
        setAccountTab('entries');
        router.push('/account');
    }

    return (
        <div className="flex items-center gap-4">
            <Button onClick={() => navigateToEntries()} variant="fatal">
                <HiOutlineGift className="h-4 w-4 mr-2" />
                Your entries: {session?.user?.user?.metadata?.total_entries_count || 0}
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button>
                        <HiUserCircle className="h-12 w-12" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-20 z-[9999]">
                    <DropdownMenuItem onClick={() => {
                        setAccountTab('info');
                        router.push('/account');
                    }}>
                        <button className="flex">
                            <HiOutlineUserCircle className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                        <button className="flex">
                            <HiMiniArrowRightOnRectangle className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
