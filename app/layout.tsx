import Logo from "@/components/ui/logo";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import { Toaster } from "sonner";

import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

import NavBar from "@/components/layout/navbar/nav-bar";
import Footer from "@/components/layout/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SmileFont = localFont({
  src: "../fonts/SmileySans.ttf",
  variable: "--font-smiley",
  display: "swap",
});

export const metadata: Metadata = {
  title: "乘风智能抠图 | 一键移除图片背景",
  description: "上传图片，立即获得背景移除效果，免费高效的AI抠图工具！",
  openGraph: {
    images: "https://rmbg.hellokaton.me/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="zh">
      <head>
        <script
          async
          defer
          data-website-id="e132eb98-1c88-44e4-ab72-128b4618c250"
          src="https://analytics.inwind.cn/script.js"
        ></script>
      </head>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          SmileFont.variable,
          `flex min-h-screen flex-col bg-[linear-gradient(45deg,#eaeaea_25%,transparent_25%,transparent_75%,#eaeaea_75%,#eaeaea),linear-gradient(45deg,#eaeaea_25%,transparent_25%,transparent_75%,#eaeaea_75%,#eaeaea)] bg-[length:30px_30px] bg-[position:0_0,15px_15px] text-gray-900 antialiased`,
        )}
      >
        <NavBar />
        <main className="grow overflow-hidden">{children}</main>
        <RadixToaster />
        <Toaster position="top-center" richColors />
        <Footer />
      </body>
    </html>
  );
}
