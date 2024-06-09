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
                <NavItem key={item.id}>
                    <Link className="text-base leading-[23px] md:text-lg md:leading-[27px]" href={item.href}>{item.title}</Link>
                </NavItem>
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
                <>
                    {listItemsSignedIn.map((item, index) => (
                        <div key={index} onClick={closeAccordion}>
                            <NavItem key={item.id}>
                                <Link className="text-base leading-[23px] md:text-lg md:leading-[27px]" href={item.href}>{item.title}</Link>
                            </NavItem>
                        </div>
                    ))}
                    <NavItem >
                        <div onClick={handleSignOut} className="text-base leading-[23px] md:text-lg md:leading-[27px]" >Log out</div>
                    </NavItem>
                </>
            ) : (
                <>
                    {listItems.map((item,index) => (
                        <div  key={index} onClick={closeAccordion}>
                            <NavItem key={item.id}>
                                <Link className=" text-base leading-[23px] md:text-lg md:leading-[27px]" href={item.href}>{item.title}</Link>
                            </NavItem>
                        </div>
                    ))}

                    <hr />
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
                </>
            )}
        </ul>
    )
}