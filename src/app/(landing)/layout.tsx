import { NavBar } from "@/components";
import { Footer } from "@/components/layout/footer/footer.component";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Mila Collective: Benefits Club With Incredible Giveaways',
    description: "Mila Collective is Americas fastest growing luxury benefits club. Every week we give away amazing prizes with monthly mega prizes!",
    openGraph: {
      title: 'Mila Collective: Benefits Club With Incredible Giveaways',
      description:
        "Mila Collective is Americas fastest growing luxury benefits club. Every week we give away amazing prizes with monthly mega prizes!",
      type: "website",
    },
    metadataBase: new URL("https://www.milacollective.com/"),
  };
export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar />
            <main className="pt-[92px]">
                {children}
            </main>
            <Footer />
        </>
    );
}