import { Crown } from "lucide-react";

export function BatchHeader() {
  return (
    <div className="mx-auto mt-4 flex flex-col items-center justify-center gap-2 md:mt-6">
      <Crown className="mb-4 inline-block h-12 w-12 text-amber-500" />
      <h1 className="font-smiley text-center text-4xl font-bold md:text-5xl">
        批量移除图片背景
      </h1>
      <p className="mx-auto mt-4 max-w-md text-balance text-center leading-snug md:text-lg md:leading-snug">
        选择多张<strong>图片</strong>，一键批量移除背景。
      </p>
    </div>
  );
} 