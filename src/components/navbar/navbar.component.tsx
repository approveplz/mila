"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button/button.component";
import { Container } from "@/components/container/container.component";
import { Divider } from "@/components/divider/divider.component";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { List as ListIcon, X as XIcon } from "@phosphor-icons/react";

const Accordion = AccordionPrimitive.Root;
const AccordionItem = AccordionPrimitive.Item;
const AccordionTrigger = AccordionPrimitive.Trigger;
const AccordionContent = AccordionPrimitive.Content;

const navigation = [
    { name: 'How it works', href: '/#how-it-works', scroll: false },
    { name: 'FAQ', href: '/#FAQ', scroll: false },
    { name: 'About us', href: '/#about-us', scroll: false }
]

export function NavBar() {
    return (
        <nav className="fixed bg-[#FAFAF9] w-full py-7 z-[999]">
            <Container>
                <Accordion type="single" collapsible>
                    <AccordionItem value="nav">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-9 lg:flex-1">
                                <Link href="/" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <div className="h-[42px] w-[42px] relative">
                                        <Image fill src="/images/logo-primary.png" alt="Logo" />
                                    </div>
                                </Link>
                                <div className="hidden sm:flex sm:gap-x-11 overflow-hidden">
                                    {navigation.map((item) => (
                                        <Link key={item.name} href={item.href} className="text-sm font-medium text-primary-800">
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:justify-end">
                                <Button variant="ghost-dark" asChild>
                                    <Link href="/#contact-us">
                                        Sign up
                                    </Link>
                                </Button>
                            </div>
                            <div className="flex flex-1 justify-end sm:hidden">
                                <Button type="button" asChild variant="ghost-dark" className="data-[state=open]:hidden">
                                    <AccordionTrigger>
                                        <ListIcon className="h-6 w-6 mr-2" />
                                        Menu
                                    </AccordionTrigger>
                                </Button>
                                <Button type="button" asChild variant="ghost-dark" className="data-[state=closed]:hidden">
                                    <AccordionTrigger>
                                        <XIcon className="h-6 w-6 mr-2" />
                                        Close
                                    </AccordionTrigger>
                                </Button>
                            </div>
                        </div>

                        <AccordionContent>
                            <div
                                className="sm:hidden"
                                id="mobile-menu"
                            >
                                <div className="space-y-6 px-2 py-6">
                                    {navigation.map((item) => (
                                        <Link key={item.name} href={item.href} className="block text-sm text-center font-medium text-primary-800">
                                            {item.name}
                                        </Link>
                                    ))}

                                    <Divider />

                                    <Link href="/#contact-us" className="block text-sm text-center font-medium text-primary-800">
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Container>
        </nav>
    )
}