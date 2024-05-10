import Link from "next/link";

function NavItem({ children }: React.PropsWithChildren) {
    return (
        <li>{children}</li>
    )
}

export function NavList() {
    const listItems = [
        { id: "1", title: "About Us", href: "/" },
        { id: "2", title: "Benefits", href: "/" },
        { id: "3", title: "Giveaways", href: "/" },
    ];

    return (
        <ul className="flex items-center gap-14">
            {listItems.map(item => (
                <NavItem key={item.id}>
                    <Link href={item.href}>{item.title}</Link>
                </NavItem>
            ))}
        </ul>
    )
}