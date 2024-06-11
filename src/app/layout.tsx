import "@/styles/css/globals.css";

import type { Metadata } from "next";
import { inter, ttRamillasTrlVar } from "@/styles/fonts";
import { Providers } from "./providers";
import { cn } from "@/utils";
import Script from "next/script";
import { Toaster } from "@/components";
import { auth as authSession } from "@/auth";

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


export default async function RootLayout({
  auth,
  children
}: Readonly<{
  auth: React.ReactNode,
  children: React.ReactNode
}>) {
  const session = await authSession();

  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.variable, ttRamillasTrlVar.variable, inter.className, "text-fatal")}>
        <Providers session={session}>
          {children}
          {auth}
        </Providers>

        <Script id="fb-pixel">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M2MCJWNS');
          `}
        </Script>
        <Toaster />

        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M2MCJWNS"
            height="0" width="0" style="display:none;visibility:hidden">
          </iframe>
        </noscript>
      </body>
    </html>
  );
}
