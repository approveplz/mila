import { NavBar } from "@/components";

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar />
            <main>
                {children}
            </main>
        </>
    );
}