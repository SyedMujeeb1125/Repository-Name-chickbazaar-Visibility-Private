import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ChickBazaar | India's B2B Poultry Marketplace",
    template: "%s | ChickBazaar"
  },
  description:
    "Order fresh live broiler chickens for your shop through ChickBazaar, operated by FruitGlobe International Private Limited.",
  keywords: [
    "ChickBazaar",
    "B2B poultry marketplace",
    "live broiler chicken",
    "poultry delivery India",
    "chicken shop procurement"
  ],
  openGraph: {
    title: "ChickBazaar",
    description: "Fresh live chickens delivered to your shop.",
    url: "https://www.chickbazaar.com",
    siteName: "ChickBazaar",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </body>
    </html>
  );
}
