import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type React from "react";
import "./globals.css";

export const runtime = "edge";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BAT Enterprises - The Strange Lab",
  description:
    "The strange lab of Bucur Andrei Teodor - Building things that shouldn't exist",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
