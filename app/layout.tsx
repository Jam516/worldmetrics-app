import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from "@/components/site-header";
import { Analytics } from '@vercel/analytics/react';
import { SiteFooter } from "@/components/site-footer";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: 'Keymetrics.World',
  description: "Tracking the adoption of Worldcoin",
  keywords: [
    "Worldcoin",
    "Keymetrics",
    "crypto",
    "wallet",
    "UBI",
  ],
  authors: [
    {
      name: "0xKofi",
      url: "https://0xkofi.com",
    },
  ],
  creator: "0xKofi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.keymetrics.world",
    title: "Keymetrics",
    description: "Worldcoin Data",
    siteName: "Keymetrics.World",
    images: [
      {
        url: "https://i.imgur.com/GbxJWKG.png",
        width: 1200,
        height: 630,
        alt: "Keymetrics.World",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keymetrics.World",
    description: "Worldcoin Data Trends and Insights",
    images: ["https://i.imgur.com/GbxJWKG.png"],
    creator: "@0xKofi",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="relative flex min-h-screen flex-col px-4 2xl:padding-xl">
          <SiteHeader />
          <Separator className="bg-black " />
          <div className="flex-1">{children}</div>
          <Separator className="bg-black mt-6" />
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
