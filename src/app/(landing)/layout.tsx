import { NavBar } from "@/components";
import { Footer } from "@/components/layout/footer/footer.component";

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
            <Footer />
        </>
    );
}