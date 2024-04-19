import Image from "next/image";
import Link from "next/link";
import { Button } from "../button/button.component";

const navigation = [
    { name: 'How it works', href: '/' },
    { name: 'FAQ', href: '/' },
    { name: 'About us', href: '/' }
]

export function NavBar() {
    return (
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex items-center gap-9 lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <div className="h-[42px] w-[42px] relative">
                        <Image fill src="/images/logo-primary.png" alt="Logo" />
                    </div>
                </Link>
                <div className="hidden lg:flex lg:gap-x-11 overflow-hidden">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm font-medium text-primary-800">
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Button variant="ghost-dark">Sign up</Button>
            </div>
        </nav>
    )
}