import "@/styles/css/globals.css";

import type { Metadata } from "next";
import { inter, ttRamillasTrlVar } from "@/styles/fonts";
import { Providers } from "./providers";
import { cn } from "@/utils";
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
        <Providers >
          {children}
          {auth}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
