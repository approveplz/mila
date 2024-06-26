"use client";

import * as React from "react";
import { NavList, NavListMobile } from "./navlist.component";
import { NavAction } from "./navaction.component";
import Image from "next/image"
import Link from "next/link";
import { Button } from "@/components";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { HiBars3, HiOutlineGift, HiXMark } from "react-icons/hi2";
import { Session } from "next-auth";
import Cookies from 'universal-cookie';
import { AUTH_CHECK_COOKIE } from "@/shared/constants/constants";
import { useSelectedLayoutSegment } from "next/navigation";
import { useAuthStore } from "@/store";
import { useAuthContext } from "@/components/provider/auth/auth.component";

const Accordion = AccordionPrimitive.Root;
const AccordionItem = AccordionPrimitive.Item;
const AccordionTrigger = AccordionPrimitive.Trigger;
const AccordionContent = AccordionPrimitive.Content;

const cookies = new Cookies(AUTH_CHECK_COOKIE, { path: '/' });

export function NavContent() {
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const activeSegment = useSelectedLayoutSegment();
    const { user } = useAuthStore();
    const { session } = useAuthContext();
    const [accordionValue, setAccordionValue] = React.useState<string>('')

    React.useEffect(() => {
        const cookieChangeListener = (params: unknown) => {
            console.log('The cookie ', params);
        }

        cookies.removeChangeListener(cookieChangeListener);

        return () => {
            cookies.removeChangeListener(cookieChangeListener);
        }
    }, []);

    return (
        <Accordion type="single" collapsible value={accordionValue} onValueChange={val => console.log(val)}>
            <AccordionItem value="nav">
                <div className="flex justify-between items-center">
                    <div className="relative h-12 w-[90px]">
                        <Link href="/">
                            <Image src="/images/logo-fatal.svg" alt="logo" fill />
                        </Link>
                    </div>
                    <NavList />

                    <div className="hidden sm:flex">
                        {session ? (
                            <NavAction session={session} />
                        ) : (
                            <div className="flex gap-4">
                                <Button asChild>
                                    <Link href="/#pricing">Sign Up</Link>
                                </Button>
                                <Button variant="primary-outline" asChild>
                                    <Link href="/signin">Sign In</Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-1 justify-end items-center sm:hidden">
                        {session && (
                            <Button variant="fatal" className="p-3 mr-3 max-h-10">
                                <HiOutlineGift className="h-4 w-4 mr-1" /> {session.user?.user?.metadata?.total_entries_count || 0}
                            </Button>
                        )}
                        <Button onClick={() => setAccordionValue('nav')} type="button" asChild variant="fatal" className="p-2 max-h-10 max-w-10 data-[state=open]:hidden">
                            <AccordionTrigger>
                                <HiBars3 className="h-6 w-6" />
                            </AccordionTrigger>
                        </Button>
                        <Button onClick={() => setAccordionValue('')} type="button" asChild variant="fatal" className="p-2 max-h-10 max-w-10 data-[state=closed]:hidden">
                            <AccordionTrigger>
                                <HiXMark className="h-6 w-6" />
                            </AccordionTrigger>
                        </Button>
                    </div>
                </div>

                <AccordionContent>
                    <div className="sm:hidden">
                        <NavListMobile closeAccordion={() => setAccordionValue('')} session={session} />
                        <AccordionTrigger ref={triggerRef} />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
