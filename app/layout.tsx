import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RandomBackground from "@/components/RandomBackground";
import "./globals.css";

const epilogue = Epilogue({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chanmin",
  description: "Developer, musician, and vlogger.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${epilogue.variable} h-full antialiased`}>
      <head>
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        <link rel="preconnect" href="https://www.instagram.com" />
      </head>
      <body className="min-h-full flex flex-col relative">
        <RandomBackground />
        <Navbar />
        <div id="route-content" className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
        <Script
          src="https://www.instagram.com/embed.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
