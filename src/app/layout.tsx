import Logo from "@/components/ui/logo";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import { Toaster } from "sonner";
import Link from "next/link";
import { ModeSwitch } from "@/components/mode-switch";
import { LayoutGrid, Globe, Store } from "lucide-react";

import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dingTalkFont = localFont({
  src: "../fonts/DingTalk_JinBuTi.ttf",
  variable: "--font-dingtalk",
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
          dingTalkFont.variable,
          `flex min-h-screen flex-col bg-[linear-gradient(45deg,#eaeaea_25%,transparent_25%,transparent_75%,#eaeaea_75%,#eaeaea),linear-gradient(45deg,#eaeaea_25%,transparent_25%,transparent_75%,#eaeaea_75%,#eaeaea)] bg-[length:30px_30px] bg-[position:0_0,15px_15px] text-gray-900 antialiased`,
        )}
      >
        <header className="relative py-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
            <Link href="/" className="inline-flex justify-center">
              <Logo />
            </Link>
            <ModeSwitch />
          </div>
        </header>

        <main className="grow overflow-hidden">{children}</main>
        <RadixToaster />
        <Toaster position="top-center" richColors />
        <footer className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:mt-0 md:flex-row md:gap-0">
          <p className="text-xs text-gray-300 md:text-sm">
            <Link href="https://inwind.cn" target="_blank">
              inWind Overseas
            </Link>{" "}
            Presents.
          </p>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              title="外贸独立站"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-gray-250 bg-white px-2 py-1.5 text-xs text-gray-300 shadow transition hover:bg-white/75 md:rounded-xl md:px-4 md:text-sm"
              href="https://whenthey.work"
            >
              <Store className="size-3" />
              外贸独立站建站
            </a>
            <a
              title="快速查询目标地区是否处于工作时间"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-gray-250 bg-white px-2 py-1.5 text-xs text-gray-300 shadow transition hover:bg-white/75 md:rounded-xl md:px-4 md:text-sm"
              href="https://whenthey.work"
            >
              <Globe className="size-3" />
              WhenThey.Work
            </a>
            <a
              href="https://inwind.cn/tools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-gray-250 bg-white px-2 py-1.5 text-xs text-gray-300 shadow transition hover:bg-white/75 md:rounded-xl md:px-4 md:text-sm"
            >
              <LayoutGrid className="size-3" />
              外贸工具导航
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
