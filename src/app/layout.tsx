import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import Providers from "../providers/providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple Media Ranker",
  description: "Made mostly to learn create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-min-screen dark`}
      >
        <div className="flex flex-col min-h-screen text-sm mx-auto">
          <Providers>
            <AppHeader />
            <div className="grow flex flex-col">{children}</div>
            <AppFooter />
          </Providers>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
