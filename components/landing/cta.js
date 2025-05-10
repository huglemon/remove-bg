"use client";

import { Button } from "@/components/ui/button";
import { Image, Crown } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative isolate overflow-hidden bg-background/50">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="text-center">
          <h2 className="font-smiley text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            开始体验
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              智能去背景
            </span>
          </h2>
          <p className="mt-6 text-balance text-lg leading-relaxed text-gray-700">
            <strong>立即上传图片</strong>，体验 AI
            大模型带来的专业级图片处理效果。 无需复杂技能，
            <strong>一键即可完成</strong>。
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="rounded-full">
              <Link href="#hero">
                立即开始
                <Image className="ml-2 h-4 w-4" alt="开始图标" />
              </Link>
            </Button>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/batch">
                批量抠图
                <Crown className="ml-2 h-4 w-4 text-amber-500" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
