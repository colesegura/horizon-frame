import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HorizonFrame – Align Your Day",
  description: "Turn big-picture goals into daily action.",
  icons: {
    icon: "/icons/horizon-frame-logo.svg",
  },
  openGraph: {
    title: "HorizonFrame – Align Your Day",
    description: "Turn big-picture goals into daily action.",
    url: "https://horizonframeapp.com",
    siteName: "HorizonFrame",
    images: [
      {
        url: "https://horizonframeapp.com/Screenshots/HorizonFrameTitlePage.png",
        width: 1708,
        height: 958,
        alt: "HorizonFrame App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HorizonFrame – Align Your Day",
    description: "Turn big-picture goals into daily action.",
    images: ["https://horizonframeapp.com/Screenshots/HorizonFrameTitlePage.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
