import "@/styles/css/globals.css";

import type { Metadata } from "next";
import { inter, ttRamillasTrlVar } from "@/styles/fonts";
import { Providers } from "./providers";
import { cn } from "@/utils";
import Script from "next/script";
import { Toaster } from "@/components";

export const metadata: Metadata = {
  title: "MilaCollective",
  description: "Over 500+ stores available — rewards at your own pace.",
};

export default function RootLayout({
  auth,
  children
}: Readonly<{
  auth: React.ReactNode,
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.variable, ttRamillasTrlVar.variable, inter.className, "text-fatal")}>
        <Providers>
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
