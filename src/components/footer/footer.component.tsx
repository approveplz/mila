
import Link from "next/link";
import { navigation, data } from "./metadata";

export function Footer() {
    return (
        <footer className="bg-primary-800 text-white py-10">
            <div className="container mx-auto flex flex-col gap-4 items-center justify-center">
                <div className="flex flex-wrap gap-10 justify-center text-sm">
                    {navigation.map((item, index) => (
                        <Link key={index} href={item.href}>{item.name}</Link>
                    ))}
                </div>
                <div className="text-xs" dangerouslySetInnerHTML={{ __html: data?.copyRights }}></div>
            </div>
        </footer>
    )
}