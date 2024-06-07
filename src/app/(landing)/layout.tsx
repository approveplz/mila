import { NavBar } from "@/components";
import { Footer } from "@/components/layout/footer/footer.component";
import { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "Mila Collective: Benefits Club With Incredible Giveaways",
//     description: "Mila Collective is Americas fastest growing luxury benefits club. Every week we give away amazing prizes with monthly mega prizes!",
//     openGraph: {
//       images: "/images/apple-icon.png",
//     },
//   };

export const metadata: Metadata = {
    title: 'Mila Collective: Benefits Club With Incredible Giveaways',
    description: "Mila Collective is Americas fastest growing luxury benefits club. Every week we give away amazing prizes with monthly mega prizes!",
    openGraph: {
        images: [
            {
                url: "/images/apple-icon.png",
                width: 800,
                height: 600,
                alt: "OG Image",
            }
        ],
    },
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