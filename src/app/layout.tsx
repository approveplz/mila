import "@/styles/css/globals.css";

import type { Metadata } from "next";
import { inter, ttRamillasTrlVar } from "@/styles/fonts";
import { Providers } from "./providers";
import { cn } from "@/utils";
import Script from "next/script";
import { Toaster } from "@/components";
import { auth as authSession } from "@/auth";
import { GoogleTagManager } from '@next/third-parties/google'

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
      <GoogleTagManager gtmId="GTM-KJWWCPKP" />
      <body className={cn(inter.variable, ttRamillasTrlVar.variable, inter.className, "text-fatal")}>
        <Providers session={session}>
          {children}
          {auth}
        </Providers>
        <Script id="fb-pixel">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
             fbq('init', '433865426101614'); 
            fbq('track', 'PageView');
          `}
        </Script>
        <Toaster />
      </body>
      
    </html>
  );
}
