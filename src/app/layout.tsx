import "@/styles/css/globals.css";

import type { Metadata } from "next";
import { inter, ttRamillasTrlVar } from "@/styles/fonts";

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
      <body className={`${inter.variable} ${ttRamillasTrlVar.variable} ${inter.className} text-[#171614]`}>{children}</body>
    </html>
  );
}
