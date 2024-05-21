import { Session } from "next-auth";
import Link from "next/link";

const listItems = [
    { id: "1", title: "About Us", href: "/" },
    { id: "2", title: "Benefits", href: "/coupons" },
    { id: "3", title: "Giveaways", href: "/giveaways" },
];

const listItemsSignedIn = [
    { id: "1", title: "Profile", href: "/" },
    { id: "2", title: "About Us", href: "/" },
    { id: "3", title: "Benefits", href: "/" },
    { id: "4", title: "Giveaways", href: "/" },
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

export function NavListMobile({ session }: { session: Session | null }) {
    return (
        <ul className="space-y-6 py-6">
            {session ? (
                <>
                    {listItemsSignedIn.map(item => (
                        <NavItem key={item.id}>
                            <Link className="text-base leading-[23px] md:text-lg md:leading-[27px]" href={item.href}>{item.title}</Link>
                        </NavItem>
                    ))}
                </>
            ) : (
                <>
                    {listItems.map(item => (
                        <NavItem key={item.id}>
                            <Link className="text-base leading-[23px] md:text-lg md:leading-[27px]" href={item.href}>{item.title}</Link>
                        </NavItem>
                    ))}

                    <hr />

                    <NavItem>
                        <Link className="text-base leading-[23px] md:text-lg md:leading-[27px]" href="/signup">Sign Up</Link>
                    </NavItem>
                </>
            )}
        </ul>
    )
}