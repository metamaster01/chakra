import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter, Amita, Yatra_One, Fraunces, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";

const amita = Amita({
  subsets: ['latin'],
  weight: ['400','700'],   // pick weights you need
  display: 'swap',
  variable: '--font-amita'
});
// NOTE: add Poppins to the import list at the top:
// import { Playfair_Display, Inter, Amita, Yatra_One, Fraunces, Poppins } from "next/font/google";

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-fraunces'
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins'
});
const yatra_one = Yatra_One({
  subsets: ['latin'],
  weight: '400',   // Yatra One only supports weight 400
  display: 'swap',
  variable: '--font-amita'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chakra Healing & Meditation | Aligned Souls",
  description:
    "Discover personalized chakra healing sessions, meditation coaching, and energy alignment practices to bring balance and positivity into your life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://checkout.razorpay.com" />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body
        className={`font-sans ${playfair.variable} ${inter.variable} ${amita.variable} ${fraunces.variable} ${poppins.variable} font-sans antialiased`}
      >
        <Suspense fallback={null}>
          <SiteNav />
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
