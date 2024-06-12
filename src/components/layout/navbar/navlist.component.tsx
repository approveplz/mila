import { Session } from "next-auth";
import Link from "next/link";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { signOut } from "next-auth/react";
const AccordionTrigger = AccordionPrimitive.Trigger;

const listItems = [
    { id: "1", title: "About Us", href: "/about-us" },
    { id: "2", title: "Benefits", href: "/benefits" },
    { id: "3", title: "Giveaways", href: "/giveaways" },
];

const listItemsSignedIn = [
    { id: "1", title: "Profile", href: "/account" },
    { id: "2", title: "About Us", href: "/about-us" },
    { id: "3", title: "Benefits", href: "/benefits" },
    { id: "4", title: "Giveaways", href: "/giveaways" },
];

function NavItem({ children }: React.PropsWithChildren) {
    return (
        <li className="text-center text-sm font-medium sm:text-base sm:font-normal sm:text-left">{children}</li>
    )
}

export function NavList() {

    return (
        <ul className="hidden sm:flex sm:items-center gap-10 md:gap-14">
            {listItems.map(item => (
                // <Link href={item.href}>
                    <a key={item.id} href={item.href} className="text-base leading-[23px] md:text-lg md:leading-[27px]">
                        {item.title}
                    </a>
                // </Link>
            ))}
        </ul>
    )
}

interface NavListMobileProps {
    session: Session | null;
    closeAccordion: () => void;
}

export function NavListMobile({ session, closeAccordion }: NavListMobileProps) {
    function handleSignOut() {
        closeAccordion();
        signOut({ redirect: true });
    }
    return (
        <ul className="space-y-6 py-6">
            {session ? (
                <div className="flex flex-col items-center gap-6">
                    {listItemsSignedIn.map((item, index) => (
                        <div key={item.id} onClick={closeAccordion}>
                            <a className="text-base leading-[23px] md:text-lg md:leading-[27px]" href={item.href}>{item.title}</a>
                        </div>
                    ))}
                    <NavItem >
                        <div onClick={handleSignOut} className="text-base leading-[23px] md:text-lg md:leading-[27px]" >Log out</div>
                    </NavItem>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-6">
                    {listItems.map((item, index) => (
                        <div key={item.id} onClick={closeAccordion}>
                            <a className=" text-base leading-[23px] md:text-lg md:leading-[27px]" href={item.href}>{item.title}</a>
                        </div>
                    ))}

                    <hr className="w-full" />
                    <div onClick={closeAccordion}>
                        <NavItem>
                            <Link className="text-base leading-[23px] md:text-lg md:leading-[27px]" href="/signin">Sign In</Link>
                        </NavItem>
                    </div>

                    <div onClick={closeAccordion}>
                        <NavItem>
                            <Link className="text-base leading-[23px] md:text-lg md:leading-[27px]" href="/#pricing">Sign Up</Link>
                        </NavItem>
                    </div>
                </div>
            )}
        </ul>
    )
}