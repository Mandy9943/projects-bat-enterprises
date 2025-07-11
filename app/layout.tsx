import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type React from "react";
import "./globals.css";

export const runtime = "edge";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BAT Enterprises - The Future is Now.",
  description:
    "BAT Enterprises builds future-facing ventures in AI, wellness, real estate, and biotech. We design scalable systems built for maximum impact. ",
  openGraph: {
    url: "https://bat.enterprises/",
    type: "website",
    title: "BAT Enterprises - The Future is Now.",
    description:
      "BAT Enterprises builds future-facing ventures in AI, wellness, real estate, and biotech. We design scalable systems built for maximum impact. ",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/7c298f5f-06ef-48e9-957e-3c3b19a8eca8.png?token=IN4xU636Cgl8odcarhNkK-Pq_cH49Y60CgGM0r6QB_A&height=525&width=1200&expires=33288246604",
        width: 1200,
        height: 525,
        alt: "BAT Enterprises Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BAT Enterprises - The Future is Now.",
    description:
      "BAT Enterprises builds future-facing ventures in AI, wellness, real estate, and biotech. We design scalable systems built for maximum impact. ",
    images: [
      "https://opengraph.b-cdn.net/production/images/7c298f5f-06ef-48e9-957e-3c3b19a8eca8.png?token=IN4xU636Cgl8odcarhNkK-Pq_cH49Y60CgGM0r6QB_A&height=525&width=1200&expires=33288246604",
    ],
  },
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
