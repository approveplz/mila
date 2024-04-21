import type { Metadata } from "next";
import localFont from 'next/font/local';
import { NavBar } from "@/components/navbar";

import "./globals.css";

const generalSans = localFont({
  variable: '--font-general-sans',
  src: [
    {
      path: './fonts/GeneralSans-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/GeneralSans-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/GeneralSans-Semibold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './fonts/GeneralSans-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
  ]
});

const stardom = localFont({
  variable: '--font-stardom',
  src: './fonts/Stardom-Regular.woff'
})

export const metadata: Metadata = {
  title: "MilaCollective",
  description: "Over 500+ stores available — rewards at your own pace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${generalSans.variable} ${stardom.variable} ${generalSans.className} bg-[#FAFAF9]`}>
        <NavBar />
        <main className="pt-[98px]">
          {children}
        </main>
      </body>
    </html>
  );
}
